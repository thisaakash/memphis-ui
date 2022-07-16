import React, { useContext, useEffect } from 'react';
import ConsumeDataImg from '../../../../assets/images/consumeData.svg';
import { CODE_CONSUME_JAVASCRIPT, CODE_CONSUME_GO } from '../../../../const/SDKExample';
import WaitingConsumeData from '../../../../assets/images/waitingConsumeData.svg';
import ProduceConsumeData from '../produceConsumeData';
import { GetStartedStoreContext } from '..';

const ConsumeData = (props) => {
    const { createStationFormRef } = props;
    const [getStartedState, getStartedDispatch] = useContext(GetStartedStoreContext);

    const host = process.env.REACT_APP_SANDBOX_ENV ? 'broker.sandbox.memphis.dev' : 'localhost';

    const languagesOptions = {
        Go: {
            name: 'Go',
            language: 'go',
            value: CODE_CONSUME_GO.replace('<username>', getStartedState?.username)
                .replace('<memphis_host>', host)
                .replace('<connection_token>', getStartedState?.connectionCreds)
                .replace('<station_name>', getStartedState?.stationName)
        },
        // Python: {
        //     name: 'Python',
        //     language: 'python',
        //     value: `print('hello')`
        // },
        'Node.js': {
            name: 'Node.js',
            language: 'javascript',
            value: CODE_CONSUME_JAVASCRIPT.replace('<username>', getStartedState?.username)
                .replace('<memphis_host>', host)
                .replace('<connection_token>', getStartedState?.connectionCreds)
                .replace('<station_name>', getStartedState?.stationName)
        }
    };

    const onNext = () => {
        getStartedDispatch({ type: 'SET_CURRENT_STEP', payload: getStartedState?.currentStep + 1 });
    };

    useEffect(() => {
        createStationFormRef.current = onNext;
    }, []);

    return (
        <ProduceConsumeData
            headerImage={ConsumeDataImg}
            headerTitle={'Consume data'}
            waitingImage={WaitingConsumeData}
            waitingTitle={'Waiting to consume messages from the station'}
            languagesOptions={languagesOptions}
            activeData={'active_consumers'}
            dataName={'consumer_app'}
        ></ProduceConsumeData>
    );
};

export default ConsumeData;
