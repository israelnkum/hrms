import { Types } from '../actions/leave-management/leave-requests/Types'

const initialState = {
    leaveRequests: {
        data: [],
        meta: {}
    },
    filter: {
        department_id: 'all',
        rank_id: 'all',
        educational_level_id: 'all',
        job_category_id: 'all'
    }
}

export default function leaveManagementReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_LEAVE_REQUESTS:
            return { ...state, leaveRequests: action.payload }

        default:
            return state
    }
}
