import React from 'react';
import RightArrow from '../../../../assets/images/rightArrow.svg';
import './style.scss';
import Done from '../../../../assets/images/done.svg';

const SideStep = (props) => {
    const { stepNumber, stepName, currentStep } = props;
    return (
        <div className="side-step-container" style={currentStep === stepNumber ? { backgroundColor: '#F0EEFF' } : {}}>
            <div className="number-name-container">
                <div className="step-number-container" style={currentStep >= stepNumber ? { backgroundColor: 'white' } : {}}>
                    {currentStep > stepNumber ? <img src={Done} alt="done"></img> : <p className="step-number">{stepNumber}</p>}
                </div>
                <p className="step-name" style={currentStep === stepNumber ? { color: '#2E2C34' } : {}}>
                    {stepName}
                </p>
            </div>
            <div className="arrow-container">{currentStep === stepNumber && <img src={RightArrow} alt="select-arrow" />}</div>
        </div>
    );
};
export default SideStep;
