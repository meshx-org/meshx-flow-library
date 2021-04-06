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

export type NodeType = 'trigger' | 'action' | 'data'

export interface IInputConnection {
    nid: string
    out: string
}

export interface IOutputConnection {
    nid: string
    in: string
}

export interface IInputs {
    [key: string]: IInputConnection[]
}

export interface IOutputs {
    [key: string]: IOutputConnection[]
}

export interface IFlowControls {
    [key: string]: () => void
}

export interface INodeMetadata {
    pos: [number, number]
    compact?: boolean
    [key: string]: any
}

export interface INode {
    nid: string // node id
    type: NodeType // type
    cid: string // component name
    in: IInputs // inputs
    out: IOutputs // outputs
    meta: INodeMetadata // meta
}
