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

import React, { useEffect, useContext, useState, createContext, useReducer } from 'react';

import StationOverviewHeader from './stationOverviewHeader';
import StationObservabilty from './stationObservabilty';
import { ApiEndpoints } from '../../const/apiEndpoints';
import { httpRequest } from '../../services/http';
import { Context } from '../../hooks/store';
import Throughput from './throughput';
import Auditing from './auditing';
import Reducer from './hooks/reducer';
import Loader from '../../components/loader';

export const StationStoreContext = createContext({});

const StationOverview = () => {
    const [stationState, stationDispatch] = useReducer(Reducer);

    const [state, dispatch] = useContext(Context);
    const [isLoading, setisLoading] = useState(false);
    const [staionDetails, setStaionDetails] = useState('');
    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'factories' });
        getStaionDetails();
    }, []);

    const getStaionDetails = async () => {
        const url = window.location.href;
        const stationName = url.split('factories/')[1].split('/')[1];
        try {
            setisLoading(true);
            let data = await httpRequest('GET', `${ApiEndpoints.GET_STATION}?station_name=${stationName}`);
            const consumers = await httpRequest('GET', `${ApiEndpoints.GET_ALL_CONSUMERS_BY_STATION}?station_name=${stationName}`);
            const producers = await httpRequest('GET', `${ApiEndpoints.GET_ALL_PRODUCERS_BY_STATION}?station_name=${stationName}`);
            data['consumers'] = consumers;
            data['producers'] = producers;
            stationDispatch({ type: 'SET_STATION_DATA', payload: data });
        } catch (err) {
            setisLoading(false);
            return;
        }
        setisLoading(false);
    };

    return (
        <StationStoreContext.Provider value={[stationState, stationDispatch]}>
            {isLoading && (
                <div className="loader-uploading">
                    <Loader />
                </div>
            )}
            {!isLoading && (
                <div className="station-overview-container">
                    <div className="overview-header">
                        <StationOverviewHeader />
                    </div>
                    <div className="overview-top">
                        <div className="station-observability">
                            <StationObservabilty />
                        </div>
                    </div>
                    <div className="overview-bottom">
                        <div className="auditing">
                            <Auditing />
                        </div>
                        <div className="throughput">
                            <Throughput />
                        </div>
                    </div>
                </div>
            )}
        </StationStoreContext.Provider>
    );
};

export default StationOverview;
