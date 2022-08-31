import { Types } from '../actions/nominees/Types'
const initialState = {
  nominees: {
      data: [],
      meta: []
  },
  newNominee: {},
  nomineeData: {},
  nomineeDetail: {}
}

export default function nominationReducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_ALL_NOMINEES:
      return { ...state, nominees: action.payload }

    case Types.NEW_NOMINEE:
      return {
        ...state,
        groups: state.groups.concat(action.payload),
      }

    case Types.SET_NOMINEE_DATA:
      return {
          ...state,
          nomineeData: action.payload,
          nominees: {
              ...state.nominees,
              data: state.nominees.data.map((nominee) => {
                  return nominee.id === action.payload.id ? action.payload : nominee
              })
          }
      }

    case Types.GET_NOMINEE_DETAIL:
      return { ...state, nomineeData: action.payload }

    case Types.DELETE_NOMINEE:
      return { ...state, groups: state.groups.filter((group) => group.id !== action.payload) }

    case Types.MAKE_CANDIDATE:
      return {
          // ...state, nominees: state.nominees.filter((nominee) => nominee.id !== action.payload)
          ...state,
          nominees: {
              ...state.nominees, data: state.nominees.data.filter((nominee) => nominee.id !== action.payload) }

      }

    default:
      return state
  }
}
