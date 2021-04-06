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

export const replacementFn = (key: string, value: any) => {
    const prefix = 'http://localhost:3001/automation/v1/integrations'
    const [integration, uriFrag] = value.split('#')
    return {
        $ref: `${prefix}/${integration}/schema#${uriFrag}`,
    }
}

export const replaceTypeRefFn = (key: string, value: any) => {
    const prefix = 'http://localhost:3001/collection/v1/collections'
    const typeId = value.split()
    return {
        $ref: `${prefix}/${typeId}/schema`,
    }
}
