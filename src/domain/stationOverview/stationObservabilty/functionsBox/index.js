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

import React from 'react';

import FunctionsOverview from '../../../../components/functionsOverview';
import comingSoonBox from '../../../../assets/images/comingSoonBox.svg';

const functions = [
    {
        _id: 1,
        name: 'Sentiment Analysis',
        type: 'blabl'
    },
    {
        _id: 2,
        name: 'Clustering',
        type: 'blabl'
    },
    {
        _id: 3,
        name: 'Anomaly Detection',
        type: 'blabl'
    },
    {
        _id: 3,
        name: 'Regression',
        type: 'blabl'
    }
];

const FunctionsBox = () => {
    return (
        <div className="functions-box-container">
            <div className="header">
                <p className="title">Station</p>
                {/* <p className="add-functions-button">Add functions</p> */}
            </div>
            <div className="coming-soon-wrapper function">
                <img src={comingSoonBox} width={40} height={70} />
                <p>Coming soon</p>
            </div>
            <div className="function-list">
                <FunctionsOverview functions={functions} horizontal={false} editable={false} />
            </div>
        </div>
    );
};

export default FunctionsBox;
