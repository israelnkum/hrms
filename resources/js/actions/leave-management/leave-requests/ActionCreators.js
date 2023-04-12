import { Types } from './Types'

/**
 *
 * @param payload
 * @returns {{payload, type: string}}
 */
export const getLeaveRequest = (payload) => {
  return {
    type: Types.GET_LEAVE_REQUESTS,
      payload: payload
  }
}
/**
 *
 * @param payload
 * @returns {{payload, type: string}}
 */
export const approveLeaveRequest = (payload) => {
  return {
    type: Types.APPROVE_LEAVE_REQUEST,
      payload: payload
  }
}