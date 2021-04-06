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

import { addInput, addOutput, createComponent, removeInput, removeOutput } from '../../core'

export const Reroute = createComponent({
    id: 'meshx:reroute',
    display: {
        label: 'Reroute',
    },
    type: 'data',
    inputs: (node) => {
        return {
            $in: { schema: {}, name: 'In' },
        }
    },
    outputs: (node) => {
        return {
            $out: { schema: {}, name: 'Out' },
        }
    },
    onCreate: (node) => {
        node.meta.type = 'any'
    },
    /*onIncomingConnection: (self, selfKey, other, otherKey) => {
        const otherIo = other.out[otherKey]

        if (self.meta.type === 'any') {
            removeOutput(self, 'out')
            removeInput(self, 'in')

            addOutput(self, 'out', 'Out', otherIo.flow, otherIo.portSchema)
            addInput(self, 'in', 'In', otherIo.flow, otherIo.portSchema)

            self.meta.type = otherIo.portSchema.type
        }
    },
    onOutgoingConnection: (self, selfKey, other, otherKey) => {
        const otherIo = other.in[otherKey]

        if (self.meta.type === 'any') {
            removeOutput(self, 'out')
            removeInput(self, 'in')

            addOutput(self, 'out', 'Out', otherIo.flow, otherIo.portSchema)
            addInput(self, 'in', 'In', otherIo.flow, otherIo.portSchema)

            self.meta.type = otherIo.portSchema.type
        }
    },*/
    work: async (node, inputs, outputs, flowControls) => {
        // proxy data and flow
        if (inputs['in'] && outputs['out']) outputs['out'] = inputs['in']
        if (flowControls['$out']) flowControls['$out']()
    },
})
