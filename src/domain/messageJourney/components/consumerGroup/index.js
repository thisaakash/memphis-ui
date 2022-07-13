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

import React from 'react';
import StatusIndication from '../../../../components/indication';
import CustomCollapse from '../../../stationOverview/stationObservabilty/components/customCollapse';

const consumeData = [
    {
        name: 'unprocessed messages',
        value: '2'
    },
    {
        name: 'In process Message',
        value: '4'
    },
    {
        name: 'poison messages',
        value: '12'
    },
    {
        name: 'max_ack_time',
        value: '12sec'
    },
    {
        name: 'max_message_deliveries',
        value: '421'
    }
];

const CGData = [
    {
        name: 'consumer_1',
        status: 'active',
        details: [
            {
                name: 'user',
                value: 'root'
            },
            {
                name: 'IP',
                value: '130.69.203.16'
            }
        ]
    },
    {
        name: 'CG_2',
        status: 'active',
        details: [
            {
                name: 'user',
                value: 'root'
            },
            {
                name: 'IP',
                value: '130.69.203.16'
            }
        ]
    }
];
const ConsumerGroup = () => {
    return (
        <div className="consumer-group">
            <header is="x3d">
                <p>CG 1</p>
                <StatusIndication is_active={true} is_deleted={false} />
            </header>
            <div className="content-wrapper">
                <div className="details">
                    <p className="title">Details</p>
                    {consumeData?.map((row, index) => {
                        return (
                            <content is="x3d" key={index}>
                                <p>{row.name}</p>
                                <span>{row.value}</span>
                            </content>
                        );
                    })}
                </div>
                <div className="consumers">
                    {CGData.map((row, index) => {
                        return <CustomCollapse key={index} header={row.name} status={true} defaultOpen={index === 0 ? true : false} data={row.details} />;
                    })}
                </div>
            </div>
        </div>
    );
};
export default ConsumerGroup;
