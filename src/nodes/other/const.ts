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

import { createComponent } from '../../core'
import { stringPort } from '../ports'

export const Const = createComponent({
    id: 'meshx:const',
    type: 'data',
    display: {
        label: 'Const',
        iconName: 'suitcase fa-swap-opacity',
    },
    inputs: (node) => ({}),
    outputs: (node) => ({
        out: { schema: stringPort, name: 'String' },
    }),
    work: async (node, inputs, outputs, flowControls) => {
        outputs['out'].data = 'Hello World'
    },
})
