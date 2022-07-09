import React from 'react';
import ConsumeDataImg from '../../../../assets/images/consumeData.svg';
import { CODE_CONSUME } from '../../../../const/SDKExample';
import WaitingConsumeData from '../../../../assets/images/waitingConsumeData.svg';
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
        value: CODE_CONSUME
    }
};

const ConsumeData = () => {
    return (
        <ProduceConsumeData
            headerImage={ConsumeDataImg}
            headerTitle={'Consume data'}
            waitingImage={WaitingConsumeData}
            languagesOptions={languagesOptions}
            onNext={() => {}}
        ></ProduceConsumeData>
    );
};

export default ConsumeData;
