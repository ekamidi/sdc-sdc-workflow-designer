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

import { createActions } from 'redux-actions';

import { NAMESPACE, PAGE_SIZE } from 'features/catalog/catalogConstants';

export const {
    [NAMESPACE]: { fetchWorkflow, updateWorkflow, resetWorkflow }
} = createActions({
    [NAMESPACE]: {
        FETCH_WORKFLOW: (sort, page) => ({
            sort,
            size: PAGE_SIZE,
            page
        }),
        UPDATE_WORKFLOW: undefined,
        RESET_WORKFLOW: undefined
    }
});