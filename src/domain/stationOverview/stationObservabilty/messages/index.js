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
import { StationStoreContext } from '../..';
import OverflowTip from '../../../../components/tooltip/overflowtip';
import { convertBytes, parsingDate } from '../../../../services/valueConvertor';

const messagesColumns = [
    {
        key: '1',
        title: 'Produced by',
        width: '100px'
    },
    {
        key: '2',
        title: 'Date',
        width: '150px'
    }
];

const Messages = () => {
    const [stationState, stationDispatch] = useContext(StationStoreContext);
    const [selectedRowIndex, setSelectedRowIndex] = useState(0);

    const onSelectedRow = (rowIndex) => {
        setSelectedRowIndex(rowIndex);
    };

    return (
        <div className="messages-container">
            <div className="header">
                <p className="title">Station</p>
                {stationState?.stationSocketData?.messages?.length > 0 && (
                    <p className="messages-hint">*last {stationState?.stationSocketData?.messages?.length} messages</p>
                )}
            </div>
            {stationState?.stationSocketData?.messages?.length > 0 ? (
                <div className="list-wrapper">
                    <div className="list">
                        <div className="coulmns-table">
                            {messagesColumns?.map((column, index) => {
                                return (
                                    <span key={index} style={{ width: column.width }}>
                                        {column.title}
                                    </span>
                                );
                            })}
                        </div>
                        <div className="rows-wrapper">
                            {stationState?.stationSocketData?.messages?.map((row, index) => {
                                return (
                                    <div className={selectedRowIndex === index ? 'pubSub-row selected' : 'pubSub-row'} key={index} onClick={() => onSelectedRow(index)}>
                                        <OverflowTip text={row?.produced_by} width={'100px'}>
                                            {row?.produced_by}
                                        </OverflowTip>
                                        <OverflowTip text={parsingDate(row?.creation_date)} width={'150px'}>
                                            {parsingDate(row?.creation_date)}
                                        </OverflowTip>
                                    </div>
                                );
                            })}
                            {!stationState?.stationSocketData?.messages && (
                                <div className="empty-messages">
                                    <p>Waiting for messages</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row-data">
                        {stationState?.stationSocketData.messages && <p>{stationState?.stationSocketData.messages[selectedRowIndex]?.message}</p>}
                    </div>
                </div>
            ) : (
                <div className="empty-messages">
                    <p>Waiting for messages</p>
                </div>
            )}
        </div>
    );
};

export default Messages;
