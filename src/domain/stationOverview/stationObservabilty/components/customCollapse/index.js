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

const { Panel } = Collapse;

const CustomCollapse = ({ status, data, maxWidth, header, defaultOpen, message }) => {
    const [activeKey, setActiveKey] = useState(defaultOpen ? ['1'] : []);
    const [copied, setCopied] = useState(false);

    const onChange = (key) => {
        setActiveKey(key);
    };
    const handleCopy = () => {
        setCopied(true);
        navigator.clipboard.writeText(data);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    return (
        <Collapse ghost defaultActiveKey={activeKey} onChange={onChange} className="custom-collapse">
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
                key="1"
            >
                {message ? (
                    <div className="message">
                        {message && activeKey.length > 0 && <img src={copied ? Copied : Copy} onClick={() => handleCopy()} className={'copy-icon'} />}

                        <p>{data}</p>
                    </div>
                ) : (
                    data?.length > 0 &&
                    data?.map((row, index) => {
                        return (
                            <content is="x3d" key={index}>
                                <p>{row.name}</p>
                                <span>{row.value}</span>
                            </content>
                        );
                    })
                )}
            </Panel>
        </Collapse>
    );
};

export default CustomCollapse;
