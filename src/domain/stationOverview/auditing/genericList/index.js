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

import OverflowTip from '../../../../components/tooltip/overflowtip';
import Reducer from '../../hooks/reducer';
import { StationStoreContext } from '../..';

const GenericList = (props) => {
    const [stationState, stationDispatch] = useContext(StationStoreContext);

    const { columns, tab } = props;
    const [rowsData, setRowsData] = useState([]);
    const [selectedRowIndex, setSelectedRowIndex] = useState(0);

    useEffect(() => {
        if (tab === 1) {
            setRowsData(stationState?.stationSocketData?.audit_logs);
        }
    }, [stationState]);

    const onSelectedRow = (rowIndex) => {
        setSelectedRowIndex(rowIndex);
    };

    const parsingDate = (date) => {
        var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(date).toLocaleDateString([], options);
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
                    {rowsData?.map((row, index) => {
                        return (
                            <div className={selectedRowIndex === index ? 'pubSub-row selected' : 'pubSub-row'} key={index} onClick={() => onSelectedRow(index)}>
                                <OverflowTip text={row?.message || row?.produced_by} width={'300px'}>
                                    {row?.message || row?.produced_by}
                                </OverflowTip>
                                <OverflowTip text={row?.user_type || row?.consumer} width={'200px'}>
                                    {row?.user_type || row?.consumer}
                                </OverflowTip>
                                <OverflowTip text={row?.creation_date} width={'200px'}>
                                    {parsingDate(row?.creation_date)}
                                </OverflowTip>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="row-data">
                <p>{rowsData[selectedRowIndex]?.message}</p>
            </div>
        </div>
    );
};

export default GenericList;
