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

import { addInput, createComponent, schemaToPorts } from '../../core'
import { objectPort } from '../ports'

const snakeToCamel = (str) => str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', ' ').replace('_', ' '))

export const ExplodeComponent = createComponent({
    id: 'meshx:explode',
    type: 'data',
    display: {
        label: 'Explode an Object',
    },
    inputs: (node) => {
        return {
            object: {
                schema: objectPort,
                name: 'Object',
            },
        }
    },
    outputs: (node, editor) => {
        const properties = node.meta['schema']
        return schemaToPorts(properties, editor)
    },
    /* onIncomingConnection(self, selfKey, other, otherKey) {
        const portProps = other.out[otherKey].portSchema.properties
        Object.entries(portProps).forEach(([key, schema]) => {
            if (typeof schema !== 'boolean') {
                addDataOutput(self, key, schema.title, schema)
            }
        })
    },
    onRemoveIncomingConnection(self, selfKey, other, otherKey) {
        console.log(self, selfKey, other, otherKey)
        const toRemove = Object.keys(self.out)

        toRemove.forEach((name) => {
            removeOutput(self, name)
        })
    },*/
    work(node, inputs, outputs) {
        console.log('explode!!!!!!')
    },
})
