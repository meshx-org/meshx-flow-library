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

import { customAlphabet } from 'nanoid'
import { IComponent, IComponentDefinition, IFlowEditor, INode } from '../interfaces'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 6)

export const createComponent = (def: IComponentDefinition): IComponent => {
    const {
        id,
        type,
        settings,
        display,
        work,
        outputs,
        inputs,
        validateMetadata,
        onCreate,
        onMetaChange,
        onIncomingConnection,
        onOutgoingConnection,
        onRemoveIncomingConnection,
        onRemoveOutgoingConnection,
    } = def

    return {
        id,
        type,
        display,
        work,
        settings,
        outputs,
        inputs,
        onCreate,
        onMetaChange,
        onIncomingConnection,
        onOutgoingConnection,
        validateMetadata,
        onRemoveIncomingConnection,
        onRemoveOutgoingConnection,

        async createNode(metadata: Record<string, unknown>, editor: IFlowEditor) {
            const node: INode = {
                nid: nanoid(),
                type,
                cid: id,
                out: {},
                in: {},
                meta: {
                    pos: [0, 0],
                    ...metadata,
                },
            }

            Object.keys(await inputs(node, editor)).forEach((key) => {
                node.in[key] = []
            })

            Object.keys(await outputs(node, editor)).forEach((key) => {
                node.out[key] = []
            })

            if (onCreate) await onCreate(node, editor)

            return node
        },
    }
}

export const createOverloadedComponents = <T>(factory: (data: T) => IComponentDefinition, overloadData: T[]) =>
    overloadData.map((data) => createComponent(factory(data)))
