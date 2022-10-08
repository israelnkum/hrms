import { Types } from '../actions/commons/Types'
const initialState = {
    commons: {}
}

export default function commonReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_COMMON_DATA:
            return { ...state, commons: action.payload }

        default:
            return state
    }
}
