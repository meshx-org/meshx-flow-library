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

import $RefParser from '@apidevtools/json-schema-ref-parser'
import merge from 'json-schema-merge-allof'

import { deepReplace } from 'gdeep-replace'
import { replacementFn, replaceTypeRefFn } from './transformRef'
import { MeshXSchema, IFlowEditor } from '../interfaces'

export const processSchema = async (schema: MeshXSchema, editor: IFlowEditor) => {
    let newSchema = deepReplace(schema, '$mxRef', replacementFn)
    newSchema = deepReplace(newSchema, '$mxTypeRef', replaceTypeRefFn)

    const options: any = {
        resolve: {
            http: {
                timeout: 5000, // 5 second timeout
                headers: editor.httpHeaders,
            },
        },
    }

    newSchema = await $RefParser.dereference(newSchema, options)
    newSchema = merge(newSchema) as MeshXSchema
    return newSchema
}
