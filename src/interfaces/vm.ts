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

import { IInputsData, IOutputsData } from './component'
import { INode } from './node'

export interface IFlowState {
    stateId: string
    data: Record<string, IOutputsData>
    checkpoint: string
}

export interface IVMLogger {
    log(...args: any): any
    debug(...args: any): any
    error(...args: any): any
    warn(...args: any): any
}

export interface IPlugins {
    [key: string]: (node: INode, inputs: IInputsData, outputs: IOutputsData, ...pluginArgs: any) => Promise<any>
}

export interface IVMOptions {
    logger: IVMLogger
    // state
    onCheckpoint: (idempKey: string, checkpointName: string, data: Record<string, IOutputsData>) => Promise<void>
    onStateCreation: (idempKey: string, checkpointName: string) => Promise<void>
    // plugins
    plugins: IPlugins
}
