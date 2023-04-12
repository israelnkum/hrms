import { Types } from '../actions/leave-management/leave-types/Types'

const initialState = {
    leaveTypes: {
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

export default function leaveTypesReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_ALL_LEAVE_TYPES:
            return { ...state, leaveTypes: action.payload }

        default:
            return state
    }
}
