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

import { addInput, addOutput, createComponent } from '../../core'

export const SequenceComponent = createComponent({
    id: 'meshx:sequence',
    display: {
        label: 'Sequence',
        iconName: '',
    },
    type: 'action',
    inputs: (node) => ({
        $in: { schema: {}, name: 'In' },
    }),
    outputs: (node) => {
        const outputs = {}
        for (let i = 0; i < node.meta['seq']; i++) outputs[`$out${i}`] = { schema: {}, name: `Then ${i}` }

        return outputs
    },
    /*onCreate: (node) => {
        // Inputs
        addInput(node, '$in')

        // Outputs
        const seq = 2
        node.meta['seq'] = seq

        for (let i = 0; i < seq; i++) addOutput(node, `$flow${i}`)
    },*/
    /*onMetaChange: (node, oldMeta) => {
        console.log('sh', oldMeta)
        const oldSeqCount = oldMeta.seq
        const newSeqCount = node.meta.seq

        const diff = newSeqCount - oldSeqCount

        if (diff < 0) {
            // remove inputs
            for (let i = newSeqCount; i < oldSeqCount; i++) {
                removeOutput(node, `flow${i}`)
            }
        } else if (diff > 0) {
            // add inputs
            for (let i = oldSeqCount; i < newSeqCount; i++) {
                addFlowOutput(node, `flow${i}`, `Then ${i + 1}`)
            }
        } else return
    },*/
    work: (node, inputs, outputs, flowControls) => {
        const { seq } = node.meta
        for (let i = 0; i < seq; i++) {
            flowControls[`$out${i}`]()
        }
    },
})
