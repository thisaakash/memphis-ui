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
import StatusIndication from '../../../../components/indication';
import Button from '../../../../components/button';
import CustomCollapse from '../../../stationOverview/stationObservabilty/components/customCollapse';
import { Space } from 'antd';

const Details = [
    {
        name: 'Message size',
        value: '10 Bytes'
    },
    {
        name: 'Date Created',
        value: 'July 7, 2022'
    },
    {
        name: 'Time sent',
        value: '1:48 PM'
    }
];

const message = `{"web-app": {
    "servlet": [   
      {
        "servlet-name": "cofaxCDS",
        "servlet-class": "org.cofax.cds.CDSServlet",
        "init-param": {
          "configGlossary:installationAt": "Philadelphia, PA",
          "configGlossary:adminEmail": "ksm@pobox.com",
          "configGlossary:poweredBy": "Cofax",
          "configGlossary:poweredByIcon": "/images/cofax.gif"}`;
const PoisionMessage = ({ stationName, messageId }) => {
    return (
        <div className="poision-message">
            <header is="x3d">
                <p>
                    {stationName} / {messageId}
                </p>
                <div className="btn-row">
                    <Button
                        width="65px"
                        height="25px"
                        placeholder="Ack"
                        colorType="white"
                        radiusType="circle"
                        backgroundColorType="purple"
                        fontSize="12px"
                        fontWeight="600"
                        onClick={() => {}}
                    />
                    <Button
                        width="65px"
                        height="24px"
                        placeholder="Resend"
                        colorType="white"
                        radiusType="circle"
                        backgroundColorType="purple"
                        fontSize="12px"
                        fontWeight="600"
                        onClick={() => {}}
                    />
                </div>
            </header>
            <div className="content-wrapper">
                <Space direction="vertical">
                    <CustomCollapse header="Details" defaultOpen={true} data={Details} />
                    <CustomCollapse header="message" defaultOpen={true} data={message} message={true} />
                </Space>
            </div>
        </div>
    );
};
export default PoisionMessage;
