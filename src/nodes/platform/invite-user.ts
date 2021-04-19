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

export const InviteUserComponent = createComponent({
    id: 'meshx:invite-user',
    type: 'action',
    display: {
        label: 'Invite User',
        iconName: 'paper-plane',
    },
    inputs: (node) => ({
        $in: { schema: {}, name: 'In' },
        emailIn: { schema: { type: 'any' } as any, name: 'Any' },
    }),
    outputs: (node) => ({
        $out: { schema: {}, name: 'Out' },
    }),
    work: async (node, inputs, outputs, flowControls, ctx) => {
        console.log('TODO')

        flowControls['$out']()
    },
})
