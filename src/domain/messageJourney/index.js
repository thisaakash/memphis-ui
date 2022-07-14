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

import React, { useEffect, useContext, useState } from 'react';

import BackIcon from '../../assets/images/backIcon.svg';
import { ApiEndpoints } from '../../const/apiEndpoints';
import { httpRequest } from '../../services/http';
import { useHistory } from 'react-router-dom';
import Loader from '../../components/loader';
import { Context } from '../../hooks/store';
import pathDomains from '../../router';
import { Canvas, Node, Edge, Label } from 'reaflow';
import Producer from './components/producer';
import PoisionMessage from './components/poisionMessage';
import ConsumerGroup from './components/consumerGroup';
import { convertBytes, parsingDate } from '../../services/valueConvertor';

const MessageJourney = () => {
    const [state, dispatch] = useContext(Context);
    const url = window.location.href;
    const messageId = url.split('factories/')[1].split('/')[2];
    const stationName = url.split('factories/')[1].split('/')[1];
    const [isLoading, setisLoading] = useState(false);
    const [messageData, setMessageData] = useState({});
    const history = useHistory();

    const getPosionMessageDetails = async () => {
        setisLoading(true);
        try {
            const data = await httpRequest('GET', `${ApiEndpoints.GET_POISION_MESSAGE_JOURNEY}?message_id=${messageId}`);
            arrangeData(data);
            setTimeout(() => {
                setisLoading(false);
            }, 1000);
        } catch (error) {
            setisLoading(false);
            if (error.status === 404 || error.status === 666) {
                returnBack();
            }
        }
    };

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'factories' });
        getPosionMessageDetails();
    }, []);

    useEffect(() => {
        state.socket?.on(`poison_message_journey_data_${messageId}`, (data) => {
            arrangeData(data);
        });

        setTimeout(() => {
            state.socket?.emit('register_poison_message_journey_data', messageId);
        }, 1000);
        return () => {
            state.socket?.emit('deregister');
        };
    }, [state.socket]);

    const returnBack = () => {
        history.push(`${pathDomains.factoriesList}/${url.split('factories/')[1].split('/')[0]}/${stationName}`);
    };

    const arrangeData = (data) => {
        let poisionedCGs = [];
        if (data) {
            data.poisoned_cgs.map((row, index) => {
                let cg = {
                    name: row.cg_name,
                    is_active: true,
                    is_deleted: false,
                    cgMembers: row.cg_members,
                    details: [
                        {
                            name: 'unprocessed messages',
                            value: row?.unprocessed_messages
                        },
                        {
                            name: 'In process Message',
                            value: row?.in_process_messages
                        },
                        {
                            name: 'poison messages',
                            value: row?.total_poison_messages
                        },
                        {
                            name: 'max_ack_time',
                            value: `${row?.max_ack_time_ms}ms`
                        },
                        {
                            name: 'max_message_deliveries',
                            value: row?.max_msg_deliveries
                        }
                    ]
                };
                poisionedCGs.push(cg);
            });
            let messageDetails = {
                id: data._id ?? null,
                messageSeq: data.message_seq,
                details: [
                    {
                        name: 'Message size',
                        value: convertBytes(data.message?.size)
                    },
                    {
                        name: 'Time Sent',
                        value: parsingDate(data.message?.time_sent)
                    }
                ],
                producer: {
                    is_active: data.producer?.is_active,
                    is_deleted: data.producer?.is_deleted,
                    details: [
                        {
                            name: 'Name',
                            value: data.producer?.name
                        },
                        {
                            name: 'User',
                            value: data.producer?.created_by_user
                        },
                        {
                            name: 'IP',
                            value: data.producer?.client_address
                        }
                    ]
                },
                message: data.message?.data,
                poisionedCGs: poisionedCGs
            };
            setMessageData(messageDetails);
        }
    };

    return (
        <>
            {isLoading && (
                <div className="loader-uploading">
                    <Loader />
                </div>
            )}
            {!isLoading && (
                <div className="message-journey-container">
                    <div className="bread-crumbs">
                        <img src={BackIcon} onClick={() => returnBack()} />
                        <p>
                            {stationName} / Poision message #{messageId.substring(0, 5)}
                        </p>
                    </div>

                    <div style={{ position: 'absolute', top: '50px', bottom: 0, left: 0, right: 0, height: 'calc(100% - 70px)' }}>
                        <style>
                            {`
                                .edge {
                                    stroke-width: 8;
                                    stroke-dasharray: 5
                                    animation: dashdraw .5s linear infinite;
                                }
                                .producer{
                                    stroke: rgba(101, 87, 255, 0.1);
                                }
                                .consumer {
                                    stroke: rgba(255, 54, 36, 0.1);
                                }
                                @keyframes dashdraw {
                                    0% { stroke-dashoffset: 10; }
                                }
                            `}
                        </style>
                        <Canvas
                            className="canvas"
                            readonly={true}
                            direction="RIGHT"
                            // defaultPosition={null}
                            nodes={[
                                {
                                    id: '1',
                                    text: 'Node 1',
                                    width: 300,
                                    height: 170,
                                    data: {
                                        value: 'producer'
                                    }
                                },
                                {
                                    id: '2',
                                    text: 'Node 2',
                                    width: 300,
                                    height: 600,
                                    ports: [
                                        {
                                            id: '2-from',
                                            side: 'EAST',
                                            width: 10,
                                            height: 10,
                                            hidden: true
                                        }
                                    ],
                                    data: {
                                        value: 'station'
                                    }
                                },
                                {
                                    id: '3',
                                    text: 'Node 3',
                                    width: 450,
                                    height: 260,
                                    data: {
                                        value: 'consumer',
                                        consumeData: [
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
                                        ],
                                        CGData: [
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
                                        ]
                                    }
                                },
                                {
                                    id: '4',
                                    text: 'Node 4',
                                    width: 450,
                                    height: 260,
                                    data: {
                                        value: 'consumer',
                                        consumeData: [
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
                                        ],
                                        CGData: [
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
                                        ]
                                    }
                                }
                            ]}
                            edges={[
                                {
                                    id: '1-2',
                                    from: '1',
                                    to: '2',
                                    fromPort: '1-from',
                                    toPort: '2-to',
                                    selectionDisabled: true,
                                    data: {
                                        value: 'producer'
                                    }
                                },
                                {
                                    id: '2-3',
                                    from: '2',
                                    to: '3',
                                    fromPort: '2-from',
                                    toPort: '3-from',
                                    selectionDisabled: true,
                                    data: {
                                        value: 'consumer'
                                    }
                                },
                                {
                                    id: '2-4',
                                    from: '2',
                                    to: '4',
                                    fromPort: '2-from',
                                    toPort: '4-from',
                                    selectionDisabled: true,
                                    data: {
                                        value: 'consumer'
                                    }
                                }
                            ]}
                            node={
                                <Node style={{ stroke: 'transparent', fill: 'transparent', strokeWidth: 1 }} label={<Label style={{ display: 'none' }} />}>
                                    {(event) => (
                                        <foreignObject height={event.height} width={event.width} x={0} y={0} className="node-wrapper">
                                            {event.node.data.value === 'producer' && <Producer data={messageData.producer} />}
                                            {event.node.data.value === 'station' && (
                                                <PoisionMessage
                                                    stationName={stationName}
                                                    messageId={messageId}
                                                    message={messageData.message}
                                                    details={messageData.details}
                                                />
                                            )}
                                            {event.node.data.value === 'consumer' && (
                                                <ConsumerGroup details={event.node.data.consumeData} cgData={event.node.data.CGData} />
                                            )}
                                        </foreignObject>
                                    )}
                                </Node>
                            }
                            arrow={null}
                            edge={(edge) => <Edge {...edge} className={edge.data.value === 'producer' ? 'edge producer' : 'edge consumer'} />}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
export default MessageJourney;
