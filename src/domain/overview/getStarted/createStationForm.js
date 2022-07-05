import React, { useState, useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import Input from '../../../components/Input';
import RadioButton from '../../../components/radioButton';
import './style.scss';
import { convertDateToSeconds } from '../../../services/valueConvertor';
import { ApiEndpoints } from '../../../const/apiEndpoints';
import { httpRequest } from '../../../services/http';
import { useHistory } from 'react-router';
import pathDomains from '../../../router';
import GetStartedIcon from '../../../assets/images/getStartedIcon.svg'

const retanionOptions = [
    {
        id: 1,
        value: 'message_age_sec',
        label: 'Time'
    },
    {
        id: 2,
        value: 'bytes',
        label: 'Size'
    },
    {
        id: 3,
        value: 'messages',
        label: 'Messages'
    }
];

const storageOptions = [
    {
        id: 1,
        value: 'file',
        label: 'File'
    },
    {
        id: 2,
        value: 'memory',
        label: 'Memory'
    }
];


const CreateStationForm = (props) => {
    const {createStationFormRef} = props;
    const history = useHistory();
    const [creationForm] = Form.useForm();
    const [formFields, setFormFields] = useState({
        factory_name: '',
        name: '',
        retention_type: 'message_age_sec',
        retention_value: '',
        storage_type: 'file',
        replicas: 1
    });
    const [timeSeparator, setTimeSeparator] = useState({
        days: 7,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [retentionMessagesValue, setRetentionMessagesValue] = useState('10');
    const [retentionSizeValue, setRetentionSizeValue] = useState('1000');

    useEffect(() => {
        createStationFormRef.current = onFinish;
    }, []);

    const handleRetentionSizeChange = (e) => {
        setRetentionSizeValue(e.target.value);
    };
    const handleRetentionMessagesChange = (e) => {
        setRetentionMessagesValue(e.target.value);
    };
    
    const handleDaysChange = (e) => {
        setTimeSeparator({ ...timeSeparator, days: e });
    };
    const handleHoursChange = (e) => {
        setTimeSeparator({ ...timeSeparator, hours: e });
    };
    const handleMinutesChange = (e) => {
        setTimeSeparator({ ...timeSeparator, minutes: e });
    };
    const handleSecondsChange = (e) => {
        setTimeSeparator({ ...timeSeparator, seconds: e });
    };

    const onFinish = async () => {
        try{
            const values = await creationForm.validateFields();
            if (values?.errorFields) {
                return;
            } else {
                if (values.retention_type === 'message_age_sec') {
                    values['retention_value'] = convertDateToSeconds(values.days, values.hours, values.minutes, values.seconds);
                } else if (values.retention_type === 'bytes') {
                    values['retention_value'] = Number(values.retentionSizeValue);
                } else {
                    values['retention_value'] = Number(values.retentionMessagesValue);
                }
                try {
                    const bodyRequest = {
                        name: values.name,
                        factory_name: values.factory_name,
                        retention_type: values.retention_type,
                        retention_value: values.retention_value,
                        storage_type: values.storage_type,
                        replicas: values.replicas
                    };
                    createStation(bodyRequest);
                } catch (error) {}
            }
        }
        catch (error){
            console.log(`validate error ${JSON.stringify(error)}`)  
            }
    };

    const createStation = async (bodyRequest) => {
        try {
            const data = await httpRequest('POST', ApiEndpoints.CREATE_STATION, bodyRequest);
            if (data) {
                // history.push(`${pathDomains.factoriesList}/${bodyRequest.factory_name}/${data.name}`);
            }
        } catch (error) {console.log(error)}
    };
 
    const updateFormState = (field, value) => {
        let updatedValue = { ...formFields };
        updatedValue[field] = value;
        setFormFields((formFields) => ({ ...formFields, ...updatedValue }));
    };

    return (
        <Form name="form" form={creationForm} autoComplete="off" className="create-station-form" >
            <img src={GetStartedIcon} alt="getstarted" width="35.5" height="28.4" />
            <h1>Create Station</h1>
            <Form.Item
                    name="factory_name"
                    rules={[
                        {
                            required: true,
                            message: 'Type here'
                        }
                    ]}
                    style={{ marginBottom: '0' }}
                >
                    <div>
                        <h4>Enter factory name</h4>
                        <p>A factory presents the application/use case that the user requires to build, and, within it, all the stations (queues) that establish the use case</p>
                        <Input
                            placeholder="Type Factory name"
                            type="text"
                            radiusType="semi-round"
                            colorType="black"
                            backgroundColorType="none"
                            borderColorType="gray"
                            width="450px"
                            height="40px"
                            onBlur={(e) => updateFormState('factory_name', e.target.value)} 
                            onChange={(e) => updateFormState('factory_name', e.target.value)}
                            value={formFields.factory_name}
                        />
                    </div>
                </Form.Item>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Type here'
                        }
                    ]}
                    style={{ marginBottom: '0' }}
                >
                    <div>
                        <h4>Enter station name</h4>
                        <p>RabbitMQ has queues, Kafka has topics, and Memphis has stations.</p>
                        <Input
                            placeholder="Type Station name"
                            type="text"
                            radiusType="semi-round"
                            colorType="black"
                            backgroundColorType="none"
                            borderColorType="gray"
                            width="450px"
                            height="40px"
                            onBlur={(e) => updateFormState('name', e.target.value)}
                            onChange={(e) => updateFormState('name', e.target.value)}
                            value={formFields.name}
                        />
                    </div>
                </Form.Item>
                
                <div className="retention">
                    <h4>Retention type</h4>
                    <p>By which criteria messages will be expel from the station</p>
                    <Form.Item name="retention_type" initialValue={formFields.retention_type}>
                        <RadioButton options={retanionOptions} radioValue={formFields.retention_type} optionType='button' onChange={(e) => updateFormState('retention_type', e.target.value)} />
                    </Form.Item>

                {formFields.retention_type === 'message_age_sec' && (
                    <div className="time-value">
                        <div className="days-section">
                            <Form.Item name="days" initialValue={timeSeparator.days}>
                                <InputNumber bordered={false} min={0} max={100} keyboard={true} onChange={(e) => handleDaysChange(e)} value={timeSeparator.days} />
                            </Form.Item>
                            <p>days</p>
                        </div>
                        <p className="separator">:</p>
                        <div className="hours-section">
                            <Form.Item name="hours" initialValue={timeSeparator.hours}>
                                <InputNumber bordered={false} min={0} max={24} keyboard={true} onChange={(e) => handleHoursChange(e)} value={timeSeparator.hours} />
                            </Form.Item>
                            <p>hours</p>
                        </div>
                        <p className="separator">:</p>
                        <div className="minutes-section">
                            <Form.Item name="minutes" initialValue={timeSeparator.minutes}>
                                <InputNumber bordered={false} min={0} max={60} keyboard={true} onChange={(e) => handleMinutesChange(e)} value={timeSeparator.minutes} />
                            </Form.Item>
                            <p>minutes</p>
                        </div>
                        <p className="separator">:</p>
                        <div className="seconds-section">
                            <Form.Item name="seconds" initialValue={timeSeparator.seconds}>
                                <InputNumber bordered={false} min={0} max={60} keyboard={true} onChange={(e) => handleSecondsChange(e)} value={timeSeparator.seconds} />
                            </Form.Item>
                            <p>seconds</p>
                        </div>
                    </div>
                )}
                {formFields.retention_type === 'bytes' && (
                    <Form.Item name="retentionSizeValue" initialValue={retentionSizeValue}>
                        <div className="size-value">
                            <Input
                                placeholder="Type"
                                type="number"
                                radiusType="semi-round"
                                colorType="black"
                                backgroundColorType="none"
                                borderColorType="gray"
                                width="90px"
                                height="38px"
                                onBlur={handleRetentionSizeChange}
                                onChange={handleRetentionSizeChange}
                                value={retentionSizeValue}
                            />
                            <p>bytes</p>
                        </div>
                    </Form.Item>
                )}
                {formFields.retention_type === 'messages' && (
                    <Form.Item name="retentionMessagesValue" initialValue={retentionMessagesValue}>
                        <div className="messages-value">
                            <Input
                                placeholder="Type"
                                type="number"
                                radiusType="semi-round"
                                colorType="black"
                                backgroundColorType="none"
                                borderColorType="gray"
                                width="90px"
                                height="38px"
                                onBlur={(e) => handleRetentionMessagesChange(e)}
                                onChange={(e) => handleRetentionMessagesChange(e)}
                                value={retentionMessagesValue}
                            />
                            <p>messages</p>
                        </div>
                    </Form.Item>
                )}
                </div>
                <div className="storage">
                    <h4 className="field-title">
                        Storage Type
                    </h4>
                    <p>Type of message persistence</p>
                    <Form.Item name="storage_type" initialValue={formFields.storage_type}>
                        <RadioButton options={storageOptions} radioValue={formFields.storage_type} optionType='button' onChange={(e) => updateFormState('storage_type', e.target.value)} />
                    </Form.Item>
                </div>
                <div className="replicas">
                    <h4 className="field-title">Replicas</h4>
                    <p>Amount of mirrors per message</p>
                    <div className="replicas-value">
                        <Form.Item name="replicas" initialValue={formFields.replicas}>
                            <InputNumber
                                bordered={false}
                                min={1}
                                max={5}
                                keyboard={true}
                                value={formFields.replicas}
                                onChange={(e) => updateFormState('replicas', e.target.value)}
                            />
                        </Form.Item>
                    </div>
                </div> 
        </Form>
    );

}
export default CreateStationForm;
