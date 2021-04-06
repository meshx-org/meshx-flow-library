/**
 * Copyright 2021 Roland Sz. Kovács
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    INodes,
    IFlowData,
    IInputsData,
    IFlowControls,
    IComponent,
    INode,
    IOutputsData,
    IFlowState,
    IPlugins,
    IVMLogger,
    IVMOptions,
} from '../interfaces'
import { isFlow } from '.'

export class FlowVM {
    private logger: IVMLogger

    private nodes: INodes
    private components: Record<string, IComponent> = {}

    private processed: Record<string, boolean> = {}
    private outputDatas: Record<string, IOutputsData> = {}

    private plugins: IPlugins = {}

    private flowStack: { nodeId: string; work: () => Promise<void> }[] = []

    private startFromId: string
    private currentKey: string

    constructor(private options: IVMOptions) {
        this.logger = options.logger
        this.plugins = options.plugins
    }

    registerComponent(component: IComponent) {
        this.components[component.id] = component
    }

    resumeFlow(state: IFlowState) {
        this.outputDatas = state.data
        this.startFromId = state.checkpoint
    }

    async checkpoint(checkpoint: string, data: Record<string, IOutputsData>, idempotencyKey: string) {
        await this.options.onCheckpoint(idempotencyKey, checkpoint, data)
    }

    async createState(idempotencyKey: string, startFromId: string) {
        await this.options.onStateCreation(idempotencyKey, startFromId)
        this.startFromId = startFromId
    }

    async startProcessing(json: IFlowData, nodeId: string, idempotencyKey: string, externalData: Record<string, any>, state?: IFlowState) {
        this.currentKey = idempotencyKey
        this.nodes = json.nodes

        // Load state to resume from if exists
        if (state) this.resumeFlow(state)
        else await this.createState(idempotencyKey, nodeId)

        // Add external data to trigger output
        this.outputDatas[this.startFromId] = {}
        Object.entries(externalData).forEach(([outputKey, outputData]) => {
            this.outputDatas[this.startFromId][outputKey] = {
                type: 'test',
                data: outputData,
            }
        })

        // Push the first node to the stack
        this.flowStack.push({
            nodeId: this.startFromId,
            work: async () => {
                await this.processNode(this.startFromId)
            },
        })

        // Process all the nodes
        while (this.flowStack.length > 0) {
            const item = this.flowStack.pop()
            await item.work()
            await this.checkpoint(item.nodeId, this.outputDatas, idempotencyKey)
        }

        this.logger.debug('Done processing.')

        // reset flow run
        this.outputDatas = {}
        this.processed = {}
    }

    private async extractInputData(leftNode: INode) {
        const inputData: IInputsData = {}

        // Loop through inputs and collect processed data from connected node outputs
        for (const [key, input] of Object.entries(leftNode.in)) {
            if (!isFlow(key)) {
                const connection = input[0]

                if (connection) {
                    if (!this.processed[connection.nid]) {
                        this.logger.debug('Node not yet processed, Processing...')
                        /** Process the data branch **/

                        this.flowStack.push({
                            nodeId: connection.nid,
                            work: async () => {
                                await this.processNode(connection.nid)
                            },
                        })

                        while (this.flowStack.length > 0) {
                            const item = this.flowStack.pop()
                            await item.work()
                        }
                    }

                    const data = this.outputDatas[connection.nid][connection.out].data
                    inputData[key] = { type: null, data } // output
                } else {
                    inputData[key] = { type: null, data: null /*input.portSchema.default */ }
                }
            }
        }

        return inputData
    }

    private buildOutputs(node: INode): IFlowControls {
        const flowControls: IFlowControls = {}

        Object.entries(node.out).forEach(([outKey, output]) => {
            if (isFlow(outKey)) {
                // Build flow controls

                if (output.length !== 0) {
                    output.forEach((connection) => {
                        const nextNodeId = connection.nid
                        flowControls[outKey] = () => {
                            this.flowStack.push({
                                nodeId: nextNodeId,
                                work: () => this.processNode(nextNodeId),
                            })
                            this.logger.log(`Flowing ${node.nid} => ${nextNodeId}`)
                        }
                    })
                } else {
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    flowControls[outKey] = async () => {}
                }
            } else if (!isFlow(outKey)) {
                // Create the output data holder pointers for the node

                const old = this.outputDatas[node.nid]

                if (node.nid !== this.startFromId) {
                    this.outputDatas[node.nid] = {
                        ...old,
                        [outKey]: {
                            type: 'null',
                            data: null,
                        },
                    }
                }
            }
        })
        return flowControls
    }

    private async processNode(nodeId: string) {
        const node = this.nodes[nodeId]

        // Every node need to be processed once
        if (this.processed[nodeId]) return

        this.logger.log(`Processing node: ${node.nid} - ${node.cid}`)

        // Extract input data from other node outputs (run them if not processed before)
        const inputDatas: IInputsData = await this.extractInputData(node)

        // Construct flow outputs
        const flowControls: IFlowControls = this.buildOutputs(node)

        // Get the component for the node
        const component = this.components[node.cid]
        if (!component) throw new Error(`Component ${node.cid} not registered`)

        // Invoke component worker for the current node
        await component.work(node, inputDatas, this.outputDatas[node.nid], flowControls, this.plugins)

        // Set the node to processed
        this.processed[nodeId] = true
    }
}
