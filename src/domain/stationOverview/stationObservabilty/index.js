import './style.scss';

import React, { useContext, useEffect, useRef } from 'react';
import lottie from 'lottie-web';

import animationData from '../../../assets/lotties/thunnel-many.json';
import FunctionsBox from './functionsBox';
import PubSubList from './pubSubList';
import { StationStoreContext } from '..';

const StationObservabilty = () => {
    const anime = useRef(null);
    const anime1 = useRef(null);
    const [stationState, stationDispatch] = useContext(StationStoreContext);

    useEffect(() => {
        lottie.loadAnimation({
            container: anime.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData
        });
        lottie.loadAnimation({
            container: anime1.current,
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
            <div className="thunnel-from-sub">{stationState?.station?.producers?.length > 0 && <div style={{ height: '10vw', width: '10vw' }} ref={anime}></div>}</div>
            <div className="functions-box-overview">
                <FunctionsBox />
            </div>
            <div className="thunnel-to-pub">{stationState?.station?.consumers?.length > 0 && <div style={{ height: '10vw', width: '10vw' }} ref={anime1}></div>}</div>
            <div className="sub-list">
                <PubSubList producer={false} />
            </div>
        </div>
    );
};

export default StationObservabilty;
