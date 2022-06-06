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

import React, { useEffect, useRef } from 'react';
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
