import { Types } from '../actions/employee/contact-details/Types'
const initialState = {
    contactDetails: {
        data: [],
        meta: {}
    },
    filter: {},
    contactDetail: {},
}

export default function contactDetailsReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_CONTACT_DETAILS:
            return { ...state, contactDetails: action.payload }

        case Types.GET_CONTACT_DETAIL:
            return { ...state, contactDetail: action.payload }

        case Types.ADD_CONTACT_DETAIL:
            return {
                ...state,
                contactDetails: {
                    ...state.contactDetails,
                    data: state.contactDetails.data.concat(action.payload)
                }
            }

        case Types.UPDATE_CONTACT_DETAIL:
            return {
                ...state,
                contactDetail: action.payload,
                contactDetails: {
                    ...state.contactDetails,
                    data: state.contactDetails.data.map((contactDetail) => {
                        return contactDetail.id === action.payload.id ? action.payload : contactDetail
                    })
                }
            }

        case Types.REMOVE_CONTACT_DETAIL:
            return {
                ...state,
                contactDetails: {
                    ...state.contactDetails,
                    data: state.contactDetails.data.filter((contactDetail) => contactDetail.id !== action.id)
                }
            }

        default:
            return state
    }
}
