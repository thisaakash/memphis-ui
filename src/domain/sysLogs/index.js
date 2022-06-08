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

import React, { useCallback, useEffect, useContext, createContext } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './style.scss';
import Loader from '../../components/loader';
import { SOCKET_URL } from '../../config';
import { LOCAL_STORAGE_TOKEN } from '../../const/localStorageConsts';
import pathDomains from '../../router';
import { Context } from '../../hooks/store';
import GenericList from './genericList';

const logColumns = [
    {
        key: '1',
        title: 'Source',
        width: '100px'
    },
    {
        key: '2',
        title: 'Type',
        width: '50px'
    },
    {
        key: '3',
        title: 'Creation date',
        width: '200px'
    },
    {
        key: '4',
        title: 'Log',
        width: '490px'
    }
];

const SysLogs = () => {
    const history = useHistory();
    const [isLoading, setisLoading] = useState(false);
    const [state, dispatch] = useContext(Context);

    // const getSysLogs = useCallback(async () => {
    //     try {
    //     } catch (error) {
    //         if (error.status === 404) {
    //             history.push(`${pathDomains.overview}`);
    //         }
    //     }
    // });
    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'overview' });
    }, []);

    return (
        <React.Fragment>
            {/* {isLoading && (
                <div>
                    <Loader />
                </div>
            )} */}
            {/* {!isLoading && ( */}
            <div>
                <div className="logs-container">
                    <h1 className="main-header-h1">System Logs</h1>
                    <GenericList columns={logColumns} />
                </div>
            </div>
            {/* )} */}
        </React.Fragment>
    );
};

export const LogsStoreContext = createContext({});
export default SysLogs;
