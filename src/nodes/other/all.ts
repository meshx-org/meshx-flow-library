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
import { booleanPort, numberPort, stringPort, recordPort } from '../ports'

export const AllComponent = createComponent({
    id: 'meshx:all',
    type: 'action',
    display: {
        label: 'All',
        iconName: 'cubes',
    },
    inputs: (node) => ({
        $in: { schema: {}, name: 'Flow' },
        in2: { schema: numberPort, name: 'Number' },
        in3: { schema: booleanPort, name: 'Boolean' },
        in4: { schema: recordPort, name: 'Record' },
        in5: { schema: stringPort, name: 'Text' },
    }),
    outputs: (node) => ({
        $out: { schema: {}, name: 'Flow' },
        out2: { schema: numberPort, name: 'Number' },
        out3: { schema: booleanPort, name: 'Boolean' },
        out4: { schema: recordPort, name: 'Record' },
        out5: { schema: stringPort, name: 'Text' },
    }),
    work: async (node, inputs, outputs, flowControls) => {
        outputs['out5'].data = 'Hello World'
        flowControls['$out']()
    },
})
