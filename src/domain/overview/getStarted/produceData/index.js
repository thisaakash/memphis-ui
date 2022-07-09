import React from 'react';
import ProduceDataImg from '../../../../assets/images/produceData.svg';
import { CODE_PRODUCE } from '../../../../const/SDKExample';
import WaitingProduceData from '../../../../assets/images/waitingProduceData.svg';
import ProduceConsumeData from '../produceConsumeData';

const languagesOptions = {
    // Python: {
    //     name: 'Python',
    //     language: 'python',
    //     value: `print('hello')`
    // },
    'Node.js': {
        name: 'Node.js',
        language: 'javascript',
        value: CODE_PRODUCE
    }
};

const ProduceData = () => {
    return (
        <ProduceConsumeData
            headerImage={ProduceDataImg}
            headerTitle={'Produce Data'}
            waitingImage={WaitingProduceData}
            languagesOptions={languagesOptions}
            onNext={() => {}}
        ></ProduceConsumeData>
    );
};

export default ProduceData;
