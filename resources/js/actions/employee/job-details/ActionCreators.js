import { Types } from './Types'


export const getJobDetails = (payload) => {
  return {
    type: Types.GET_JOB_DETAILS,
      payload: payload
  }
}

export const getJobDetail = (payload) => {
  return {
    type: Types.GET_JOB_DETAIL,
      payload: payload
  }
}

export const addJobDetail = (payload) => {
    return {
        type: Types.ADD_JOB_DETAIL,
        payload: payload
    }
}

export const removeJobDetail = (id) => {
  return {
    type: Types.REMOVE_JOB_DETAIL,
      id: id
  }
}

export const updateJobDetail = (payload) => {
  return {
    type: Types.UPDATE_JOB_DETAIL,
      payload: payload
  }
}
