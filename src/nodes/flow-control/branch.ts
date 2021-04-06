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
import { booleanPort } from '../ports'

export const BranchComponent = createComponent({
    id: 'meshx:branch',
    display: {
        label: 'Branch',
        iconName: 'map-signs',
    },
    type: 'action',
    inputs: (node) => {
        return {
            $in: {
                schema: {},
                name: 'In',
            },
            condition: {
                schema: booleanPort,
                name: 'Value',
            },
        }
    },
    outputs: (node) => {
        return {
            $if: { schema: {}, name: 'If' },
            $else: { schema: {}, name: 'Else' },
        }
    },
    work: (node, inputs, outputs, flowControls) => {
        if (inputs['condition'].data) flowControls['if']()
        else flowControls['else']()
    },
})
