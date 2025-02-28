import { Types } from '../actions/employee/emergency-contacts/Types'
const initialState = {
    emergencyContacts: {
        data: [],
        meta: {}
    },
    filter: {},
    emergencyContact: {},
}

export default function emergencyContactReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_EMERGENCY_CONTACTS:
            return { ...state, emergencyContacts: action.payload }

        case Types.GET_EMERGENCY_CONTACT:
            return { ...state, emergencyContact: action.payload }

        case Types.ADD_EMERGENCY_CONTACT:
            return {
                ...state,
                emergencyContacts: {
                    ...state.emergencyContacts,
                    data: state.emergencyContacts.data.concat(action.payload)
                }
            }

        case Types.UPDATE_EMERGENCY_CONTACT:
            return {
                ...state,
                emergencyContacts: {
                    ...state.emergencyContacts,
                    data: state.emergencyContacts.data.map((emergencyContact) => {
                        return emergencyContact.id === action.payload.id ? action.payload : emergencyContact
                    })
                }
            }

        case Types.REMOVE_EMERGENCY_CONTACT:
            return {
                ...state,
                emergencyContacts: { ...state.emergencyContacts, data: state.emergencyContacts.data.filter((emergencyContact) => emergencyContact.id !== action.id) }
            }

        default:
            return state
    }
}
