import { Types } from '../actions/group/Types'
const initialState = {
  groups: [],
  groupElections: [],
  newGroup: {},
  groupData: {},
  groupDetail: {},
  success: false,
}

export default function groupReducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_ALL_GROUPS:
      return { ...state, groups: action.payload }

    case Types.NEW_GROUP:
      return {
        ...state,
        groups: state.groups.concat(action.payload)
      }

    case Types.SET_GROUP_DATA:
      return {
        ...state,
        groups: state.groups.map((group) => {
          return group.id === action.payload.id ? action.payload : group
        })
      }

    case Types.GET_GROUP_DETAIL:
      return { ...state, groupDetail: action.payload }

    case Types.DELETE_GROUP:
      return { ...state, groups: state.groups.filter((group) => group.id !== action.payload) }

    case Types.GET_ELECTIONS:
      return { ...state, groupElections: action.payload }

    default:
      return state
  }
}
