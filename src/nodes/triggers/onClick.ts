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

export const OnClickView = createComponent({
    id: 'meshx:onClickView',
    type: 'trigger',
    display: {
        label: 'On Click',
        overloadLabel: 'View',
        iconName: 'bolt',
    },
    settings: () => ({
        view: {
            title: 'View',
            type: 'viewSelect',
            default: null,
        },
        button: {
            title: 'Button Title',
            type: 'text',
            default: 'Test',
        },
    }),
    inputs: (node) => ({}),
    outputs: (node) => ({ $out: { schema: {}, name: 'Out' } }),
    work: (_node, _inputs, _outputs, flowControls) => flowControls['$out'](),
})

export const OnClickRecord = createComponent({
    id: 'meshx:onClickRecord',
    type: 'trigger',
    display: {
        label: 'On Click',
        overloadLabel: 'Record',
    },
    settings: () => ({
        fieldId: {
            title: 'Field',
            type: 'text',
            default: null,
        },
    }),
    inputs: (node) => ({}),
    outputs: (node) => ({ $out: { schema: {}, name: 'Out' } }),
    work: (_node, _inputs, _outputs, flowControls) => flowControls['$out'](),
})
