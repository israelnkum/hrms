import { Types } from '../actions/time-off/Types'

const initialState = {
    holidays: [],
    leaveTypes: [],
    leaveRequests: {
        data: [],
        meta: {}
    }
}

export default function timeOffReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_HOLIDAYS:
            return {...state, holidays: action.payload}

        case Types.GET_LEAVE_TYPES:
            return {...state, leaveTypes: action.payload}

        case Types.GET_LEAVE_REQUESTS:
            return {...state, leaveRequests: action.payload}
        default:
            return state
    }
}
