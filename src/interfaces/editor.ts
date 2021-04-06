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

import { IPortDefinitions } from './component'
import { INode } from './node'

export interface IConnection {
    nodeIn: INode
    inKey: string
    nodeOut: INode
    outKey: string
}

export interface IEditorNode extends INode {
    inputs: IPortDefinitions
    outputs: IPortDefinitions
}

export interface IOperation {
    type: string
    [key: string]: any
}

export interface IInsertNodeOp extends IOperation {
    type: 'insertNode'
    payload: {
        node: INode
    }
}

export interface IUpdateNodeMetadataOp extends IOperation {
    type: 'updateNodeMetadata'
    payload: {
        nodeId: string
        metadata: { [key: string]: any }
    }
}

export interface IDeleteNodeOp extends IOperation {
    type: 'deleteNode'
    payload: {
        nodeId: string
    }
}

export interface ISetNodeOp extends IOperation {
    type: 'setNode'
    payload: {
        nodeId: string
        node: INode | undefined
    }
}

export interface IConnectNodeOp extends IOperation {
    type: 'connectNode'
    payload: {
        nodeOut: string
        outKey: string
        nodeIn: string
        inKey: string
    }
}

export interface IDisconnectNodeOp extends IOperation {
    type: 'disconnectNode'
    payload: {
        nodeId: string
        key: string
    }
}

export interface ISetZoomOp extends IOperation {
    type: 'setZoom'
    payload: {
        zoomLevel: number
    }
}

export interface ISetTransformOp extends IOperation {
    type: 'setTransform'
    payload: {
        x: number
        y: number
    }
}

export interface ITranslateOp extends IOperation {
    type: 'translate'
    payload: {
        dx: number
        dy: number
    }
}

export type Operation =
    | IInsertNodeOp
    | IDeleteNodeOp
    | IUpdateNodeMetadataOp
    | IDisconnectNodeOp
    | IConnectNodeOp
    | ISetZoomOp
    | ISetTransformOp
    | ITranslateOp
    | ISetNodeOp

export interface IFlowEditor {
    // http settings (for async data like ports)
    httpHeaders: Record<string, any>
    setHttpHeader: (key: string, value: any) => void

    onChange?: () => void
    operations: Operation[]
    // Actions
    apply: (operation: Operation[]) => void
    insertNode: (node: INode) => void
    deleteNode: (nodeId: string) => void
    setNode: (nodeId: string, node: INode) => void
    connectNode: (nodeOut: string, outKey: string, nodeIn: string, inKey: string) => void
    disconnectNode: (nodeId: string, key: string) => void
    updateNodeMetadata: (nodeId: string, meta: { [key: string]: any }) => void

    setZoom: (zoomLevel: number) => void
    setTransform: (x: number, y: number) => void
    translate: (dx: number, dy: number) => void
}

export interface IFlowEditorOptions {
    httpHeaders?: Record<string, any>
}
