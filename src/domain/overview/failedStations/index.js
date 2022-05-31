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
import { Link } from 'react-router-dom';

import comingSoonBox from '../../../assets/images/comingSoonBox.svg';
import ErrorSharpIcon from '@material-ui/icons/ErrorSharp';
import { Context } from '../../../hooks/store';
import pathDomains from '../../../router';
import { parsingDate } from '../../../services/dateConvertor';

const FailedStations = () => {
    const [state, dispatch] = useContext(Context);
    return (
        <div className="overview-wrapper failed-factories-container">
            {/* <div className="coming-soon-wrapper">
                <img src={comingSoonBox} width={40} height={70} />
                <p>Coming soon</p>
            </div> */}
            <p className="overview-components-header">Stations</p>
            {/* <p className="overview-components-header">Un-Healthy stations</p> */}
            {/* <div className="factories-err-message">
                <ErrorSharpIcon className="err-icon" theme="outlined" />
                <p>For 5/23 stations, there may be a problem</p>
            </div> */}
            <div className="err-factories-list">
                <div className="coulmns-table">
                    <span style={{ width: '200px' }}>Name</span>
                    <span style={{ width: '200px' }}>Factory name</span>
                    <span style={{ width: '200px' }}>Creation date</span>
                    {/* <span style={{ width: '100px' }}>Status</span> */}
                    <span style={{ width: '100px' }}></span>
                </div>
                <div className="rows-wrapper">
                    {state?.monitor_data?.stations?.map((station, index) => {
                        return (
                            <div className="factory-row" key={index}>
                                <span style={{ width: '200px' }}>{station.name}</span>
                                <span style={{ width: '200px' }}>{station.factory_name}</span>
                                <span style={{ width: '200px' }}>{parsingDate(station.creation_date)}</span>
                                {/* {station.status === 1 && (
                                    <span style={{ width: '100px' }}>
                                        <div className="dot green"></div>
                                        In action
                                    </span>
                                )}
                                {station.status === 2 && (
                                    <span style={{ width: '100px' }}>
                                        <div className="dot yellow"></div>
                                        On idle
                                    </span>
                                )} */}
                                <Link style={{ cursor: 'pointer' }} to={`${pathDomains.factoriesList}/${station.factory_name}/${station.name}`}>
                                    <span className="link-row" style={{ width: '100px' }}>
                                        Go to station
                                    </span>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FailedStations;
