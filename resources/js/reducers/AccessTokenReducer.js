import { Types } from '../actions/access-tokens/Types'
const initialState = {
  accessTokens: [],
  newToken: {},
  tokenData: {},
  tokenDetail: {},
}

export default function accessTokenReducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_ALL_TOKENS:
      return { ...state, accessTokens: action.payload }

    case Types.NEW_TOKEN:
      return { ...state, accessTokens: state.accessTokens.concat(action.payload) }

    case Types.SET_TOKEN_DATA:
      return {
        ...state,
        accessTokens: state.accessTokens.map((token) => {
          return token.id === action.payload.id ? action.payload : token
        })
      }

    case Types.GET_TOKEN_DETAIL:
      return { ...state, tokenDetail: action.payload }

    default:
      return state
  }
}
