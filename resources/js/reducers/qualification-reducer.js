import { Types } from '../actions/qualification/Types'
const initialState = {
    qualifications: {
        data: [],
        meta: {}
    },
    filter: {},
    qualification: {},
}

export default function qualificationReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_QUALIFICATIONS:
            return { ...state, qualifications: action.payload }

        case Types.GET_QUALIFICATION:
            return { ...state, qualification: action.payload }

        case Types.ADD_QUALIFICATION:
            return {
                ...state,
                qualifications: { ...state.qualifications, data: state.qualifications.data.concat(action.payload) }
            }

        case Types.UPDATE_QUALIFICATION:
            return {
                ...state,
                qualifications: {
                    ...state.qualifications,
                    data: state.qualifications.data.map((qualification) => {
                        return qualification.id === action.payload.id ? action.payload : qualification
                    })
                }
            }

        case Types.REMOVE_QUALIFICATION:
            return {
                ...state,
                qualifications: { ...state.qualifications, data: state.qualifications.data.filter((qualification) => qualification.id !== action.id) }
            }

        default:
            return state
    }
}
