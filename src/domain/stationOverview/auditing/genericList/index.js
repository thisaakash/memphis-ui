// Copyright 2021-2022 The Memphis Authors
// Licensed under the Apache License, Version 2.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import './style.scss';

import React, { useState } from 'react';

import OverflowTip from '../../../../components/tooltip/overflowtip';

const GenericList = (props) => {
    const { columns, rows } = props;

    const [selectedRowIndex, setSelectedRowIndex] = useState(0);

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
                    {rows?.map((row, index) => {
                        return (
                            <div className={selectedRowIndex === index ? 'pubSub-row selected' : 'pubSub-row'} key={index} onClick={() => onSelectedRow(index)}>
                                <OverflowTip text={row.logData || row.producer} width={'250px'}>
                                    {row.logData || row.producer}
                                </OverflowTip>
                                <OverflowTip text={row.source || row.consumer} width={'250px'}>
                                    {row.source || row.consumer}
                                </OverflowTip>
                                <OverflowTip text={row.date} width={'200px'}>
                                    {row.date}
                                </OverflowTip>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="row-data">
                <p>{rows[selectedRowIndex].logData || rows[selectedRowIndex].data}</p>
            </div>
        </div>
    );
};

export default GenericList;
