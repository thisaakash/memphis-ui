import React, { useEffect, useRef, useState } from 'react';
import Button from '../../../components/button';
import CreateStationForm from './createStationForm';
import SideStep from './sideStep';
import './style.scss';
import CreateAppUser from './createAppUser';
import ProduceData from './produceData';
import ConsumeData from './consumeData';
import Finsih from './finish';

const steps = [{ stepName: 'Create Station' }, { stepName: 'Create App user' }, { stepName: 'Produce data' }, { stepName: 'Consume data' }, { stepName: 'Finish' }];

const GetStarted = (props) => {
    const createStationFormRef = useRef(null);
    const [backDisable, setBackDisable] = useState(true);
    const [step, setStep] = useState(1);

    const SideStepList = () => {
        return steps.map((value, index) => {
            return <SideStep key={index} currentStep={step} stepNumber={index + 1} stepName={value.stepName} />;
        });
    };

    const onNext = () => {
        switch (step) {
            case 1:
                createStationFormRef.current();
                break;
            case 2:
                // code block
                //onfinish
                break;
            case 3:
                // code block
                break;
            case 4:
                break;
            case 5:
                // const pathname = pathDomains.overview;
                // history.push(location.pathname);
                window.location.reload(false);
                return;
            default:
            // code block
        }

        setStep(step + 1);
    };

    const onBack = () => {
        setStep(step - 1);
    };

    useEffect(() => {
        if (step !== 1) {
            setBackDisable(false);
        } else {
            setBackDisable(true);
        }
    }, [step]);

    return (
        <div className="getstarted-container">
            <h1 className="getstarted-header">Let's get you started</h1>
            <p className="getstarted-header-description">Setup your account details to get more form the platform</p>
            <div className="sub-getstarted-container">
                <div>
                    <SideStepList />
                </div>
                <div /*style={{ width: '70%' }}*/>
                    {step === 1 && <CreateStationForm createStationFormRef={createStationFormRef} />}
                    {step === 2 && <CreateAppUser createStationFormRef={createStationFormRef} />}
                    {step === 3 && <ProduceData />}
                    {step === 4 && <ConsumeData />}
                    {step === 5 && <Finsih />}
                    <div className="btnContainer">
                        <Button
                            width="129px"
                            height="42px"
                            placeholder="Back"
                            colorType="white"
                            radiusType="circle"
                            backgroundColorType="#D8D8D8"
                            fontSize="16px"
                            fontWeight="bold"
                            disabled={backDisable}
                            onClick={onBack}
                        />
                        <Button
                            width="129px"
                            height="42px"
                            placeholder={step === 5 ? 'Lauch Dashboard' : 'Next'}
                            colorType="white"
                            radiusType="circle"
                            backgroundColorType="purple"
                            fontSize="16px"
                            fontWeight="bold"
                            htmlType="submit"
                            // onClick={() => createStationFormRef.current()}
                            onClick={onNext}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GetStarted;
