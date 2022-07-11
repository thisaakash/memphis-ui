import React, { useContext, useEffect, useRef } from 'react';
import ProduceDataImg from '../../../../assets/images/produceData.svg';
import { CODE_PRODUCE } from '../../../../const/SDKExample';
import WaitingProduceData from '../../../../assets/images/waitingProduceData.svg';
import ProduceConsumeData from '../produceConsumeData';
import { httpRequest } from '../../../../services/http';
import { ApiEndpoints } from '../../../../const/apiEndpoints';
import { GetStartedStoreContext } from '..';

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

const ProduceData = (props) => {
    const { produceFormRef } = props;
    const [getStartedState, getStartedDispatch] = useContext(GetStartedStoreContext);
    const produceConsumeDataRef = useRef(null);

    useEffect(() => {
        // produceFormRef.current = getStationDetails;
    }, []);

    // const getStationDetails = async () => {
    //     produceConsumeDataRef.current();

    // try {
    //     console.log('getStationDetails', getStationDetails);
    //     const data = await httpRequest('GET', `${ApiEndpoints.GET_STATION_DATA}?station_name=${getStartedState?.name}`);
    //     console.log('data get all station,', data);
    //     // await sortData(data);
    //     // stationDispatch({ type: 'SET_SOCKET_DATA', payload: data });
    //     // setisLoading(false);
    // } catch (error) {
    //     // setisLoading(false);
    //     if (error.status === 404) {
    //         // history.push(`${pathDomains.factoriesList}/${url.split('factories/')[1].split('/')[0]}`);
    // }
    // }
    // };

    return (
        <ProduceConsumeData
            headerImage={ProduceDataImg}
            headerTitle={'Produce Data'}
            waitingImage={WaitingProduceData}
            languagesOptions={languagesOptions}
            produceConsumeDataRef={produceConsumeDataRef}
            // onNext={() => getStationDetails()}
            // onNext={() => setCopyToClipBoard(screenEnum['DATA_WAITING'])}
        ></ProduceConsumeData>
    );
};

export default ProduceData;
