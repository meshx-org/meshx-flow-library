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

import { AllComponent } from './other/all'

import { BranchComponent } from './flow-control/branch'
import { SequenceComponent } from './flow-control/sequence'

import { AddComponent } from './math/add'
import { DivideComponent } from './math/divide'
import { MultiplyComponent } from './math/multiply'
import { SubtractComponent } from './math/subtract'
import { EqualComponent } from './math/equal'
import { NegateComponent } from './math/negate'

import { OnRecordCreated } from './triggers/onRecordCreated'
import { OnDebugRun } from './triggers/onDebugRun'

import { ExplodeComponent } from './dictionary/explode'
import { GetRecord } from './dictionary/getRecord'

import { ForEach } from './list/forEach'
import { FindIndex } from './list/findIndex'

import { genIntegrationTriggers } from './integrations/integrationTrigger'
import { genIntegrationActions } from './integrations/integrationAction'

import { Reroute } from './other/reroute'
import { Switch } from './flow-control/switch'
import { DebugComponent } from './other/debug'

import { OnClickView, OnClickRecord } from './triggers/onClick'
import { OnToggle } from './triggers/onToggle'
import { OnRecordUpdated } from './triggers/onRecordUpdated'
import { OnSigned } from './triggers/onSigned'
import { Const } from './other/const'

export const genComponents = (overload: { actions: any[]; triggers: any[] }) => {
    return [
        OnRecordCreated,
        OnRecordUpdated,
        OnDebugRun,
        OnClickView,
        OnClickRecord,
        OnToggle,
        OnSigned,

        Const,

        // Dictionary
        ExplodeComponent,

        // List
        ...FindIndex,
        ...ForEach,

        // Utility
        AllComponent,
        DebugComponent,

        // Core
        SequenceComponent,
        BranchComponent,
        ...Switch,

        // Math
        AddComponent,
        SubtractComponent,
        DivideComponent,
        MultiplyComponent,
        EqualComponent,
        NegateComponent,

        // MeshX Integration
        GetRecord,

        // Other Integrations
        ...genIntegrationTriggers(overload.triggers),
        ...genIntegrationActions(overload.actions),
    ]
}
