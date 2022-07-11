import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import Button from '../../../components/button';
import CreateStationForm from './createStationForm';
import SideStep from './sideStep';
import './style.scss';
import CreateAppUser from './createAppUser';
import ProduceData from './produceData';
import ConsumeData from './consumeData';
import Finsih from './finish';
import Reducer from './hooks/reducer';

const steps = [{ stepName: 'Create Station' }, { stepName: 'Create App user' }, { stepName: 'Produce data' }, { stepName: 'Consume data' }, { stepName: 'Finish' }];

const GetStarted = (props) => {
    const createStationFormRef = useRef(null);
    const produceFormRef = useRef(null);
    const [getStartedState, getStartedDispatch] = useReducer(Reducer);

    const SideStepList = () => {
        return steps.map((value, index) => {
            return <SideStep key={index} currentStep={getStartedState?.currentStep} stepNumber={index + 1} stepName={value.stepName} />;
        });
    };

    const onNext = (e) => {
        switch (getStartedState?.currentStep) {
            case 1:
                try {
                    createStationFormRef.current();
                } catch {
                    console.log('error');
                }
                break;
            case 2:
                // code block
                //onfinish
                break;
            case 3:
                // code block
                // produceFormRef.current();
                break;
            case 4:
                break;
            case 5:
                // const pathname = pathDomains.overview;
                // history.push(location.pathname);
                //refresh
                window.location.reload(false);
                return;
            default:
            // code block
        }

        getStartedDispatch({ type: 'SET_CURRENT_STEP', payload: getStartedState?.currentStep + 1 });
    };

    const onBack = () => {
        getStartedDispatch({ type: 'SET_CURRENT_STEP', payload: getStartedState?.currentStep - 1 });
    };

    useEffect(() => {
        getStartedDispatch({ type: 'SET_CURRENT_STEP', payload: 1 });
    }, []);

    useEffect(() => {
        if (getStartedState?.currentStep !== 1) {
            getStartedDispatch({ type: 'SET_BACK_DISABLE', payload: false });
        } else {
            getStartedDispatch({ type: 'SET_BACK_DISABLE', payload: true });
        }
    }, [getStartedState?.currentStep]);

    return (
        <GetStartedStoreContext.Provider value={[getStartedState, getStartedDispatch]}>
            <div className="getstarted-container">
                <h1 className="getstarted-header">Let's get you started</h1>
                <p className="getstarted-header-description">Setup your account details to get more form the platform</p>
                <div className="sub-getstarted-container">
                    <div>
                        <SideStepList />
                    </div>
                    <div /*style={{ width: '70%' }}*/>
                        {getStartedState?.currentStep === 1 && <CreateStationForm createStationFormRef={createStationFormRef} />}
                        {getStartedState?.currentStep === 2 && <CreateAppUser />}
                        {getStartedState?.currentStep === 3 && <ProduceData produceFormRef={produceFormRef} />}
                        {getStartedState?.currentStep === 4 && <ConsumeData />}
                        {getStartedState?.currentStep === 5 && <Finsih />}
                        <div className="btnContainer">
                            <Button
                                width="129px"
                                height="42px"
                                placeholder="Back"
                                colorType="white"
                                radiusType="circle"
                                backgroundColorType={getStartedState?.backDisable ? '#D8D8D8' : 'black'}
                                fontSize="16px"
                                fontWeight="bold"
                                disabled={getStartedState?.backDisable}
                                onClick={onBack}
                            />
                            <Button
                                width="129px"
                                height="42px"
                                placeholder={getStartedState?.currentStep === 5 ? 'Lauch Dashboard' : 'Next'}
                                colorType="white"
                                radiusType="circle"
                                backgroundColorType={getStartedState?.nextDisable ? '#D8D8D8' : 'purple'}
                                fontSize="16px"
                                fontWeight="bold"
                                htmlType="submit"
                                disabled={getStartedState?.nextDisable}
                                // onClick={() => createStationFormRef.current()}
                                onClick={onNext}
                                // isLoading={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </GetStartedStoreContext.Provider>
    );
};
export const GetStartedStoreContext = createContext({});
export default GetStarted;
