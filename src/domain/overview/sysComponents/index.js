// Copyright 2021-2022 The Memphis Authors
// Licensed under the GNU General Public License v3.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// https://www.gnu.org/licenses/gpl-3.0.en.html
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import './style.scss';

import React, { useContext, useState } from 'react';
import { Divider } from '@material-ui/core';

import HealthyBadge from '../../../components/healthyBadge';
import { Context } from '../../../hooks/store';

const SysComponents = () => {
    const [state, dispatch] = useContext(Context);

    return (
        <div className="overview-wrapper sys-components-container">
            <p className="overview-components-header">System components</p>
            <div className="sys-components sys-components-header">
                <p>Component</p>
                <p>Pods</p>
                <p>Status</p>
            </div>
            {!state?.monitor_data?.system_components && <Divider />}
            <div className="component-list">
                {state?.monitor_data?.system_components &&
                    state?.monitor_data?.system_components?.map((comp, i) => {
                        return (
                            <div key={`${comp.podName}${i}`}>
                                <Divider />
                                <div className="sys-components">
                                    <p>{comp.component}</p>
                                    <p>
                                        {comp.actual_pods}/{comp.desired_pods}
                                    </p>
                                    <HealthyBadge status={comp.actual_pods / comp.desired_pods} />
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default SysComponents;
