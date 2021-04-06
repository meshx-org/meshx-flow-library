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

import { IFlowEditor, IFlowEditorOptions } from '../interfaces'

// TODO: immutable data
export const createFlowEditor = ({ httpHeaders = {} }: IFlowEditorOptions) => {
    const editor: IFlowEditor = {
        httpHeaders,
        setHttpHeader(key: string, value: any) {
            editor.httpHeaders[key] = value
        },
        operations: [],
        onChange() {
            /* */
        },
        apply(ops) {
            editor.operations = ops
            editor.onChange()
            editor.operations = []
        },
        insertNode(node) {
            editor.apply([{ type: 'insertNode', payload: { node } }])
        },
        deleteNode(nodeId) {
            editor.apply([{ type: 'deleteNode', payload: { nodeId } }])
        },
        setNode(nodeId, node) {
            editor.apply([{ type: 'setNode', payload: { nodeId, node } }])
        },
        updateNodeMetadata(nodeId, metadata) {
            editor.apply([{ type: 'updateNodeMetadata', payload: { nodeId, metadata } }])
        },
        connectNode(nodeOut, outKey, nodeIn, inKey) {
            editor.apply([{ type: 'connectNode', payload: { nodeOut, outKey, nodeIn, inKey } }])
        },
        disconnectNode(nodeId, key) {
            editor.apply([{ type: 'disconnectNode', payload: { nodeId, key } }])
        },
        setZoom(zoomLevel: number) {
            editor.apply([{ type: 'setZoom', payload: { zoomLevel } }])
        },
        setTransform(x: number, y: number) {
            editor.apply([{ type: 'setTransform', payload: { x, y } }])
        },
        translate(dx: number, dy: number) {
            editor.apply([{ type: 'translate', payload: { dx, dy } }])
        },
    }

    return editor
}
