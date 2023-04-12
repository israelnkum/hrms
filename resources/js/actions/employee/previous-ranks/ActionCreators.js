import { Types } from './Types'

export const getPreviousRanks = (payload) => {
  return {
    type: Types.GET_PREVIOUS_RANKS,
      payload: payload
  }
}

export const getPreviousRank = (payload) => {
  return {
    type: Types.GET_PREVIOUS_RANK,
      payload: payload
  }
}

export const addPreviousRank = (payload) => {
    return {
        type: Types.ADD_PREVIOUS_RANK,
        payload: payload
    }
}

export const removePreviousRank = (id) => {
  return {
    type: Types.REMOVE_PREVIOUS_RANK,
      id: id
  }
}

export const updatePreviousRank = (payload) => {
  return {
    type: Types.UPDATE_PREVIOUS_RANK,
      payload: payload
  }
}
