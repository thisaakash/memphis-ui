import React, { useState, useEffect, useContext } from 'react';
import { Form } from 'antd';
import SelectComponent from '../../../../components/select';
import CodeSnippet from '../../../../components/codeSnippet';
import Button from '../../../../components/button';
import SuccessfullyReceivedProduce from '../../../../assets/images/successfullyReceivedProduce.svg';
import { GetStartedStoreContext } from '..';
import { httpRequest } from '../../../../services/http';
import { ApiEndpoints } from '../../../../const/apiEndpoints';

const screenEnum = {
    DATA_SNIPPET: 0,
    DATA_WAITING: 1,
    DATA_RECIEVED: 2
};

const ProduceConsumeData = (props) => {
    const { headerImage, headerTitle, waitingImage, waitingTitle, languagesOptions, activeData, dataName } = props;
    const [creationForm] = Form.useForm();
    const [isCopyToClipBoard, setCopyToClipBoard] = useState(screenEnum['DATA_SNIPPET']);
    const [languageOption, setLanguageOption] = useState();
    const [getStartedState, getStartedDispatch] = useContext(GetStartedStoreContext);
    const [intervalStationDetails, setIntervalStationDetails] = useState();

    const getStationDetails = async () => {
        try {
            const data = await httpRequest('GET', `${ApiEndpoints.GET_STATION_DATA}?station_name=${getStartedState?.formFieldsCreateStation?.name}`);
            if (data) {
                getStartedDispatch({ type: 'GET_STATION_DATA', payload: data });
            }
        } catch (error) {}
    };

    useEffect(() => {
        setLanguageOption(languagesOptions['Node.js']);
    }, []);

    useEffect(() => {
        if (isCopyToClipBoard === screenEnum['DATA_WAITING']) {
            getStartedDispatch({ type: 'SET_NEXT_DISABLE', payload: true });
        } else {
            getStartedDispatch({ type: 'SET_NEXT_DISABLE', payload: false });
        }

        if (isCopyToClipBoard === screenEnum['DATA_RECIEVED']) {
            clearInterval(intervalStationDetails);
        }
    }, [isCopyToClipBoard]);

    useEffect(() => {
        if (
            getStartedState?.stationData &&
            getStartedState?.stationData[activeData] &&
            Object.keys(getStartedState?.stationData[activeData]).length >= 1 &&
            getStartedState?.stationData[activeData][0]?.name === dataName
        ) {
            setCopyToClipBoard(screenEnum['DATA_RECIEVED']);
        }
    }, [[getStartedState?.stationData?.[activeData]]]);

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
                        <p>{waitingTitle}</p>
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
                                    clearInterval(intervalStationDetails);
                                    getStartedDispatch({ type: 'SET_CURRENT_STEP', payload: getStartedState?.currentStep + 1 });
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
                            setCopyToClipBoard(screenEnum['DATA_WAITING']);
                            setIntervalStationDetails(
                                window.setInterval(() => {
                                    getStationDetails();
                                }, 3000)
                            );
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
