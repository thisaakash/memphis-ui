import './style.scss';

import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

import animationData from '../../assets/lotties/MemphisGif.json';

const Loader = () => {
    const memphisGif = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: memphisGif.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData
        });
    }, []);

    return (
        <div className="loader-container">
            <div className="gif-wrapper"></div>
            <div className="memphis-gif" style={{ height: '10vw', width: '10vw' }} ref={memphisGif}></div>
        </div>
    );
};

export default Loader;
