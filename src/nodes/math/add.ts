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
import { numberPort } from '../ports'

export const AddComponent = createComponent({
    id: 'meshx:add',
    type: 'data',
    display: {
        label: 'Add',
        iconName: 'plus',
    },
    inputs: (node) => {
        return {
            a: {
                schema: numberPort,
                name: 'A',
            },
            b: {
                schema: numberPort,
                name: 'B',
            },
        }
    },
    outputs: (node) => {
        return {
            result: {
                schema: numberPort,
                name: 'A + B',
            },
        }
    },
    work: (node, inputs, outputs) => {
        const a = inputs['a'].data as number
        const b = inputs['b'].data as number

        outputs['result'].data = a + b
    },
})
