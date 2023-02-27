import { Types } from './Types'

/**
 *
 * @param payload
 * @returns {{payload, type: string}}
 */
export const requestTimeOff = (payload) => {
  return {
    type: Types.REQUEST_TIME_OFF,
      payload: payload
  }
}

/**
 *
 * @param payload
 * @returns {{payload, type: string}}
 */
export const getHolidays = (payload) => {
  return {
    type: Types.GET_HOLIDAYS,
      payload: payload
  }
}

/**
 *
 * @param payload
 * @returns {{payload, type: string}}
 */
export const getLeaveTypes = (payload) => {
  return {
    type: Types.GET_LEAVE_TYPES,
      payload: payload
  }
}
/**
 *
 * @param payload
 * @returns {{payload, type: string}}
 */
export const getLeaveRequests = (payload) => {
  return {
    type: Types.GET_LEAVE_REQUESTS,
      payload: payload
  }
}