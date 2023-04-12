import { Types } from './Types'

export const getNextOfKin = (payload) => {
  return {
    type: Types.GET_NEXT_OF_KIN,
      payload: payload
  }
}

export const updateNextOfKin = (payload) => {
  return {
    type: Types.UPDATE_NEXT_OF_KIN,
      payload: payload
  }
}
