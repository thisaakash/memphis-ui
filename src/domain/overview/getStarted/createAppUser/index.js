import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import Input from '../../../../components/Input';

import './style.scss';
import { httpRequest } from '../../../../services/http';
import { ApiEndpoints } from '../../../../const/apiEndpoints';
import Button from '../../../../components/button';
import pathDomains from '../../../../router';
import { useHistory } from 'react-router-dom';
import AppUserIcon from '../../../../assets/images/usersIconActive.svg';
import CopyIcon from '../../../../assets/images/copy.svg';
import Information from '../../../../assets/images/information.svg';
import UserCheck from '../../../../assets/images/userCheck.svg';

const CreateAppUser = (props) => {
    const { createStationFormRef } = props;
    const [appUser, setAppUser] = useState({});
    const [creationForm] = Form.useForm();
    const [formFields, setFormFields] = useState({
        username: '',
        // password: '',
        user_type: 'application'
    });

    useEffect(() => {
        createStationFormRef.current = onFinish;
    }, []);

    useEffect(() => {
        console.log(appUser);
    }, [appUser]);

    const updateFormState = (field, value) => {
        console.log('field', field, 'value', value);
        let updatedValue = { ...formFields };
        updatedValue[field] = value;
        setFormFields((formFields) => ({ ...formFields, ...updatedValue }));
    };

    const createAppUser = async (bodyRequest) => {
        try {
            console.log(bodyRequest);
            const data = await httpRequest('POST', ApiEndpoints.ADD_USER, bodyRequest);
            console.log('data', typeof data);
            if (data) {
                setAppUser(data);
                console.log(`${pathDomains.factoriesList}/${bodyRequest.factory_name}/${data.name}`);
                // history.push(`${pathDomains.factoriesList}/${bodyRequest.factory_name}/${data.name}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onFinish = async () => {
        try {
            const values = await creationForm.validateFields();
            if (values?.errorFields) {
                return;
            } else {
                try {
                    const bodyRequest = {
                        username: values.username,
                        user_type: 'application'
                    };
                    createAppUser(bodyRequest);
                } catch (error) {}
            }
        } catch (error) {
            console.log(`validate error ${JSON.stringify(error)}`);
        }
    };

    return (
        <Form name="form" form={creationForm} autoComplete="off" className="create-station-form-create-app-user">
            <img src={AppUserIcon} alt="appUserIcon" width="40px" height="40px" className="app-user-icon"></img>
            <h1 className="header-create-app-user">Create app user</h1>
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Type here'
                    }
                ]}
                style={{ marginBottom: '0' }}
            >
                <div>
                    <h4 className="header-enter-user-name">Enter user name</h4>
                    <Input
                        // className="username-input"
                        placeholder="Type User name"
                        type="text"
                        radiusType="semi-round"
                        colorType="black"
                        backgroundColorType="none"
                        borderColorType="gray"
                        width="371px"
                        height="38px"
                        onBlur={(e) => updateFormState('username', e.target.value)}
                        onChange={(e) => updateFormState('username', e.target.value)}
                        value={formFields.username}
                    />
                </div>
            </Form.Item>
            <Button
                className="create-app-user"
                width="138px"
                height="36px"
                placeholder="Create app user"
                colorType="white"
                radiusType="circle"
                backgroundColorType="purple"
                fontSize="12px"
                fontWeight="bold"
                marginBottom="15px"
                marginTop="15px"
                // disabled={backDisable}
                onClick={onFinish}
            />
            <div className="connection-details-container">
                <div className="user-details-container">
                    <img src={UserCheck} alt="usercheck" width="20px" height="20px" className="user-check"></img>
                    <p className="user-connection-details">User connection details</p>
                </div>
                <div className="container-username-token">
                    <div className="username-container">
                        <p className="username">Username: app</p>
                        <img src={CopyIcon} alt="copyIcon" width="14.53px" height="14.5px" className="copy-icon" />
                    </div>
                    <div className="token-container">
                        <p className="token">Connection token: memphis</p>
                        <img src={CopyIcon} alt="copyIcon" width="14.53px" height="14.5px" className="copy-icon" />
                    </div>
                </div>
            </div>
            <div className="information-container">
                <img src={Information} alt="information" width="13.33px" height="13.33px" className="information-img" />
                <p className="information">Please note when you close this modal, you will not be able to restore your user details!!</p>
            </div>
        </Form>
    );
};

export default CreateAppUser;
