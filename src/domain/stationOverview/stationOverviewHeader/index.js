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
    const value = `const memphis = require("memphisos");

        (async function () {
            try {
                await memphis.connect({
                    host: "<host-name>",
                    port: 6666,
                    brokerHost: "<broker-host>",
                    brokerPort: 7766,
                    username: "<username (type application)>",
                    connectionToken: "<broker-token>",
                    reconnect: true, // optional
                    maxReconnect: 10, // optional
                    reconnectIntervalMs: 1500, // optional
                    timeoutMs: 1500 // optional
                });
        
                const factory = await memphis.factory({
                    name: "<factory-name>",
                    description: "" // optional
                });
        
                const station = await memphis.station({
                    name: "<station-name>",
                    factoryName: "<factory-name>",
                    retentionType: memphis.retentionTypes.MAX_MESSAGE_AGE_SECONDS, // optional
                    retentionValue: 604800, // optional
                    storageType: memphis.storageTypes.FILE, // optional
                    replicas: 1, // optional
                    dedupEnabled: false, // optional
                    dedupWindowMs: 0 // optional
                });
        
                const producer = await memphis.producer({
                    stationName: "<station-name>",
                    producerName: "<producer-name>"
                });
        
                const consumer = await memphis.consumer({
                    stationName: "<station-name>",
                    consumerName: "<consumer-name>",
                    consumerGroup: "<group-name>", // optional
                    pullIntervalMs: 1000, // optional
                    batchSize: 10, // optional
                    batchMaxTimeToWaitMs: 5000 // optional
                });
        
                consumer.on("message", message => {
                    console.log(message);
                    message.ack();
                });
        
                consumer.on("error", error => {
                    console.log(error);
                });
        
                await station.destroy();
                await factory.destroy();
                await producer.destroy();
                await consumer.destroy();
                memphis.close();
            } catch (ex) {
                console.log(ex)
                memphis.close()
            }
        }());`;

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
                            <CopyBlock language={'jsx'} text={'npm i memphisos --save'} showLineNumbers={false} theme={atomOneLight} wrapLines={true} codeBlock />
                        </div>
                    </div>
                    <div className="code-example">
                        <p>which should output something like</p>
                        <div className="code-content">
                            <CopyBlock language={'jsx'} text={value} showLineNumbers={true} theme={atomOneLight} wrapLines={true} codeBlock />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default StationOverviewHeader;
