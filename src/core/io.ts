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

import { IComponent, IPortDefinitions, MeshXSchema, IFlowData, INode, IFlowEditor } from '../interfaces'
import { processSchema } from '../utils/processSchema'

export const schemaToPorts = async (schema: MeshXSchema, editor: IFlowEditor) => {
    const posts: IPortDefinitions = {}
    const processed = await processSchema(schema, editor)

    processed.properties &&
        Object.entries(processed.properties).forEach(([key, schema]: [string, MeshXSchema]) => {
            posts[key] = { name: schema.title, schema }
        })

    return posts
}

export const addInput = (node: INode, key: string) => {
    if (!node.in) node.in = {}
    if (node.in[key]) return

    node.in[key] = []
}

export const addOutput = (node: INode, key: string) => {
    if (!node.out) node.out = {}
    if (node.out[key]) return

    node.out[key] = []
}

// Flow and data based
export const removeOutput = (node: INode, key: string) => delete node.out[key]
export const removeInput = (node: INode, key: string) => delete node.in[key]

export const isFlow = (key: string) => key[0] === '$'

export const disconnectNode = (components: IComponent[], flowData: IFlowData, nodeId: string, ioKey: string) => {
    const selfComp = components.find((c) => c.id === flowData.nodes[nodeId].cid)
    if (!selfComp) throw 'Components not find!'

    const refo = flowData.nodes[nodeId].out[ioKey]
    const refi = flowData.nodes[nodeId].in[ioKey]

    const input = refo === undefined
    let removable

    if (input) {
        removable = refi.map((conn) => {
            return {
                otherNodeId: conn.nid,
                otherKey: conn.out,
            }
        })
    } else {
        removable = refo.map((conn) => {
            return {
                otherNodeId: conn.nid,
                otherKey: conn.in,
            }
        })
    }

    removable.forEach(({ otherNodeId, otherKey }) => {
        const otherComp = components.find((c) => c.id === flowData.nodes[nodeId].cid)

        if (!otherComp) throw 'Components not find!'

        if (input) {
            selfComp.onRemoveOutgoingConnection &&
                selfComp.onRemoveOutgoingConnection(flowData.nodes[otherNodeId], otherKey, flowData.nodes[nodeId], ioKey)
            otherComp.onRemoveIncomingConnection &&
                otherComp.onRemoveIncomingConnection(flowData.nodes[nodeId], ioKey, flowData.nodes[otherNodeId], otherKey)
            flowData.nodes[otherNodeId].out[otherKey] = []
        } else {
            selfComp.onRemoveIncomingConnection &&
                selfComp.onRemoveIncomingConnection(flowData.nodes[otherNodeId], otherKey, flowData.nodes[nodeId], ioKey)
            otherComp.onRemoveOutgoingConnection &&
                otherComp.onRemoveOutgoingConnection(flowData.nodes[nodeId], ioKey, flowData.nodes[otherNodeId], otherKey)
            flowData.nodes[otherNodeId].in[otherKey] = []
        }
    })

    if (input) {
        flowData.nodes[nodeId].in[ioKey] = []
    } else {
        flowData.nodes[nodeId].out[ioKey] = []
    }
}

export const connectNode = async (components: IComponent[], nodeOut: INode, outKey: string, nodeIn: INode, inKey: string) => {
    const outComp = components.find((c) => c.id === nodeOut.cid)
    const inComp = components.find((c) => c.id === nodeIn.cid)

    if (!outComp || !inComp) throw 'Components not find!'

    const outputs = (nodeOut as any).outputs
    const inputs = (nodeIn as any).inputs

    //const inputs = await inComp.inputs(nodeIn, editor)

    const outSchema = outputs[outKey].schema
    const inSchema = inputs[inKey].schema

    console.log(nodeOut, nodeIn)
    console.log(outputs, inputs)
    //console.log(outSchema, inSchema)

    //const isObjectOut = out.portSchema && out.portSchema.type === 'object'
    //const isObjectInp = inp.portSchema && inp.portSchema.type === 'object'

    //const isAnyOut = out.portSchema && (out.portSchema.type as any) === 'any'
    //const isAnyIn = inp.portSchema && (inp.portSchema.type as any) === 'any'

    const isObjectOut = outSchema && (outSchema as any).type === 'object'
    const isObjectIn = inSchema && (inSchema as any).type === 'object'

    const isAnyOut = outSchema && (outSchema as any).type === 'any'
    const isAnyIn = outSchema && (outSchema as any).type === 'any'

    const isFlowIn = isFlow(inKey)
    const isFlowOut = isFlow(outKey)

    const connect = () => {
        if (!nodeOut.out[outKey]) nodeOut.out[outKey] = []
        if (!nodeIn.in[inKey]) nodeIn.in[inKey] = []

        nodeOut.out[outKey].push({
            nid: nodeIn.nid,
            in: inKey,
        })

        nodeIn.in[inKey].push({
            nid: nodeOut.nid,
            out: outKey,
        })

        inComp.onIncomingConnection && inComp.onIncomingConnection(nodeIn, inKey, nodeOut, outKey)
        outComp.onOutgoingConnection && outComp.onOutgoingConnection(nodeOut, outKey, nodeIn, inKey)
    }

    if (isFlowIn && isFlowOut) {
        connect()
        return
    }
    connect()
    return

    if (isObjectIn && isObjectOut) {
        connect()
        return
    }

    if (isAnyOut) {
        connect()
        return
    }

    if (isAnyIn) {
        connect()
        return
    }

    //const outSchema = omit(JSON.parse(JSON.stringify(out.portSchema)), ['title', 'default', 'description', 'mxType', 'enum'])
    //const inSchema = omit(JSON.parse(JSON.stringify(inp.portSchema)), ['title', 'default', 'description', 'mxType', 'enum'])

    /*if (!deepEqual(outSchema, inSchema)) {
        throw 'Incompatible io types.'
    } else {
        connect()
        return
    }*/
}
