import { Types } from './Types'

export const requestTimeOff = (payload) => {
  return {
    type: Types.REQUEST_TIME_OFF,
      payload: payload
  }
}