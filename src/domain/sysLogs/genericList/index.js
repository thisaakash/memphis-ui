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

import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
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
import { Filter } from '@material-ui/icons';

const GenericList = ({ columns }) => {
    const types = ['all', 'info', 'warn', 'error'];

    const [selectedRowIndex, setSelectedRowIndex] = useState(0);
    const [logsData, setLogsData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [dataLength, setDataLength] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [gotData, setGotData] = useState(false);
    const [logFilter, setLogFilter] = useState('all');
    const stateRef = useRef([]);
    stateRef.current[0] = logFilter;
    stateRef.current[1] = logsData;
    stateRef.current[2] = searchInput;

    useEffect(() => {
        if (!gotData) {
            getSystemLogs(24);
        }
    }, []);

    const getSystemLogs = async (hours) => {
        setIsLoading(true);
        try {
            const data = await httpRequest('GET', ApiEndpoints.GET_SYS_LOGS, {}, {}, { hours: hours });
            if (data) {
                let SortData = data.logs?.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date)).map((log) => ({ ...log, show: true }));
                setLogsData(SortData);
                setDataLength(SortData.length);
                setGotData(true);
            }
        } catch (error) {}
        setIsLoading(false);
    };

    const handleFilter = useCallback(
        (data, comingLogs) => {
            setIsLoading(true);
            let result;
            if (stateRef.current[0] === 'all') {
                if (stateRef.current[2].length > 1) {
                    result = data?.map((log) => (log?.log.toLowerCase().includes(stateRef.current[2]) ? { ...log, show: true } : { ...log, show: false }));
                } else {
                    let newData = data?.map((log) => ({ ...log, show: true }));
                    result = newData;
                }
            } else if (stateRef.current[2].length > 1) {
                result = data?.map((log) =>
                    log.type.toLowerCase() === stateRef.current[0] && log?.log.toLowerCase().includes(stateRef.current[2])
                        ? { ...log, show: true }
                        : { ...log, show: false }
                );
            } else {
                result = data?.map((log) => (log.type.toLowerCase() === stateRef.current[0] ? { ...log, show: true } : { ...log, show: false }));
            }
            if (comingLogs) {
                const newList = result.concat(stateRef.current[1]);
                setLogsData(newList);
                setDataLength(newList?.length);
            } else {
                setLogsData(result);
                setDataLength(result?.length);
            }
            setSearchInput(stateRef.current[2]);
            setIsLoading(false);
        },
        [stateRef.current[2]]
    );

    useEffect(() => {
        let socket;
        if (gotData) {
            socket = io.connect(SOCKET_URL, {
                path: '/api/socket.io',
                query: {
                    authorization: localStorage.getItem(LOCAL_STORAGE_TOKEN)
                },
                reconnection: true
            });

            setTimeout(() => {
                socket.emit('register_system_logs_data');
            }, 2000);

            socket.on('system_logs_data', (data) => {
                if (data) {
                    let sortData = data?.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
                    handleFilter(sortData, true);
                }
            });
        }

        return () => {
            if (socket?.connected) {
                socket.emit('deregister');
                socket.close();
            }
        };
    }, [gotData]);

    useEffect(() => {
        handleFilter(logsData, false);
    }, [logFilter]);

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    const onPressEnter = (e) => {
        e.preventDefault();
        handleFilter(logsData, false);
    };
    const onSelectedRow = (rowIndex) => {
        setSelectedRowIndex(rowIndex);
    };

    const updateLogFilter = (value) => {
        setLogFilter(value);
    };

    return (
        <div className="logs-list-container">
            {isLoading && (
                <div>
                    <Loader />
                </div>
            )}
            {!isLoading && (
                <div>
                    <div className="add-search-logs">
                        <SearchInput
                            value={searchInput}
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
                            onPressEnter={onPressEnter}
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
                                {logsData?.length > 0 &&
                                    logsData
                                        ?.filter((row) => row.show === true)
                                        .map((row, index) => {
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
                            <p className="row-content">{logsData.length > 0 && logsData[selectedRowIndex]?.show && logsData[selectedRowIndex]?.log}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenericList;
