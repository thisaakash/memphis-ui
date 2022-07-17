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

import React, { useState } from 'react';
import Button from '../../../../components/button';
import CustomCollapse from '../../../stationOverview/stationObservabilty/components/customCollapse';
import { Space } from 'antd';
import { httpRequest } from '../../../../services/http';
import { ApiEndpoints } from '../../../../const/apiEndpoints';

const PoisionMessage = ({ stationName, messageId, details, message, procssing, returnBack }) => {
    const [resendProcced, setResendProcced] = useState(false);
    const [ackProcced, setAckProcced] = useState(false);

    const handleAck = async () => {
        setAckProcced(true);
        try {
            await httpRequest('POST', `${ApiEndpoints.ACK_POISION_MESSAGE}`, { poison_message_ids: [messageId] });
            setTimeout(() => {
                setAckProcced(false);
                returnBack();
            }, 1500);
        } catch (error) {
            setAckProcced(false);
        }
    };

    const handleResend = async () => {
        setResendProcced(true);
        procssing(true);
        try {
            await httpRequest('POST', `${ApiEndpoints.RESEND_POISION_MESSAGE_JOURNEY}`, { poison_message_ids: [messageId] });
            setTimeout(() => {
                setResendProcced(false);
                procssing(false);
            }, 2500);
        } catch (error) {
            setResendProcced(false);
            procssing(false);
        }
    };

    return (
        <div className="poision-message">
            <header is="x3d">
                <p>
                    {stationName} / #{messageId.substring(0, 5)}
                </p>
                <div className="btn-row">
                    <Button
                        width="75px"
                        height="24px"
                        placeholder="Ack"
                        colorType="white"
                        radiusType="circle"
                        backgroundColorType="purple"
                        fontSize="12px"
                        fontWeight="600"
                        isLoading={ackProcced}
                        onClick={() => handleAck()}
                    />
                    <Button
                        width="90px"
                        height="24px"
                        placeholder="Resend"
                        colorType="white"
                        radiusType="circle"
                        backgroundColorType="purple"
                        fontSize="12px"
                        fontWeight="600"
                        isLoading={resendProcced}
                        onClick={() => handleResend()}
                    />
                </div>
            </header>
            <div className="content-wrapper">
                <Space direction="vertical">
                    <CustomCollapse status={false} header="Details" defaultOpen={true} data={details} />
                    <CustomCollapse status={false} header="message" defaultOpen={true} data={message} message={true} />
                </Space>
            </div>
        </div>
    );
};
export default PoisionMessage;
