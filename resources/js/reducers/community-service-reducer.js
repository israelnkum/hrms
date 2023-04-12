import { Types } from '../actions/employee/community-services/Types'
const initialState = {
    communityServices: {
        data: [],
        meta: {}
    },
    filter: {},
    communityService: {},
}

export default function communityServiceReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_COMMUNITY_SERVICES:
            return { ...state, communityServices: action.payload }

        case Types.GET_COMMUNITY_SERVICE:
            return { ...state, communityService: action.payload }

        case Types.ADD_COMMUNITY_SERVICE:
            return {
                ...state,
                communityServices: {
                    ...state.communityServices,
                    data: state.communityServices.data.concat(action.payload)
                }
            }

        case Types.UPDATE_COMMUNITY_SERVICE:
            return {
                ...state,
                communityServices: {
                    ...state.communityServices,
                    data: state.communityServices.data.map((communityService) => {
                        return communityService.id === action.payload.id ? action.payload : communityService
                    })
                }
            }

        case Types.REMOVE_COMMUNITY_SERVICE:
            return {
                ...state,
                communityServices: { ...state.communityServices, data: state.communityServices.data.filter((communityService) => communityService.id !== action.id) }
            }

        default:
            return state
    }
}
