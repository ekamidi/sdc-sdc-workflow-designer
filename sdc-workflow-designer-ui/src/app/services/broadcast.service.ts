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
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { WorkflowNode } from '../model/workflow/workflow-node';
import { SequenceFlow } from "../model/workflow/sequence-flow";
import { PlanModel } from "../model/plan-model";
import { WorkflowElement } from '../model/workflow/workflow-element';
import { RestConfig } from '../model/rest-config';

/**
 * BroadcastService
 * All of the observable subject should be registered to this service.
 * It provider a broadcast method to broadcast data. the broadcast method would catch error while broadcasting.
 */
@Injectable()
export class BroadcastService {

    public jsPlumbInstance = new Subject<any>();
    public jsPlumbInstance$ = this.jsPlumbInstance.asObservable();

    public workflows = new Subject<Map<number, any>>();
    public workflows$ = this.workflows.asObservable();

    public planId = new Subject<number>();
    public planId$ = this.planId.asObservable();

    public planModel = new Subject<PlanModel>();
    public planModel$ = this.planModel.asObservable();

    public showProperty = new Subject<WorkflowElement>();
    public showProperty$ = this.showProperty.asObservable();

    public updateModelRestConfig = new Subject<RestConfig[]>();
    public updateModelRestConfig$ = this.updateModelRestConfig.asObservable();

    public saveEvent = new Subject<string>();
    public saveEvent$ = this.saveEvent.asObservable();

    public selectedElement = new Subject<WorkflowElement[]>();
    public selectedElement$ = this.selectedElement.asObservable();

    public nodeProperty = new Subject<WorkflowNode>();
    public nodeProperty$ = this.nodeProperty.asObservable();

    public nodeTaskChange = new Subject<WorkflowNode>();
    public nodeTaskChange$ = this.nodeTaskChange.asObservable();

    public showSequenceFlow = new Subject<boolean>();
    public showSequenceFlow$ = this.showSequenceFlow.asObservable();

    public sequenceFlow = new Subject<SequenceFlow>();
    public sequenceFlow$ = this.sequenceFlow.asObservable();

    public currentSequenceFlow = new Subject<SequenceFlow>();
    public currentSequenceFlow$ = this.currentSequenceFlow.asObservable();
    public currentWorkflowNode = new Subject<WorkflowNode>();
    public currentWorkflowNode$ = this.currentWorkflowNode.asObservable();
    public currentType = new Subject<string>();
    public currentType$ = this.currentType.asObservable();

    /**
     * broadcast datas
     * this method will catch the exceptions for the broadcast
     * @param subject will broadcast data
     * @param data will be broadcated
     */
    public broadcast(subject: Subject<any>, data: any) {
        try {
            subject.next(data);
        } catch (err) {
            console.error(err);
        }
    }
}
