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

import { MeshXSchema } from '../index'

// Basic data types
export const numberPort: MeshXSchema = { type: 'number', default: 0 }
export const stringPort: MeshXSchema = { type: 'string', default: '' }
export const booleanPort: MeshXSchema = { type: 'boolean', default: false }
export const objectPort: MeshXSchema = { type: 'object', default: {} }

// Expressive object types
export const recordPort: MeshXSchema = {
    type: 'object',
    properties: { hello: { type: 'string' } },
}

export const typePort: MeshXSchema = {
    type: 'object',
    default: { hello: 'test' },
    properties: { hello: { type: 'string' } },
}

export const appPort: MeshXSchema = {
    type: 'object',
    default: { hello: 'test' },
    properties: { hello: { type: 'string' } },
}

export const workspacePort: MeshXSchema = {
    type: 'object',
    default: { hello: 'test' },
    properties: { hello: { type: 'string' } },
}

// Basic array types
export const numberArrayPort: MeshXSchema = { type: 'array', default: [], items: { type: 'number' } }
export const stringArrayPort: MeshXSchema = { type: 'array', default: [], items: { type: 'string' } }
export const booleanArrayPort: MeshXSchema = { type: 'array', default: [], items: { type: 'boolean' } }
export const objectArrayPort: MeshXSchema = { type: 'array', default: [], items: { type: 'object' } }
