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

import React, { Fragment, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

import OverflowTip from '../../../components/tooltip/overflowtip';
import { parsingDate } from '../../../services/dateConvertor';
import { SOCKET_URL } from '../../../config';
import { LOCAL_STORAGE_TOKEN } from '../../../const/localStorageConsts';
import SearchInput from '../../../components/searchInput';
import { SearchOutlined } from '@ant-design/icons';
import Loader from '../../../components/loader';
import LogBadge from '../../../components/logBadge';
import SelectComponent from '../../../components/select';
import { httpRequest } from '../../../services/http';
import { ApiEndpoints } from '../../../const/apiEndpoints';

const GenericList = ({ columns }) => {
    const [selectedRowIndex, setSelectedRowIndex] = useState(0);
    const [logsData, setLogsData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [copyOfLogsData, setCopyOfLogsData] = useState([]);
    const [dataLength, setDataLength] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [gotData, setGotData] = useState(false);
    const types = ['all', 'info', 'warn', 'error'];
    const [logFilter, setLogFilter] = useState('all');

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    useEffect(() => {
        setIsLoading(true);
        if (searchInput.length > 1) {
            const results = logsData.filter((logsData) => logsData?.log?.toLowerCase().includes(searchInput));
            setLogsData(results);
            setDataLength(results.length);
        } else {
            setLogsData(copyOfLogsData);
            setDataLength(copyOfLogsData?.length);
        }
        setIsLoading(false);
    }, [searchInput.length > 1]);

    const updateLogFilter = (value) => {
        setLogFilter(value);
    };

    useEffect(() => {
        setIsLoading(true);
        if (logFilter.toLowerCase() !== 'all') {
            const results = logsData.filter((logsData) => logsData?.type?.toLowerCase().includes(logFilter.toLowerCase()));
            setLogsData(results);
            setDataLength(results.length);
        } else {
            setLogsData(copyOfLogsData);
            setDataLength(copyOfLogsData?.length);
        }
        setIsLoading(false);
    }, [logFilter]);

    const getSystemLogs = async (hours) => {
        setIsLoading(true);
        try {
            const data = await httpRequest('GET', ApiEndpoints.GET_SYS_LOGS, {}, {}, { hours: hours });
            if (data) {
                data.logs?.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
                setLogsData(data.logs);
                setCopyOfLogsData(data.logs);
                setDataLength(data.logs.length);
                setGotData(true);
            }
        } catch (error) {}
        setIsLoading(false);
    };

    useEffect(() => {
        if (!gotData) {
            getSystemLogs(24);
        }
        const socket = io.connect(SOCKET_URL, {
            path: '/api/socket.io',
            query: {
                authorization: localStorage.getItem(LOCAL_STORAGE_TOKEN)
            },
            reconnection: false
        });
        setTimeout(() => {
            socket.emit('register_system_logs_data');
        }, 2000);

        if (gotData) {
            socket.on('system_logs_data', (data) => {
                if (data) {
                    data?.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
                    let newLength = dataLength;
                    newLength += data?.length;
                    setLogsData([...data, ...logsData]);
                    setCopyOfLogsData([...data, ...logsData]);
                    setDataLength(newLength);
                }
            });
        }

        return () => {
            socket.emit('deregister');
            socket.close();
        };
    }, [gotData]);

    const onSelectedRow = (rowIndex) => {
        setSelectedRowIndex(rowIndex);
    };

    return (
        <div className="logs-list-container">
            {isLoading && (
                <div>
                    <Loader />
                </div>
            )}
            {!isLoading && (
                <Fragment>
                    <div className="add-search-logs">
                        <SearchInput
                            placeholder="Search logs"
                            colorType="navy"
                            backgroundColorType="none"
                            width="20vw"
                            height="28px"
                            borderRadiusType="circle"
                            borderColorType="gray"
                            boxShadowsType="gray"
                            iconComponent={<SearchOutlined />}
                            onChange={handleSearch}
                            value={searchInput}
                        />
                    </div>

                    <div className="logs-number">Showing {dataLength} live logs in the last 24 hours</div>
                    <div className="logs-dropdown">
                        <SelectComponent
                            value={logFilter}
                            colorType="navy"
                            backgroundColorType="none"
                            borderColorType="gray"
                            radiusType="circle"
                            width="100px"
                            height="28px"
                            options={types}
                            dropdownClassName="select-options"
                            onChange={(e) => updateLogFilter(e)}
                        />
                    </div>
                    <div className="logs-list-wrapper">
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
                                            <div
                                                className={selectedRowIndex === index ? 'pubSub-row selected' : 'pubSub-row'}
                                                key={index}
                                                onClick={() => onSelectedRow(index)}
                                            >
                                                <OverflowTip text={row?.component} width={'100px'}>
                                                    {row?.component}
                                                </OverflowTip>
                                                <LogBadge type={row?.type}></LogBadge>
                                                <OverflowTip text={parsingDate(row?.creation_date)} width={'205px'}>
                                                    {parsingDate(row?.creation_date)}
                                                </OverflowTip>
                                                <div className="log-field">{row?.log}</div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="row-data">
                            <p className="row-content">{logsData[selectedRowIndex]?.log}</p>
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default GenericList;
