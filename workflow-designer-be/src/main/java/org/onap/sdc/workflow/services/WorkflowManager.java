/*
 * Copyright © 2018 European Support Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.onap.sdc.workflow.services;

import java.util.Collection;
import java.util.Set;
import org.onap.sdc.workflow.persistence.types.Workflow;
import org.onap.sdc.workflow.persistence.types.WorkflowVersionState;
import org.springframework.data.domain.Pageable;

public interface WorkflowManager {

    Collection<Workflow> list(Set<WorkflowVersionState> versionStatesFilter, Pageable pageable);

    Workflow get(Workflow workflow);

    Workflow create(Workflow workflow);

    void update(Workflow workflow);
}