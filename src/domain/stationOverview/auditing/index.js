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

import React, { useState } from 'react';

import CustomTabs from '../../../components/Tabs';
import GenericList from './genericList';
import { Divider } from 'antd';
import comingSoonBox from '../../../assets/images/comingSoonBox.svg';

const auditColumns = [
    {
        key: '1',
        title: 'Log message',
        width: '300px'
    },
    {
        key: '2',
        title: 'User type',
        width: '200px'
    },
    {
        key: '3',
        title: 'Date (30 days)',
        width: '200px'
    }
];

const messagesColumns = [
    {
        key: '1',
        title: 'Produced by',
        width: '300px'
    },
    {
        key: '2',
        title: 'Size',
        width: '200px'
    },
    {
        key: '3',
        title: 'Date (30 days)',
        width: '200px'
    }
];

const Auditing = () => {
    const [tabValue, setTabValue] = useState(0);
    const tabs = ['Messages', 'Audit'];

    const handleChangeMenuItem = (_, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div className="auditing-container">
            {/* <div className="coming-soon-wrapper">
                <img src={comingSoonBox} width={40} height={70} />
                <p>Coming soon</p>
            </div> */}
            <CustomTabs value={tabValue} onChange={handleChangeMenuItem} tabs={tabs}></CustomTabs>
            <Divider />
            <div className="auditing-body">
                {tabValue === 0 && <GenericList tab={tabValue} columns={messagesColumns} />}
                {tabValue === 1 && <GenericList tab={tabValue} columns={auditColumns} />}
            </div>
        </div>
    );
};

export default Auditing;
