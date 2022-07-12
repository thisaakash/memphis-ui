const Reducer = (getStartedState, action) => {
    switch (action.type) {
        case 'SET_NEXT_DISABLE':
            return {
                ...getStartedState,
                nextDisable: action.payload
            };
        case 'SET_BACK_DISABLE':
            return {
                ...getStartedState,
                backDisable: action.payload
            };
        case 'SET_FACTORY':
            return {
                ...getStartedState,
                factoryName: action.payload
            };
        case 'SET_STATION':
            return {
                ...getStartedState,
                stationName: action.payload
            };
        case 'SET_USER_NAME':
            return {
                ...getStartedState,
                username: action.payload
            };
        case 'SET_CURRENT_STEP':
            return {
                ...getStartedState,
                currentStep: action.payload
            };
        case 'SET_CREATE_APP_USER_DISABLE':
            return {
                ...getStartedState,
                createAppUserDisable: action.payload
            };
        case 'SET_FORM_FIELDS_CREATE_STATION':
            return {
                ...getStartedState,
                formFieldsCreateStation: action.payload
            };
        case 'SET_BROKER_CONNECTION_CREDS':
            return {
                ...getStartedState,
                connectionCreds: action.payload
            };
        case 'GET_STATION_DATA':
            return {
                ...getStartedState,
                stationData: action.payload
            };
        default:
            return getStartedState;
    }
};

export default Reducer;
