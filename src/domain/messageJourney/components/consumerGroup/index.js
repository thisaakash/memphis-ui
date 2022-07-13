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

const produceData = [
    {
        name: 'Name',
        value: 'Logger'
    },
    {
        name: 'User',
        value: 'root'
    },
    {
        name: 'IP',
        value: '61.103.206.105'
    }
];
const ConsumerGroup = () => {
    return (
        <div className="consumer-group">
            <header is="x3d">
                <p>Producer</p>
                <StatusIndication is_active={true} is_deleted={false} />
            </header>
            <div className="content-wrapper">
                {produceData?.map((row, index) => {
                    return (
                        <content is="x3d" key={index}>
                            <p>{row.name}</p>
                            <span>{row.value}</span>
                        </content>
                    );
                })}
            </div>
        </div>
    );
};
export default ConsumerGroup;
