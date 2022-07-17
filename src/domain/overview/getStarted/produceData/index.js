import React, { useContext, useEffect } from 'react';
import { CODE_PRODUCE_GO, CODE_PRODUCE_JAVASCRIPT } from '../../../../const/SDKExample';
import WaitingProduceData from '../../../../assets/images/waitingProduceData.svg';
import ProduceConsumeData from '../produceConsumeData';
import { GetStartedStoreContext } from '..';

const ProduceData = (props) => {
    const { createStationFormRef } = props;
    const [getStartedState, getStartedDispatch] = useContext(GetStartedStoreContext);
    const host = process.env.REACT_APP_SANDBOX_ENV ? 'broker.sandbox.memphis.dev' : 'localhost';

    const languagesOptions = {
        Go: {
            name: 'Go',
            language: 'go',
            value: CODE_PRODUCE_GO.replace('<username>', getStartedState?.username)
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
            value: CODE_PRODUCE_JAVASCRIPT.replace('<username>', getStartedState?.username)
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
            waitingImage={WaitingProduceData}
            waitingTitle={'We are waiting to produce data'}
            successfullTitle={'Successfully received'}
            languagesOptions={languagesOptions}
            activeData={'active_producers'}
            dataName={'producer_app'}
        ></ProduceConsumeData>
    );
};

export default ProduceData;
