import { Types } from './Types'

export const getDirectReports = (payload) => {
  return {
    type: Types.GET_DIRECT_REPORTS,
      payload: payload
  }
}

export const getDirectReport = (payload) => {
  return {
    type: Types.GET_DIRECT_REPORT,
      payload: payload
  }
}

export const addDirectReport = (payload) => {
    return {
        type: Types.ADD_DIRECT_REPORT,
        payload: payload
    }
}

export const removeDirectReport = (id) => {
  return {
    type: Types.REMOVE_DIRECT_REPORT,
      id: id
  }
}

export const updateDirectReport = (payload) => {
  return {
    type: Types.UPDATE_DIRECT_REPORT,
      payload: payload
  }
}
