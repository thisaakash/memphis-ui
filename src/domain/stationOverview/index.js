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

import React, { useEffect, useContext, useState, createContext, useReducer, useCallback } from 'react';

import StationOverviewHeader from './stationOverviewHeader';
import StationObservabilty from './stationObservabilty';
import { ApiEndpoints } from '../../const/apiEndpoints';
import { httpRequest } from '../../services/http';
import { Context } from '../../hooks/store';
import Throughput from './throughput';
import Auditing from './auditing';
import Reducer from './hooks/reducer';
import Loader from '../../components/loader';
import io from 'socket.io-client';
import { SOCKET_URL } from '../../config';
import { LOCAL_STORAGE_TOKEN } from '../../const/localStorageConsts';

const StationOverview = () => {
    const [stationState, stationDispatch] = useReducer(Reducer);
    const url = window.location.href;
    const stationName = url.split('factories/')[1].split('/')[1];
    const [state, dispatch] = useContext(Context);
    const [isLoading, setisLoading] = useState(false);

    const getStaionDetails = useCallback(async () => {
        const data = await httpRequest('GET', `${ApiEndpoints.GET_STATION}?station_name=${stationName}`);
        stationDispatch({ type: 'SET_STATION_META_DATA', payload: data });
    }, []);

    useEffect(() => {
        setisLoading(true);
        dispatch({ type: 'SET_ROUTE', payload: 'factories' });
        getStaionDetails().catch(console.error);

        const socket = io.connect(SOCKET_URL, {
            path: '/api/socket.io',
            query: {
                authorization: localStorage.getItem(LOCAL_STORAGE_TOKEN)
            },
            reconnection: false
        });

        socket.on('station_overview_data', (data) => {
            stationDispatch({ type: 'SET_SOCKET_DATA', payload: data });
        });

        setTimeout(() => {
            socket.emit('register_station_overview_data', stationName);
            setisLoading(false);
        }, 3000);
        return () => {
            socket.emit('deregister');
            socket.close();
        };
    }, []);

    return (
        <StationStoreContext.Provider value={[stationState, stationDispatch]}>
            <React.Fragment>
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
            </React.Fragment>
        </StationStoreContext.Provider>
    );
};
export const StationStoreContext = createContext({});
export default StationOverview;
