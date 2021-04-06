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

import { IFlowControls, INode, NodeType } from './node'
import { IFlowEditor } from './editor'
import { MeshXSchema } from './meshxSchema.interface'
import { IContext } from './context'

const t: MeshXSchema = { type: 'object', properties: { test: { type: 'string' } } }
console.log(t.properties['test'])

export interface IMetadataValidationResult {
    ok: boolean
    message?: string
}

export type DataType = string | string[] | number | number[] | boolean | boolean[] | Record<string, any> | Record<string, any>[]

export interface IOutputsData {
    [key: string]: {
        type: string
        data: DataType
    }
}

export interface IInputsData {
    [key: string]: {
        type: string
        data: DataType
    }
}

export interface IPortDefinition {
    schema: MeshXSchema
    name: string
}

export interface IPortDefinitions {
    [key: string]: IPortDefinition
}

interface INodeSettings {
    [key: string]: {
        type: 'text' | string
        default: any
        title: string
    }
}

export interface IComponentDefinition {
    // Shared Side
    id: string
    type: NodeType
    validateMetadata?: (node: INode) => IMetadataValidationResult

    inputs: (node: INode, editor: IFlowEditor) => Promise<IPortDefinitions> | IPortDefinitions
    outputs: (node: INode, editor: IFlowEditor) => Promise<IPortDefinitions> | IPortDefinitions
    settings?: (node: INode, editor: IFlowEditor) => Promise<INodeSettings> | INodeSettings

    // Client Side
    display: {
        label: string
        overloadLabel?: string
        description?: string
        iconUrl?: string
        iconName?: string
    }

    // Editor Events
    onIncomingConnection?: (self: INode, selfKey: string, other: INode, otherKey: string) => void
    onOutgoingConnection?: (self: INode, selfKey: string, other: INode, otherKey: string) => void
    onRemoveIncomingConnection?: (self: INode, selfKey: string, other: INode, otherKey: string) => void
    onRemoveOutgoingConnection?: (self: INode, selfKey: string, other: INode, otherKey: string) => void

    onMetaChange?: (node: INode, oldMeta: Record<any, any>) => void
    onCreate?: (node: INode, editor: IFlowEditor) => Promise<void> | void

    // Server side
    work: (node: INode, inputs: IInputsData, outputs: IOutputsData, flowControls: IFlowControls, context: IContext) => Promise<void> | void
}

export interface IComponent extends IComponentDefinition {
    createNode: (metadata: Record<any, any>, editor: IFlowEditor) => Promise<INode>
}
