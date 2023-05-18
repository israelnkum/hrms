import {Types} from '../actions/information-updates/Types'

const initialState = {
    informationUpdates: {
        data: [],
        meta: {}
    },
    informationUpdate: {},
    filterParams: {},
    filter: {
        status: 'Pending',
    }
}

export default function informationUpdateReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_INFORMATION_REQUESTS:
            return {...state, informationUpdates: action.payload}

        case Types.GET_INFORMATION_REQUEST:
            return {...state, informationUpdate: action.payload}

        case Types.ADD_INFORMATION_REQUEST_FILTER:
            return {...state, filter: action.payload}

        case Types.GET_FILTER_PARAMS:
            return {...state, filterParams: action.payload}

        default:
            return state
    }
}
