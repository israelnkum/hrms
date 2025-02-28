import { Types } from '../actions/employee/next-of-kin/Types'

const initialState = {
    nextOfKin: {},
}

export default function nextOfKinsReducer (state = initialState, action) {
    switch (action.type) {

        case Types.GET_NEXT_OF_KIN:
            return { ...state, nextOfKin: action.payload }

        case Types.UPDATE_NEXT_OF_KIN:
            return {
                ...state,
                nextOfKin: action.payload
            }
        default:
            return state
    }
}
