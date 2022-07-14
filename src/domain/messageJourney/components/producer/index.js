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

const Producer = ({ data }) => {
    console.log(data);
    return (
        <div className="poision-producer">
            <header is="x3d">
                <p>Producer</p>
                <StatusIndication is_active={data.is_active} is_deleted={data.is_active} />
            </header>
            <div className="content-wrapper">
                {data?.details?.length > 0 &&
                    data?.details?.map((row, index) => {
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
export default Producer;
