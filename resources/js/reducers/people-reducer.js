import { Types } from '../actions/people/Types'
const initialState = {
    people: {
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

export default function peopleReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_PEOPLE:
            return { ...state, people: action.payload }

        default:
            return state
    }
}
