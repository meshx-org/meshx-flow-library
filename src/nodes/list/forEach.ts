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

import { addInput, addOutput, createOverloadedComponents } from '../../core'
import {
    numberPort,
    numberArrayPort,
    stringArrayPort,
    stringPort,
    booleanArrayPort,
    booleanPort,
    objectArrayPort,
    objectPort,
} from '../ports'

export const ForEach = createOverloadedComponents(
    (data) => ({
        id: `meshx:forEach:${data.overloadId}`,
        type: 'action',
        display: {
            label: 'For Each',
            overloadLabel: data.overloadLabel,
            iconName: 'retweet-alt',
        },
        inputs: (node) => {
            return {
                $in: { schema: {}, name: 'Out' },
                itemsIn: { name: 'Items', schema: data.portArraySchema },
            }
        },
        outputs: (node) => {
            return {
                $out: { schema: {}, name: 'Out' },
                itemOut: { schema: data.portSchema, name: 'Item' },
            }
        },
        work: (node, inputs, outputs, flowControls) => flowControls['out'](),
    }),
    [
        {
            overloadId: 'string',
            overloadLabel: 'String',
            portArraySchema: stringArrayPort,
            portSchema: stringPort,
        },
        {
            overloadId: 'number',
            overloadLabel: 'Number',
            portArraySchema: numberArrayPort,
            portSchema: numberPort,
        },
        {
            overloadId: 'boolean',
            overloadLabel: 'Boolean',
            portArraySchema: booleanArrayPort,
            portSchema: booleanPort,
        },
        {
            overloadId: 'object',
            overloadLabel: 'Object',
            portArraySchema: objectArrayPort,
            portSchema: objectPort,
        },
    ]
)
