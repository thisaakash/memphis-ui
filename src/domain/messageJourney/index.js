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

import React, { useEffect, useContext, useState } from 'react';

import BackIcon from '../../assets/images/backIcon.svg';
import { ApiEndpoints } from '../../const/apiEndpoints';
import { httpRequest } from '../../services/http';
import { useHistory } from 'react-router-dom';
import Loader from '../../components/loader';
import { Context } from '../../hooks/store';
import pathDomains from '../../router';
import Chart from 'react-google-charts';

const sankeyData = [
    ['From', 'To', 'Weight'],
    ['A', 'X', 5],
    ['A', 'Y', 7],
    ['A', 'Z', 6],
    ['B', 'X', 2],
    ['B', 'Y', 9],
    ['B', 'Z', 4]
];
const MessageJourney = () => {
    const [state, dispatch] = useContext(Context);
    const url = window.location.href;
    const messageId = url.split('factories/')[1].split('/')[2];
    const [isLoading, setisLoading] = useState(false);
    const [messageData, setMessageData] = useState({});
    const history = useHistory();

    const getPosionMessageDetails = async () => {
        setisLoading(true);
        try {
            const data = await httpRequest('GET', `${ApiEndpoints.GET_POISION_MESSAGE_JOURNEY}?message_id=${messageId}`);
            setMessageData(data);
            setTimeout(() => {
                setisLoading(false);
            }, 1000);
        } catch (error) {
            setisLoading(false);
            if (error.status === 404 || error.status === 666) {
                returnBack();
            }
        }
    };

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'factories' });
        getPosionMessageDetails();
    }, []);

    useEffect(() => {
        state.socket?.on(`poison_message_journey_data_${messageId}`, (data) => {
            setMessageData(data);
        });

        setTimeout(() => {
            state.socket?.emit('register_poison_message_journey_data', messageId);
        }, 1000);
        return () => {
            state.socket?.emit('deregister');
        };
    }, [state.socket]);

    const returnBack = () => {
        history.push(`${pathDomains.factoriesList}/${url.split('factories/')[1].split('/')[0]}/${url.split('factories/')[1].split('/')[1]}`);
    };

    return (
        <>
            {isLoading && (
                <div className="loader-uploading">
                    <Loader />
                </div>
            )}
            {!isLoading && (
                <div className="message-journey-container">
                    <div className="bread-crumbs">
                        <img src={BackIcon} onClick={() => returnBack()} />
                        <p>
                            {url.split('factories/')[1].split('/')[0]} / {url.split('factories/')[1].split('/')[1]}
                        </p>
                    </div>
                    <div>
                        <Chart width={700} height={'350px'} chartType="Sankey" loader={<div>Loading Chart</div>} data={sankeyData} rootProps={{ 'data-testid': '1' }} />
                    </div>
                </div>
            )}
        </>
    );
};

export default MessageJourney;
