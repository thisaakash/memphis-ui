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

import React, { useContext } from 'react';

import OverflowTip from '../../../../components/tooltip/overflowtip';
import comingSoonBox from '../../../../assets/images/comingSoonBox.svg';
import infoIcon from '../../../../assets/images/infoIcon.svg';
import { StationStoreContext } from '../..';

const PubSubList = (props) => {
    const [stationState, stationDispatch] = useContext(StationStoreContext);

    return (
        <div className="pubSub-list-container">
            <div className="header">
                <p className="title">{props.producer ? 'Producer' : 'Consumer'}</p>
                {/* <p className="add-connector-button">{props.producer ? 'Add producer' : 'Add consumer'}</p> */}
            </div>
            <div className="coulmns-table">
                <span style={{ width: '100px' }}>Name</span>
                <span style={{ width: '100px' }}>Type</span>
                <span style={{ width: '100px' }}>User</span>
                <span style={{ width: '15px' }}></span>
            </div>
            <div className="rows-wrapper">
                {props.producer &&
                    stationState?.station?.producers?.length > 0 &&
                    stationState?.station?.producers?.map((row, index) => {
                        return (
                            <div className="pubSub-row" key={index}>
                                <OverflowTip text={row.name} width={'100px'}>
                                    {row.name}
                                </OverflowTip>
                                <OverflowTip text={row.type} width={'100px'}>
                                    {row.type}
                                </OverflowTip>
                                <OverflowTip text={row.created_by_user} width={'100px'}>
                                    {row.created_by_user}
                                </OverflowTip>
                                <span className="link-row" style={{ width: '15px' }}>
                                    <img src={infoIcon} />
                                </span>
                            </div>
                        );
                    })}
                {!props.producer &&
                    stationState?.station?.consumers?.length > 0 &&
                    stationState?.station?.consumers?.map((row, index) => {
                        return (
                            <div className="pubSub-row" key={index}>
                                <OverflowTip text={row.name} width={'100px'}>
                                    {row.name}
                                </OverflowTip>
                                <OverflowTip text={row.type} width={'100px'}>
                                    {row.type}
                                </OverflowTip>
                                <OverflowTip text={row.created_by_user} width={'100px'}>
                                    {row.created_by_user}
                                </OverflowTip>
                                <span className="link-row" style={{ width: '15px' }}>
                                    <img src={infoIcon} />
                                </span>
                            </div>
                        );
                    })}
                {((props.producer && stationState?.station?.producers?.length === 0) || (!props.producer && stationState?.station?.consumers?.length === 0)) && (
                    <div className="empty-pub-sub">
                        <p>Waiting for {props.producer ? 'producers' : 'consumers'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PubSubList;
