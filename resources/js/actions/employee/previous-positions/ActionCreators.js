import { Types } from './Types'

export const getPreviousPositions = (payload) => {
  return {
    type: Types.GET_PREVIOUS_POSITIONS,
      payload: payload
  }
}

export const getPreviousPosition = (payload) => {
  return {
    type: Types.GET_PREVIOUS_POSITION,
      payload: payload
  }
}

export const addPreviousPosition = (payload) => {
    return {
        type: Types.ADD_PREVIOUS_POSITION,
        payload: payload
    }
}

export const removePreviousPosition = (id) => {
  return {
    type: Types.REMOVE_PREVIOUS_POSITION,
      id: id
  }
}

export const updatePreviousPosition = (payload) => {
  return {
    type: Types.UPDATE_PREVIOUS_POSITION,
      payload: payload
  }
}
