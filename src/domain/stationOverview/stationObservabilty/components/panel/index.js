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

import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';

import CollapseArrow from '../../../../../assets/images/collapseArrow.svg';
import StatusIndication from '../indication';

const { Panel } = Collapse;

const CustomPanel = ({ content, status, activeKey, header, key }) => {
    return (
        <Panel
            showArrow={false}
            header={
                <div className="collapse-header">
                    <p className="title">{header}</p>
                    <status is="x3d">
                        {status && <StatusIndication is_active={true} is_deleted={false} />}
                        <img className={activeKey[0] === '1' ? 'collapse-arrow open' : 'collapse-arrow close'} src={CollapseArrow} alt="collapse-arrow" />
                    </status>
                </div>
            }
            key={key}
        >
            {content}
        </Panel>
    );
};

export default CustomPanel;
