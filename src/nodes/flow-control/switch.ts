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

import { addOutput, createOverloadedComponents } from '../../core'
import { numberPort, stringPort } from '../ports'

export const Switch = createOverloadedComponents(
    (data) => ({
        id: `meshx:switch:${data.overloadId}`,
        type: 'action',
        display: {
            label: 'Switch',
            overloadLabel: data.overloadLabel,
            iconName: 'traffic-light',
        },
        inputs: (node) => {
            return {
                $in: { schema: {}, name: 'In' },
                conditionIn: { name: 'Condition', schema: data.portSchema },
            }
        },
        outputs: (node) => {
            const caseOutputs = {}
            /*node.meta['cases'] = ['Twitter', 'Facebook', 'Instagram']
            node.meta['cases'].forEach((caseItem: string) => {
                caseOutputs[`$out:${caseItem}`] = { schema: {}, name: `On “${caseItem}”` }
            })*/

            return {
                //...caseOutputs,
                $outDefault: { schema: {}, name: 'Default' },
            }
        },
        /*onCreate: async (node) => {
            

            node.meta['cases'] = ['Twitter', 'Facebook', 'Instagram']

            node.meta['cases'].forEach((caseItem) => {
                addOutput(node, `$out:${caseItem}`)
            })

            addOutput(node, '$outDefault')
        },*/
        onMetaChange: (node, oldMeta) => {
            //node.meta['cases'].forEach((caseItem) => {
            //addOutput(node, `$out:${caseItem}`)
            //})
        },
        work: (node, inputs, outputs, flowControls) => flowControls['$out'](),
    }),
    [
        {
            overloadId: 'string',
            overloadLabel: 'String',
            portSchema: stringPort,
        },
        {
            overloadId: 'number',
            overloadLabel: 'Number',
            portSchema: numberPort,
        },
    ]
)
