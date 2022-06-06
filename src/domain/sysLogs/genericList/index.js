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

import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

import OverflowTip from '../../../components/tooltip/overflowtip';
import { parsingDate } from '../../../services/dateConvertor';
import { SOCKET_URL } from '../../../config';
import { LOCAL_STORAGE_TOKEN } from '../../../const/localStorageConsts';

const GenericList = ({ columns }) => {
    const [selectedRowIndex, setSelectedRowIndex] = useState(0);
    const [logsData, setLogsData] = useState([]);
    const [numtest, setnumber] = useState(0);

    useEffect(() => {
        const socket = io.connect(SOCKET_URL, {
            path: '/api/socket.io',
            query: {
                authorization: localStorage.getItem(LOCAL_STORAGE_TOKEN)
            },
            reconnection: false
        });
        socket.on('first_system_logs_data', (data) => {
            // change to system_logs_data
            setLogsData(data);
            setnumber(1);
        });
        socket.on('live_system_logs_data', (data) => {
            // change to system_logs_data
            console.log(numtest);
            setnumber(2);
            setLogsData(data);
        });

        setTimeout(() => {
            socket.emit('register_system_logs_data');
        }, 1000);
        return () => {
            socket.emit('deregister');
            socket.close();
        };
    }, []);

    const test = async (data) => {
        setLogsData(data);
    };
    const onSelectedRow = (rowIndex) => {
        setSelectedRowIndex(rowIndex);
    };

    return (
        <div className="generic-list-wrapper">
            <div className="list">
                <div className="coulmns-table">
                    {columns?.map((column, index) => {
                        return (
                            <span key={index} style={{ width: column.width }}>
                                {column.title}
                            </span>
                        );
                    })}
                </div>
                <div className="rows-wrapper">
                    {logsData.length > 0 &&
                        logsData?.map((row, index) => {
                            return (
                                <div className={selectedRowIndex === index ? 'pubSub-row selected' : 'pubSub-row'} key={index} onClick={() => onSelectedRow(index)}>
                                    <OverflowTip text={row?.component} width={'200px'}>
                                        {row?.component}
                                    </OverflowTip>
                                    <OverflowTip text={row?.type} width={'200px'}>
                                        {row?.type}
                                    </OverflowTip>
                                    <OverflowTip text={row?.creation_date} width={'300px'}>
                                        {row?.creation_date}
                                    </OverflowTip>
                                    <OverflowTip text={row?.log} width={'300px'}>
                                        {row?.log}
                                    </OverflowTip>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="row-data">
                <p>{logsData[selectedRowIndex]?.log}</p>
            </div>
        </div>
    );
};

export default GenericList;
