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

import { schemaToPorts } from '../..'
import { addOutput, createOverloadedComponents } from '../..'

export const genIntegrationTriggers = (datas: any) =>
    createOverloadedComponents(
        (data: any) => ({
            id: `${data.integrationName}:${data.id}`,
            type: 'trigger',
            display: data.display,
            inputs: (node) => ({}),
            outputs: async (node, editor) => {
                const triggerOutputs = await schemaToPorts(data.outputSchema, editor)

                console.log(triggerOutputs)

                return {
                    $out: { schema: {}, name: 'On Trigger' },
                    ...triggerOutputs,
                }
            },
            build: async (node) => {
                node.meta.settings = {
                    connection: '',
                }
            },
            work: (node, inputs, outputs, flowControls) => flowControls['$out'](),
        }),
        datas
    )
