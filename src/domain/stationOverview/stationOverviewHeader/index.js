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

import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { Progress } from 'antd';

import HealthyBadge from '../../../components/healthyBadge';
import { Context } from '../../../hooks/store';
import { StationStoreContext } from '..';
import { convertSecondsToDate } from '../../../services/dateConvertor';
import pathDomains from '../../../router';
import awaitingIcon from '../../../assets/images/awaitingIcon.svg';
import averageMesIcon from '../../../assets/images/averageMesIcon.svg';
import cpuIcon from '../../../assets/images/cpuIcon.svg';
import memoryIcon from '../../../assets/images/memoryIcon.svg';
import storageIcon from '../../../assets/images/storageIcon.svg';
import Button from '../../../components/button';
import Modal from '../../../components/modal';
import SelectComponent from '../../../components/select';
import { CopyBlock, atomOneLight } from 'react-code-blocks';
import comingSoonBox from '../../../assets/images/comingSoonBox.svg';
import { codeExample, dockerCodeExample } from '../../../const/SDKExample';

const StationOverviewHeader = (props) => {
    const [state, dispatch] = useContext(Context);
    const [stationState, stationDispatch] = useContext(StationStoreContext);
    const history = useHistory();
    const [retentionValue, setRetentionValue] = useState('');
    const connectionDetails = {
        host: 'https://stream-staging.memphis.io/json/2a0f1f21-cd0d-4a1b-9538-f938e2eed8cd',
        AuthType: 'Api key',
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    };
    const [open, modalFlip] = useState(false);
    const selectLngOption = ['Node.js'];
    const [langSelected, setLangSelected] = useState('Node.js');
    const codeExample = (process.env.DOCKER_ENV = 'true' ? dockerCodeExample : codeExample);

    const handleSelectLang = (e) => {
        setLangSelected(e);
    };
    useEffect(() => {
        switch (stationState?.station?.retention_type) {
            case 'message_age_sec':
                setRetentionValue(convertSecondsToDate(stationState?.station?.retention_value));
                break;
            case 'bytes':
                setRetentionValue(`${stationState?.station?.retention_value} bytes`);
                break;
            case 'messages':
                setRetentionValue(`${stationState?.station?.retention_value} messages`);
                break;
            default:
                break;
        }
    }, []);

    const returnToStaionsList = () => {
        const url = window.location.href;
        const staionName = url.split('factories/')[1].split('/')[0];
        history.push(`${pathDomains.factoriesList}/${staionName}`);
    };

    return (
        <div className="station-overview-header">
            <div className="title-wrapper">
                <h1 className="station-name">Overview - {stationState?.station?.name}</h1>
                <CloseIcon onClick={() => returnToStaionsList()} style={{ cursor: 'pointer' }} />
            </div>
            <div className="sdk-button">
                <Button
                    width="73px"
                    height="21px"
                    placeholder="SDK"
                    colorType="purple"
                    radiusType="circle"
                    backgroundColorType="none"
                    fontSize="12px"
                    fontWeight="600"
                    border="purple"
                    onClick={() => modalFlip(true)}
                />
            </div>
            <div className="details">
                <div className="main-details">
                    <p>
                        <b>Retention:</b> {retentionValue}
                    </p>
                    <p>
                        <b>Replicas:</b> {stationState?.station?.replicas}
                    </p>
                    <p>
                        <b>Storage Type:</b> {stationState?.station?.storage_type}
                    </p>
                </div>
                <div className="icons-wrapper">
                    <div className="coming-soon-wrapper icons-coming-soon">
                        <img src={comingSoonBox} width={20} height={40} />
                        <p>Coming soon</p>
                    </div>
                    <div className="details-wrapper">
                        <div className="icon">
                            <img src={awaitingIcon} width={22} height={44} />
                        </div>
                        <div className="more-details">
                            <p className="number">1000</p>
                            <p className="title">Awaiting messages</p>
                        </div>
                    </div>
                    <div className="details-wrapper">
                        <div className="icon">
                            <img src={averageMesIcon} width={24} height={24} />
                        </div>
                        <div className="more-details">
                            <p className="number">500Mb</p>
                            <p className="title">Av. message size</p>
                        </div>
                    </div>
                    <div className="details-wrapper">
                        <div className="icon">
                            <img src={memoryIcon} width={24} height={24} />
                        </div>
                        <div className="more-details">
                            <p className="number">20Mb/80Mb</p>
                            <Progress showInfo={false} status={(20 / 80) * 100 > 60 ? 'exception' : 'success'} percent={(20 / 80) * 100} size="small" />
                            <p className="title">Mem</p>
                        </div>
                    </div>
                    <div className="details-wrapper">
                        <div className="icon">
                            <img src={cpuIcon} width={22} height={22} />
                        </div>
                        <div className="more-details">
                            <p className="number">50%</p>
                            <Progress showInfo={false} status={(35 / 100) * 100 > 60 ? 'exception' : 'success'} percent={(35 / 100) * 100} size="small" />
                            <p className="title">CPU</p>
                        </div>
                    </div>
                    <div className="details-wrapper">
                        <div className="icon">
                            <img src={storageIcon} width={30} height={30} />
                        </div>
                        <div className="more-details">
                            <p className="number">{60}Mb/100Mb</p>
                            <Progress showInfo={false} status={(60 / 100) * 100 > 60 ? 'exception' : 'success'} percent={(60 / 100) * 100} size="small" />
                            <p className="title">Storage</p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal header="SDK" minHeight="740px" minWidth="500px" closeAction={() => modalFlip(false)} clickOutside={() => modalFlip(false)} open={open} hr={false}>
                <div className="sdk-details-container">
                    <div className="select-lan">
                        <p>Language</p>
                        <SelectComponent
                            value={langSelected}
                            colorType="navy"
                            backgroundColorType="none"
                            borderColorType="gray"
                            radiusType="semi-round"
                            width="220px"
                            height="50px"
                            options={selectLngOption}
                            onChange={(e) => handleSelectLang(e)}
                            dropdownClassName="select-options"
                        />
                    </div>
                    <div className="installation">
                        <p>Installation</p>
                        <div className="install-copy">
                            <p></p>
                            <CopyBlock language={'jsx'} text={'npm i memphis-dev --save'} showLineNumbers={false} theme={atomOneLight} wrapLines={true} codeBlock />
                        </div>
                    </div>
                    <div className="code-example">
                        <p>which should output something like</p>
                        <div className="code-content">
                            <CopyBlock language={'jsx'} text={codeExample} showLineNumbers={true} theme={atomOneLight} wrapLines={true} codeBlock />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default StationOverviewHeader;
