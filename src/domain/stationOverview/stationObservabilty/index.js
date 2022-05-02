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

import React, { useContext, useEffect, useRef } from 'react';
import lottie from 'lottie-web';

import animationData from '../../../assets/lotties/thunnel-many.json';
import FunctionsBox from './functionsBox';
import PubSubList from './pubSubList';
import { StationStoreContext } from '..';

const StationObservabilty = () => {
    const fromProducer = useRef(null);
    const toConsumer = useRef(null);
    const [stationState, stationDispatch] = useContext(StationStoreContext);

    useEffect(() => {
        lottie.loadAnimation({
            container: fromProducer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData
        });
        lottie.loadAnimation({
            container: toConsumer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData
        });
    }, []);

    return (
        <div className="station-observabilty-container">
            <div className="pub-list">
                <PubSubList producer={true} />
            </div>
            <div className="thunnel-from-sub">
                {stationState?.station?.producers?.length > 0 && <div style={{ height: '10vw', width: '10vw' }} ref={fromProducer}></div>}
            </div>
            <div className="functions-box-overview">
                <FunctionsBox />
            </div>
            <div className="thunnel-to-pub">{stationState?.station?.consumers?.length > 0 && <div style={{ height: '10vw', width: '10vw' }} ref={toConsumer}></div>}</div>
            <div className="sub-list">
                <PubSubList producer={false} />
            </div>
        </div>
    );
};

export default StationObservabilty;
