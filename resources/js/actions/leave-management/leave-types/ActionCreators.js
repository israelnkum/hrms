import { Types } from './Types'

/**
 *
 * @param payload
 * @returns {{payload, type: string}}
 */
export const getAllLeaveTypes = (payload) => {
  return {
    type: Types.GET_ALL_LEAVE_TYPES,
      payload: payload
  }
}

export const deleteLeaveType = (payload) => {
  return {
    type: Types.DELETE_LEAVE_TYPE,
      payload: payload
  }
}

export const addLeaveType = (payload) => {
  return {
    type: Types.ADD_LEAVE_TYPE,
      payload: payload
  }
}

export const updateLeaveType = (payload) => {
  return {
    type: Types.UPDATE_LEAVE_TYPE,
      payload: payload
  }
}