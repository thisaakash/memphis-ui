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

import React, { useContext, useState } from 'react';
import { Checkbox } from 'antd';
import { Space } from 'antd';

import { convertBytes, parsingDate } from '../../../../services/valueConvertor';
import Journey from '../../../../assets/images/journey.svg';
import OverflowTip from '../../../../components/tooltip/overflowtip';
import CustomTabs from '../../../../components/Tabs';
import Button from '../../../../components/button';
import { InfoOutlined } from '@material-ui/icons';
import { StationStoreContext } from '../..';
import CustomCollapse from '../components/customCollapse';
import MultiCollapse from '../components/multiCollapse';
import { useHistory } from 'react-router-dom';

const dataSource = [
    {
        id: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street'
    },
    {
        id: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street'
    },
    {
        id: '3',
        name: 'Avi',
        age: 42,
        address: '10 Downing Street'
    },
    {
        id: '4',
        name: 'Idan',
        age: 42,
        address: '10 Downing Street'
    }
];

const produceData = [
    {
        name: 'Name',
        value: 'Logger'
    },
    {
        name: 'User',
        value: 'root'
    },
    {
        name: 'IP',
        value: '61.103.206.105'
    }
];
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

const CGData = [
    {
        name: 'CG_1',
        status: 'active',
        details: [
            {
                name: 'unprocessed messages',
                value: '2'
            },
            {
                name: 'In process Message',
                value: '4'
            },
            {
                name: 'poison messages',
                value: '12'
            },
            {
                name: 'max_ack_time',
                value: '12sec'
            },
            {
                name: 'max_message_deliveries',
                value: '421'
            }
        ]
    },
    {
        name: 'CG_2',
        status: 'active',
        details: [
            {
                name: 'unprocessed messages',
                value: '2'
            },
            {
                name: 'In process Message',
                value: '4'
            },
            {
                name: 'poison messages',
                value: '12'
            },
            {
                name: 'max_ack_time',
                value: '12sec'
            },
            {
                name: 'max_message_deliveries',
                value: '142'
            }
        ]
    }
];

const Messages = () => {
    const [stationState, stationDispatch] = useContext(StationStoreContext);
    const [selectedRowIndex, setSelectedRowIndex] = useState('1');
    const [isCheck, setIsCheck] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [tabValue, setTabValue] = useState('0');
    const tabs = ['All', 'Poison'];
    const history = useHistory();

    const onSelectedRow = (rowIndex) => {
        setSelectedRowIndex(rowIndex);
    };

    const onCheckedAll = (e) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(dataSource.map((li) => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleCheckedClick = (e) => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id));
        }
        if (isCheck.length === 1 && !checked) {
            setIsCheckAll(false);
        }
    };

    const handleChangeMenuItem = (newValue) => {
        setTabValue(newValue);
    };

    return (
        <div className="messages-container">
            <div className="header">
                <div className="left-side">
                    <p className="title">Station</p>
                    {stationState?.stationSocketData?.messages?.length > 0 && (
                        <div className="messages-amount">
                            <InfoOutlined />
                            <p>Showing last {stationState?.stationSocketData?.messages?.length} messages</p>
                        </div>
                    )}
                </div>
                {tabValue === '1' && (
                    <div className="right-side">
                        <Button
                            width="80px"
                            height="32px"
                            placeholder="Ack"
                            colorType="white"
                            radiusType="circle"
                            backgroundColorType="purple"
                            fontSize="12px"
                            fontWeight="600"
                            onClick={() => {}}
                        />
                        <Button
                            width="100px"
                            height="32px"
                            placeholder="Resend"
                            colorType="white"
                            radiusType="circle"
                            backgroundColorType="purple"
                            fontSize="12px"
                            fontWeight="600"
                            onClick={() => {}}
                        />
                    </div>
                )}
            </div>
            <div className="tabs">
                <CustomTabs value={tabValue} onChange={handleChangeMenuItem} tabs={tabs}></CustomTabs>
            </div>
            {stationState?.stationSocketData?.messages?.length > 0 ? (
                <div className="list-wrapper">
                    <div className="coulmns-table">
                        <div className={tabValue === '0' ? 'left-coulmn all' : 'left-coulmn'}>
                            {tabValue === '1' && <Checkbox checked={isCheckAll} id="selectAll" onChange={onCheckedAll} name="selectAll" />}
                            <p>Message</p>
                        </div>
                        <p className="right-coulmn">Details</p>
                    </div>
                    <div className="list">
                        <div className={tabValue === '0' ? 'rows-wrapper all' : 'rows-wrapper'}>
                            {dataSource?.map(({ id, name }) => {
                                return (
                                    <div className={selectedRowIndex === id ? 'message-row selected' : 'message-row'} key={id} onClick={() => onSelectedRow(id)}>
                                        {tabValue === '1' && <Checkbox key={id} checked={isCheck.includes(id)} id={id} onChange={handleCheckedClick} name={name} />}
                                        <OverflowTip text={name} width={'100px'}>
                                            {name}
                                        </OverflowTip>
                                    </div>
                                );
                            })}

                            {!stationState?.stationSocketData?.messages && (
                                <div className="empty-messages">
                                    <p>Waiting for messages</p>
                                </div>
                            )}
                        </div>
                        <div className="message-wrapper">
                            <div className="row-data">
                                <Space direction="vertical">
                                    <CustomCollapse header="Producer" status={true} defaultOpen={true} data={produceData} />
                                    <MultiCollapse header="Failed CGs" data={CGData} />
                                    <CustomCollapse header="Details" data={Details} />
                                    <CustomCollapse header="message" defaultOpen={true} data={message} message={true} />
                                </Space>
                            </div>
                            {tabValue === '1' && (
                                <Button
                                    width="96%"
                                    height="35px"
                                    placeholder={
                                        <div className="botton-title">
                                            <img src={Journey} alt="Journey" />
                                            <p>Message Journey</p>
                                        </div>
                                    }
                                    colorType="black"
                                    radiusType="semi-round"
                                    backgroundColorType="orange"
                                    fontSize="12px"
                                    fontWeight="600"
                                    onClick={() => history.push(`${window.location.pathname}/${'62ce914925f3bda8e841d03a'}`)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="empty-messages">
                    <p>Waiting for messages</p>
                </div>
            )}
        </div>
    );
};

export default Messages;
