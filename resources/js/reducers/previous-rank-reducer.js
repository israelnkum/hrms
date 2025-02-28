import { Types } from '../actions/employee/previous-ranks/Types'
const initialState = {
    previousRanks: {
        data: [],
        meta: {}
    },
    filter: {},
    previousRank: {},
}

export default function previousRankReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_PREVIOUS_RANKS:
            return { ...state, previousRanks: action.payload }

        case Types.GET_PREVIOUS_RANK:
            return { ...state, previousRank: action.payload }

        case Types.ADD_PREVIOUS_RANK:
            return {
                ...state,
                previousRanks: {
                    ...state.previousRanks,
                    data: state.previousRanks.data.concat(action.payload)
                }
            }

        case Types.UPDATE_PREVIOUS_RANK:
            return {
                ...state,
                previousRanks: {
                    ...state.previousRanks,
                    data: state.previousRanks.data.map((previousRank) => {
                        return previousRank.id === action.payload.id ? action.payload : previousRank
                    })
                }
            }

        case Types.REMOVE_PREVIOUS_RANK:
            return {
                ...state,
                previousRanks: { ...state.previousRanks, data: state.previousRanks.data.filter((previousRank) => previousRank.id !== action.id) }
            }

        default:
            return state
    }
}
