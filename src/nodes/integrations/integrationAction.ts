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

import { addInput, addOutput, createOverloadedComponents, schemaToPorts } from '../..'

export const genIntegrationActions = (datas: any) => {
    //console.log(datas)
    return createOverloadedComponents(
        (data: any) => ({
            id: `${data.integrationName}:${data.id}`,
            type: 'action',
            display: data.display,
            inputs: async (node, headers) => {
                const io = await schemaToPorts(data.outputSchema, headers)

                return {
                    $in: { schema: {}, name: 'In' },
                    ...io,
                }
            },
            outputs: async (node, headers) => {
                const io = await schemaToPorts(data.inputSchema, headers)

                return {
                    $out: { schema: {}, name: 'Out' },
                    ...io,
                }
            },

            work: async (node, inputs, outputs, flowControls, ctx) => {
                await ctx.callAction(node, inputs, outputs, data.integrationName, data.id)
                flowControls['$out']()
            },
        }),
        datas
    )
}
