/**
 * Copyright (c) 2017 ZTE Corporation.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and the Apache License 2.0 which both accompany this distribution,
 * and are available at http://www.eclipse.org/legal/epl-v10.html
 * and http://www.apache.org/licenses/LICENSE-2.0
 *
 * Contributors:
 *     ZTE - initial API and implementation and/or initial documentation
 */
import { Position } from './position';
import { WorkflowNode } from './workflow-node';
import { SequenceFlow } from "./sequence-flow";

export class ScriptTask extends WorkflowNode {
    public scriptFormat: string;
    public script: string;

    public constructor(public id: string, public name: string, public type: string, public position: Position, public sequenceFlows: SequenceFlow[]) {
        super(id, name, type, position, sequenceFlows);
    }

}