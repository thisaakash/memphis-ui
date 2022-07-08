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
import { InfoOutlined } from '@material-ui/icons';
import CustomTabs from '../../../../components/Tabs';
import { Divider, Table } from 'antd';
import Button from '../../../../components/button';

const messagesColumns = [
    {
        title: 'Message',
        dataIndex: 'message'
    },
    {
        title: 'Details'
    }
];

const Messages = () => {
    const [stationState, stationDispatch] = useContext(StationStoreContext);
    const [selectedRowIndex, setSelectedRowIndex] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const tabs = ['All', 'Poison'];

    const onSelectedRow = (rowIndex) => {
        setSelectedRowIndex(rowIndex);
    };

    const handleChangeMenuItem = (_, newValue) => {
        setTabValue(newValue);
    };

    const rowSelection = {
        selectedRowIndex,
        onChange: onSelectedRow
    };

    return (
        <div className="messages-container">
            <div className="header">
                <div className="left-side">
                    <p className="title">Station</p>
                    {stationState?.stationSocketData?.messages?.length > 0 && (
                        <div className="messages-amount">
                            <InfoOutlined />
                            <p>Showing last {stationState?.stationSocketData?.messages?.length} messages</p>
                        </div>
                    )}
                </div>
                <div className="right-side">
                    <Button
                        width="80px"
                        height="32px"
                        placeholder="Ack"
                        colorType="white"
                        radiusType="circle"
                        backgroundColorType="purple"
                        fontSize="12px"
                        fontWeight="600"
                        onClick={() => {}}
                    />
                    <Button
                        width="100px"
                        height="32px"
                        placeholder="Resend"
                        colorType="white"
                        radiusType="circle"
                        backgroundColorType="purple"
                        fontSize="12px"
                        fontWeight="600"
                        onClick={() => {}}
                    />
                </div>
            </div>
            <CustomTabs value={tabValue} onChange={handleChangeMenuItem} tabs={tabs}></CustomTabs>
            {stationState?.stationSocketData?.messages?.length > 0 ? (
                // <div className="list-wrapper">
                //     <div className="list">
                //         <div className="coulmns-table">
                //             {messagesColumns?.map((column, index) => {
                //                 return (
                //                     <span key={index} style={{ width: column.width }}>
                //                         {column.title}
                //                     </span>
                //                 );
                //             })}
                //         </div>
                //         <div className="rows-wrapper">
                //             {stationState?.stationSocketData?.messages?.map((row, index) => {
                //                 return (
                //                     <div className={selectedRowIndex === index ? 'pubSub-row selected' : 'pubSub-row'} key={index} onClick={() => onSelectedRow(index)}>
                //                         <OverflowTip text={row?.produced_by} width={'100px'}>
                //                             {row?.produced_by}
                //                         </OverflowTip>
                //                         <OverflowTip text={parsingDate(row?.creation_date)} width={'150px'}>
                //                             {parsingDate(row?.creation_date)}
                //                         </OverflowTip>
                //                     </div>
                //                 );
                //             })}
                //             {!stationState?.stationSocketData?.messages && (
                //                 <div className="empty-messages">
                //                     <p>Waiting for messages</p>
                //                 </div>
                //             )}
                //         </div>
                //     </div>
                //     <div className="row-data">
                //         { && <p>{stationState?.stationSocketData.messages[selectedRowIndex]?.message}</p>}
                //     </div>
                // </div>stationState?.stationSocketData.messages
                <div>
                    <Table
                        rowSelection={rowSelection}
                        columns={messagesColumns}
                        dataSource={stationState?.stationSocketData.messages}
                        pagination={false}
                        scroll={{
                            y: 500
                        }}
                    />
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
