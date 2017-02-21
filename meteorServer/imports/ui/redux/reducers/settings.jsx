let initialInterfaceState = {
    companyName: null,
    city: null,
    industry: null,
    contactNumber: null
};


export default function settings(state = initialInterfaceState, action) {
    //console.log("reducers.userInterface  action:", {state, action});

    switch (action.type) {
        case 'SET_SETTINGS':
            return {
                ...state,
                companyName: action.payload.companyName,
                city: action.payload.city,
                industry: action.payload.industry,
                contactNumber: action.payload.contactNumber,

            }
        default:
            return state;
    }
};
