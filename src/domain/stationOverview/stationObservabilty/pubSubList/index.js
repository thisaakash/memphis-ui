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

import React, { useContext, useEffect, useState } from 'react';

import comingSoonBox from '../../../../assets/images/comingSoonBox.svg';
import TooltipComponent from '../../../../components/tooltip/tooltip';
import OverflowTip from '../../../../components/tooltip/overflowtip';
import { DeleteForeverRounded } from '@material-ui/icons';

import { StationStoreContext } from '../..';
import StatusIndication from '../components/indication';
import CustomCollapse from '../components/customCollapse';
import MultiCollapse from '../components/multiCollapse';
import { Space } from 'antd';

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
const consumeData = [
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
];

const CGData = [
    {
        name: 'consumer_1',
        status: 'active',
        details: [
            {
                name: 'user',
                value: 'root'
            },
            {
                name: 'IP',
                value: '130.69.203.16'
            }
        ]
    },
    {
        name: 'CG_2',
        status: 'active',
        details: [
            {
                name: 'user',
                value: 'root'
            },
            {
                name: 'IP',
                value: '130.69.203.16'
            }
        ]
    }
];

const PubSubList = (props) => {
    const [stationState, stationDispatch] = useContext(StationStoreContext);
    const [selectedRowIndex, setSelectedRowIndex] = useState(0);
    const [producersList, setProducersList] = useState([]);
    const [consumersList, setConsumersList] = useState([]);

    useEffect(() => {
        if (props.producer) {
            let activeProducers = stationState?.stationSocketData?.active_producers || [];
            let killedProducers = stationState?.stationSocketData?.killed_producers || [];
            let destroyedProducers = stationState?.stationSocketData?.destroyed_producers || [];
            let primes = activeProducers.concat(killedProducers);
            primes = primes.concat(destroyedProducers);
            setProducersList(primes);
        } else {
            let activeConsumers = stationState?.stationSocketData?.active_consumers || [];
            let killedConsumers = stationState?.stationSocketData?.killed_consumers || [];
            let destroyedConsumers = stationState?.stationSocketData?.destroyed_consumers || [];
            let primes = activeConsumers.concat(killedConsumers);
            primes = primes.concat(destroyedConsumers);
            setConsumersList(primes);
        }
    }, [stationState?.stationSocketData]);

    const onSelectedRow = (rowIndex) => {
        setSelectedRowIndex(rowIndex);
    };

    return (
        <div className="pubSub-list-container">
            <div className="header">
                <p className="title">{props.producer ? 'Producers' : 'Consumers Group'}</p>
                {/* <p className="add-connector-button">{props.producer ? 'Add producer' : 'Add consumer'}</p> */}
            </div>
            {props.producer && (
                <div className="coulmns-table">
                    <span style={{ width: '100px' }}>Name</span>
                    <span style={{ width: '80px' }}>User</span>
                    <span style={{ width: '35px' }}>Status</span>
                </div>
            )}
            {!props.producer && (
                <div className="coulmns-table">
                    <span style={{ width: '85px' }}>Name</span>
                    <span style={{ width: '70px', textAlign: 'center' }}>Unprocessed</span>
                    <span style={{ width: '70px', textAlign: 'center' }}>Poison</span>
                    <span style={{ width: '35px', textAlign: 'center' }}>Status</span>
                </div>
            )}

            <div className="rows-wrapper">
                <div className="list-container">
                    {props.producer &&
                        producersList?.length > 0 &&
                        producersList?.map((row, index) => {
                            return (
                                // className={row.is_deleted ? 'pubSub-row deleted' : 'pubSub-row'}
                                <div
                                    className={selectedRowIndex === index ? (row.is_deleted ? 'pubSub-row selected-deleted' : 'pubSub-row selected') : 'pubSub-row'}
                                    key={index}
                                    onClick={() => onSelectedRow(index)}
                                >
                                    <OverflowTip text={row.name} width={'100px'}>
                                        {row.name}
                                    </OverflowTip>
                                    <OverflowTip text={row.created_by_user} width={'80px'}>
                                        {row.created_by_user}
                                    </OverflowTip>
                                    <span className="status-icon" style={{ width: '38px' }}>
                                        <StatusIndication is_active={row.is_active} is_deleted={row.is_deleted} />
                                    </span>
                                </div>
                            );
                        })}
                    {!props.producer &&
                        consumersList?.length > 0 &&
                        consumersList?.map((row, index) => {
                            return (
                                <div className={selectedRowIndex === index ? 'pubSub-row selected' : 'pubSub-row'} key={index} onClick={() => onSelectedRow(index)}>
                                    <OverflowTip text={row.consumers_group} width={'85px'}>
                                        {row.consumers_group}
                                    </OverflowTip>
                                    <OverflowTip text={row.created_by_user} width={'70px'} textAlign={'center'}>
                                        180,000
                                    </OverflowTip>
                                    <OverflowTip text={row.created_by_user} width={'70px'} textAlign={'center'}>
                                        100,000
                                    </OverflowTip>
                                    <span className="status-icon" style={{ width: '38px' }}>
                                        {/* {statusIndication(row.is_active, row.is_deleted)} */}
                                        <StatusIndication is_active={row.is_active} is_deleted={row.is_deleted} />
                                    </span>
                                </div>
                            );
                        })}
                </div>
                <div style={{ marginRight: '10px' }}>
                    {props.producer && producersList?.length > 0 && <CustomCollapse header="Details" defaultOpen={true} data={produceData} />}
                    {!props.producer && consumersList?.length > 0 && (
                        <Space direction="vertical">
                            <CustomCollapse header="Details" defaultOpen={true} data={consumeData} />
                            <MultiCollapse header="Consumers" data={CGData} />
                        </Space>
                    )}
                </div>
                {((props.producer && producersList?.length === 0) || (!props.producer && consumersList?.length === 0)) && (
                    <div className="empty-pub-sub">
                        <p>Waiting for {props.producer ? 'producers' : 'consumers'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PubSubList;
