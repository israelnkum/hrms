import { Types } from '../actions/leave-management/leave-requests/Types'

const initialState = {
    leaveRequests: {
        data: [],
        meta: {}
    },
    filterParams: {},
    filter: {
        department_id: 'all',
        supervisor_id: 'all',
        hr_id: 'all',
        leave_type_id: 'all',
        hr_status: 'Pending',
    }
}

export default function leaveManagementReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_LEAVE_REQUESTS:
            return {...state, leaveRequests: action.payload}

        case Types.ADD_LEAVE_REQUEST_FILTER:
            return {...state, filter: action.payload}

        case Types.GET_FILTER_PARAMS:
            return {...state, filterParams: action.payload}

        default:
            return state
    }
}
