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
import Copy from '../../../../../assets/images/copy.svg';
import Copied from '../../../../../assets/images/copied.svg';
import StatusIndication from '../indication';
import CustomCollapse from '../customCollapse';

const { Panel } = Collapse;

const MultiCollapse = ({ status, data, maxWidth, header, defaultOpen, message }) => {
    const [activeKey, setActiveKey] = useState(defaultOpen ? ['1'] : []);
    const [activeChiledKey, setActiveChiledKey] = useState();
    const [copied, setCopied] = useState(false);

    const onChange = (key) => {
        setActiveKey(key);
    };
    const onChiledChange = (key) => {
        setActiveChiledKey(key);
    };

    const handleCopy = () => {
        setCopied(true);
        navigator.clipboard.writeText(data);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    return (
        <Collapse ghost defaultActiveKey={activeKey} onChange={onChange} className="custom-collapse multi">
            <Panel
                showArrow={false}
                header={
                    <div className="collapse-header">
                        <p className="title">{header}</p>
                        <status is="x3d">
                            <img className={activeKey[0] === '1' ? 'collapse-arrow open' : 'collapse-arrow close'} src={CollapseArrow} alt="collapse-arrow" />
                        </status>
                    </div>
                }
                key="1"
            >
                <Collapse ghost accordion={true} className="collapse-child" onChange={onChiledChange}>
                    {data?.length > 0 &&
                        data?.map((row, index) => {
                            return (
                                <Panel
                                    showArrow={false}
                                    header={
                                        <div className="collapse-header">
                                            <p className="title">{row.name}</p>
                                            <status is="x3d">
                                                {row.status === 'active' && <StatusIndication is_active={true} is_deleted={false} />}
                                                <img
                                                    className={Number(activeChiledKey) === index ? 'collapse-arrow open' : 'collapse-arrow close'}
                                                    src={CollapseArrow}
                                                    alt="collapse-arrow"
                                                />
                                            </status>
                                        </div>
                                    }
                                    key={index}
                                >
                                    {row.details?.length > 0 &&
                                        row.details?.map((row, index) => {
                                            return (
                                                <div className="panel-child" key={index}>
                                                    <content is="x3d" key={index}>
                                                        <p>{row.name}</p>
                                                        <span>{row.value}</span>
                                                    </content>
                                                </div>
                                            );
                                        })}
                                </Panel>
                            );
                        })}
                </Collapse>
            </Panel>
        </Collapse>
    );
};

export default MultiCollapse;
