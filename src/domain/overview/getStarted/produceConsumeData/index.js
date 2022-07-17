import React, { useState, useEffect, useContext } from 'react';
import { Form } from 'antd';
import SelectComponent from '../../../../components/select';
import CodeSnippet from '../../../../components/codeSnippet';
import Button from '../../../../components/button';
import SuccessfullyReceivedProduce from '../../../../assets/images/successfullyReceivedProduce.svg';
import { GetStartedStoreContext } from '..';
import { httpRequest } from '../../../../services/http';
import { ApiEndpoints } from '../../../../const/apiEndpoints';
import './style.scss';
import TitleComponent from '../../../../components/titleComponent';

const screenEnum = {
    DATA_SNIPPET: 0,
    DATA_WAITING: 1,
    DATA_RECIEVED: 2
};

const ProduceConsumeData = (props) => {
    const { waitingImage, waitingTitle, successfullTitle, languagesOptions, activeData, dataName } = props;
    const [creationForm] = Form.useForm();
    const [isCopyToClipBoard, setCopyToClipBoard] = useState(screenEnum['DATA_SNIPPET']);
    const [languageOption, setLanguageOption] = useState();
    const [getStartedState, getStartedDispatch] = useContext(GetStartedStoreContext);

    const [intervalStationDetails, setintervalStationDetails] = useState();

    const getStationDetails = async () => {
        try {
            const data = await httpRequest('GET', `${ApiEndpoints.GET_STATION_DATA}?station_name=${getStartedState?.formFieldsCreateStation?.name}`);
            if (data) {
                getStartedDispatch({ type: 'GET_STATION_DATA', payload: data });
            }
        } catch (error) {
            if (error?.status === 666) {
                clearInterval(intervalStationDetails);
            }
        }
    };

    const onCopyToClipBoard = () => {
        setCopyToClipBoard(screenEnum['DATA_WAITING']);
        let interval = setInterval(() => {
            getStationDetails();
        }, 3000);
        setintervalStationDetails(interval);
        console.log(intervalStationDetails);
    };

    useEffect(() => {
        setLanguageOption(languagesOptions['Go']);
    }, []);

    useEffect(() => {
        if (isCopyToClipBoard === screenEnum['DATA_WAITING'] || isCopyToClipBoard === screenEnum['DATA_SNIPPET']) {
            getStartedDispatch({ type: 'SET_NEXT_DISABLE', payload: true });
        } else {
            getStartedDispatch({ type: 'SET_NEXT_DISABLE', payload: false });
        }

        if (isCopyToClipBoard === screenEnum['DATA_RECIEVED'] || isCopyToClipBoard === screenEnum['DATA_SNIPPET']) {
            clearInterval(intervalStationDetails);
            return () => {
                clearInterval(intervalStationDetails);
                console.log('clear interval');
            };
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
            clearInterval(intervalStationDetails);

            // return () => {
            //     clearInterval(intervalStationDetails);
            //     console.log('clear');
            //     return;
            // };
        }

        // if (Object.keys(getStartedState?.stationData[activeData])?.length === 1) {
        //     clearInterval(intervalStationDetails);
        //     console.log('clearrr');
        // }
    }, [[getStartedState?.stationData?.[activeData]]]);

    const updateDisplayLanguage = (lang) => {
        setLanguageOption(languagesOptions[lang]);
    };

    const clearInterFunc = () => {
        console.log(intervalStationDetails);
        clearInterval(intervalStationDetails);
    };

    return (
        <Form name="form" form={creationForm} autoComplete="off" className="create-produce-data">
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
                <div className="select-container">
                    {isCopyToClipBoard === screenEnum['DATA_SNIPPET'] ? (
                        <div>
                            <TitleComponent headerTitle="Language" typeTitle="sub-header"></TitleComponent>
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
                    ) : null}
                </div>
                {isCopyToClipBoard === screenEnum['DATA_WAITING'] ? (
                    <div className="data-waiting-container">
                        <img className="image-waiting-successful" src={waitingImage} alt="waiting-data"></img>
                        <TitleComponent
                            headerTitle={waitingTitle}
                            typeTitle="sub-header"
                            headerDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                            style={{ header: { fontSize: '18px' } }}
                        ></TitleComponent>
                        <div>
                            <Button
                                width="129px"
                                height="40px"
                                placeholder="Skip"
                                colorType="black"
                                radiusType="circle"
                                backgroundColorType="white"
                                border="border: 1px solid #EBEBEB"
                                fontSize="14px"
                                fontWeight="bold"
                                // boxShadowStyle="none"
                                marginBottom="3px"
                                onClick={() => {
                                    clearInterFunc();
                                    // clearInterval(intervalStationDetails);

                                    getStartedDispatch({ type: 'SET_CURRENT_STEP', payload: getStartedState?.currentStep + 1 });
                                }}
                            />
                        </div>
                    </div>
                ) : isCopyToClipBoard === screenEnum['DATA_RECIEVED'] ? (
                    <div className="successfully-container">
                        <img className="image-waiting-successful" src={SuccessfullyReceivedProduce} alt="successfully-received-produce"></img>
                        <TitleComponent
                            headerTitle={successfullTitle}
                            typeTitle="sub-header"
                            headerDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                            style={{ header: { fontSize: '18px' } }}
                        ></TitleComponent>
                    </div>
                ) : (
                    <CodeSnippet
                        onCopyToClipBoard={() => {
                            onCopyToClipBoard();
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
