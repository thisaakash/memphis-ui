import React, { useState, useEffect, useContext } from 'react';
import { Form } from 'antd';

import SelectComponent from '../../../../components/select';
import CodeSnippet from '../../../../components/codeSnippet';
import Button from '../../../../components/button';
import SuccessfullyReceivedProduce from '../../../../assets/images/successfullyReceivedProduce.svg';
import { GetStartedStoreContext } from '..';

const screenEnum = {
    DATA_SNIPPET: 0,
    DATA_WAITING: 1,
    DATA_RECIEVED: 2
};

const ProduceConsumeData = (props) => {
    const { headerImage, headerTitle, waitingImage, languagesOptions, onNext, produceConsumeDataRef } = props;
    const [creationForm] = Form.useForm();
    const [isCopyToClipBoard, setCopyToClipBoard] = useState(screenEnum['DATA_SNIPPET']);
    const [languageOption, setLanguageOption] = useState();
    const [getStartedState, getStartedDispatch] = useContext(GetStartedStoreContext);

    useEffect(() => {
        setLanguageOption(languagesOptions['Node.js']);
        // produceConsumeDataRef.current = curr;
        // setCopyToClipBoard(screenEnum['DATA_SNIPPET']);
    }, []);

    // const curr = () => {
    //     setCopyToClipBoard(screenEnum['DATA_WAITING']);
    // };

    const updateDisplayLanguage = (lang) => {
        setLanguageOption(languagesOptions[lang]);
    };

    return (
        <Form name="form" form={creationForm} autoComplete="off" className="create-station-form-create-app-user">
            <img src={headerImage} alt={headerImage} width="40px" height="40px" className="produce-data-icon"></img>
            <h1 className="header-create-app-user">{headerTitle}</h1>
            <Form.Item
                name="languages"
                rules={[
                    {
                        required: true,
                        message: 'Type here'
                    }
                ]}
                style={{ marginBottom: '0' }}
            >
                <div>
                    <h4 className="header-enter-user-name">Language</h4>
                    <SelectComponent
                        initialValue={languageOption?.name}
                        value={languageOption?.name}
                        colorType="navy"
                        backgroundColorType="none"
                        borderColorType="gray"
                        radiusType="semi-round"
                        width="450px"
                        height="40px"
                        options={Object.keys(languagesOptions).map((lang) => languagesOptions[lang].name)}
                        onChange={(e) => updateDisplayLanguage(e)}
                        dropdownClassName="select-options"
                    />
                </div>
                {isCopyToClipBoard === screenEnum['DATA_WAITING'] ? (
                    <div
                        style={{
                            marginTop: '15px',
                            padding: '10px',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            border: '1px solid #D8D8D8',
                            borderRadius: '4px'
                        }}
                    >
                        <img height="75px" width="100px" src={waitingImage} alt="waiting-data"></img>
                        <p>We are waiting to produce data</p>
                        <div style={{ alignSelf: 'center' }}>
                            <Button
                                width="129px"
                                height="40px"
                                placeholder="Skip"
                                colorType="white"
                                radiusType="circle"
                                backgroundColorType="purple"
                                fontSize="14px"
                                fontWeight="bold"
                                onClick={() => {
                                    setCopyToClipBoard(screenEnum['DATA_RECIEVED']);
                                    getStartedDispatch({ type: 'SET_NEXT_DISABLE', payload: false });
                                }}
                            />
                        </div>
                    </div>
                ) : isCopyToClipBoard === screenEnum['DATA_RECIEVED'] ? (
                    <div
                        style={{
                            marginTop: '15px',
                            padding: '10px',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            border: '1px solid #D8D8D8',
                            borderRadius: '4px'
                        }}
                    >
                        <img src={SuccessfullyReceivedProduce} alt="successfully-received-produce" width="70px" height="70px"></img>
                        <p>Successfully Received</p>
                    </div>
                ) : (
                    <CodeSnippet
                        onCopyToClipBoard={() => {
                            // setCopyToClipBoard(screenEnum['DATA_WAITING']);
                            getStartedDispatch({ type: 'SET_NEXT_DISABLE', payload: false });
                        }}
                        languageOption={languageOption}
                        codeSnippet={languageOption?.value}
                    />
                )}
            </Form.Item>
        </Form>
    );
};

export default ProduceConsumeData;
