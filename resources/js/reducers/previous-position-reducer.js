import { Types } from '../actions/employee/previous-positions/Types'
const initialState = {
    previousPositions: {
        data: [],
        meta: {}
    },
    filter: {},
    previousPosition: {},
}

export default function previousPositionReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_PREVIOUS_POSITIONS:
            return { ...state, previousPositions: action.payload }

        case Types.GET_PREVIOUS_POSITION:
            return { ...state, previousPosition: action.payload }

        case Types.ADD_PREVIOUS_POSITION:
            return {
                ...state,
                previousPositions: {
                    ...state.previousPositions,
                    data: state.previousPositions.data.concat(action.payload)
                }
            }

        case Types.UPDATE_PREVIOUS_POSITION:
            return {
                ...state,
                previousPositions: {
                    ...state.previousPositions,
                    data: state.previousPositions.data.map((previousPosition) => {
                        return previousPosition.id === action.payload.id ? action.payload : previousPosition
                    })
                }
            }

        case Types.REMOVE_PREVIOUS_POSITION:
            return {
                ...state,
                previousPositions: { ...state.previousPositions, data: state.previousPositions.data.filter((previousPosition) => previousPosition.id !== action.id) }
            }

        default:
            return state
    }
}
