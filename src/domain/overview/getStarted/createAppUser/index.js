import React, { useState, useEffect, useContext } from 'react';
import { Form } from 'antd';
import Input from '../../../../components/Input';

import './style.scss';
import { httpRequest } from '../../../../services/http';
import { ApiEndpoints } from '../../../../const/apiEndpoints';
import Button from '../../../../components/button';
import AppUserIcon from '../../../../assets/images/usersIconActive.svg';
import CopyIcon from '../../../../assets/images/copy.svg';
import Information from '../../../../assets/images/information.svg';
import UserCheck from '../../../../assets/images/userCheck.svg';
import CreatingTheUser from '../../../../assets/images/creatingTheUser.svg';
import ClickableImage from '../../../../components/clickableImage';
import { GetStartedStoreContext } from '..';
import SelectedClipboard from '../../../../assets/images/selectedClipboard.svg';

const screenEnum = {
    CREATE_USER_PAGE: 0,
    DATA_WAITING: 1,
    DATA_RECIEVED: 2
};

const CreateAppUser = () => {
    const [appUser, setAppUser] = useState({});
    const [creationForm] = Form.useForm();
    const [selectedClipboardUserName, setSelectedClipboardUserName] = useState(false);
    const [selectedClipboardToken, setSelectedClipboardToken] = useState(false);
    const [isCreatedUser, setCreatedUser] = useState(screenEnum['CREATE_USER_PAGE']);
    const [getStartedState, getStartedDispatch] = useContext(GetStartedStoreContext);

    const [formFields, setFormFields] = useState({
        username: '',
        // password: '',
        user_type: 'application'
    });

    useEffect(() => {
        // createStationFormRef.current = onFinish;
        // getStartedDispatch({ type: 'SET_USER_NAME', payload: localStorage.getItem(LOCAL_STORAGE_USER_NAME) });
        getStartedDispatch({ type: 'SET_NEXT_DISABLE', payload: true });
        getStartedDispatch({ type: 'SET_CREATE_APP_USER_DISABLE', payload: false });
        if (getStartedState?.username) {
            setFormFields({ ...formFields, username: getStartedState.username });
        }
    }, []);

    useEffect(() => {
        if (formFields?.username !== '' && formFields?.username !== ' ') {
            getStartedDispatch({ type: 'SET_NEXT_DISABLE', payload: false });
        }
    }, [formFields.username]);

    const onCopy = async (copyParam) => {
        navigator.clipboard.writeText(copyParam);
        // onCopyToClipBoard();
    };

    const updateFormState = (field, value) => {
        console.log('field', field, 'value', value);
        let updatedValue = { ...formFields };
        updatedValue[field] = value;
        setFormFields((formFields) => ({ ...formFields, ...updatedValue }));
    };

    const createAppUser = async (bodyRequest) => {
        try {
            const data = await httpRequest('POST', ApiEndpoints.ADD_USER, bodyRequest);
            setCreatedUser(screenEnum['DATA_WAITING']);

            if (data) {
                getStartedDispatch({ type: 'SET_USER_NAME', payload: data?.username });
                getStartedDispatch({ type: 'SET_CREATE_APP_USER_DISABLE', payload: true });
                setTimeout(() => {
                    setCreatedUser(screenEnum['DATA_RECIEVED']);
                }, 1000);
                setAppUser(data);
            }
        } catch (error) {
            setCreatedUser(screenEnum['CREATE_USER_PAGE']);
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
                } catch (error) {
                    console.log('err create user', error);
                }
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
                disabled={getStartedState.createAppUserDisable}
                onClick={onFinish}
            />
            {isCreatedUser === screenEnum['DATA_WAITING'] ? (
                <div>
                    <img src={CreatingTheUser} alt="creating-the-user"></img>
                    <p>We are creating the user</p>
                </div>
            ) : isCreatedUser === screenEnum['DATA_RECIEVED'] ? (
                <div className="connection-details-container">
                    <div className="user-details-container">
                        <img src={UserCheck} alt="usercheck" width="20px" height="20px" className="user-check"></img>
                        <p className="user-connection-details">User connection details</p>
                    </div>
                    <div className="container-username-token">
                        <div className="username-container">
                            <p className="username">Username: {getStartedState.username}</p>
                            {selectedClipboardUserName ? (
                                <ClickableImage image={SelectedClipboard}></ClickableImage>
                            ) : (
                                <ClickableImage
                                    image={CopyIcon}
                                    alt="copyIcon"
                                    width="14.53px"
                                    height="14.5px"
                                    onClick={() => {
                                        onCopy(getStartedState.username);
                                        setSelectedClipboardUserName(true);
                                    }}
                                    className="copy-icon"
                                />
                            )}
                        </div>
                        <div className="token-container">
                            <p className="token">Connection token: memphis</p>
                            {selectedClipboardToken ? (
                                <ClickableImage image={SelectedClipboard}></ClickableImage>
                            ) : (
                                <ClickableImage
                                    image={CopyIcon}
                                    alt="copyIcon"
                                    className="copy-icon"
                                    onClick={() => {
                                        onCopy('memphis');
                                        setSelectedClipboardToken(true);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="information-container">
                        <img src={Information} alt="information" width="13.33px" height="13.33px" className="information-img" />
                        <p className="information">Please note when you close this modal, you will not be able to restore your user details!!</p>
                    </div>
                </div>
            ) : null}
        </Form>
    );
};

export default CreateAppUser;
