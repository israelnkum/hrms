import { Types } from '../actions/employee/dependants/Types'
const initialState = {
    dependants: {
        data: [],
        meta: {}
    },
    filter: {},
    dependant: {},
}

export default function dependantReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_DEPENDANTS:
            return { ...state, dependants: action.payload }

        case Types.GET_DEPENDANT:
            return { ...state, dependant: action.payload }

        case Types.ADD_DEPENDANT:
            return {
                ...state,
                dependants: {
                    ...state.dependants,
                    data: state.dependants.data.concat(action.payload)
                }
            }

        case Types.UPDATE_DEPENDANT:
            return {
                ...state,
                dependants: {
                    ...state.dependants,
                    data: state.dependants.data.map((dependant) => {
                        return dependant.id === action.payload.id ? action.payload : dependant
                    })
                }
            }

        case Types.REMOVE_DEPENDANT:
            return {
                ...state,
                dependants: { ...state.dependants, data: state.dependants.data.filter((dependant) => dependant.id !== action.id) }
            }

        default:
            return state
    }
}
