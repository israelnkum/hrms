import { Types } from './Types'


export const getQualifications = (payload) => {
  return {
    type: Types.GET_QUALIFICATIONS,
      payload: payload
  }
}

export const getQualification = (payload) => {
  return {
    type: Types.GET_QUALIFICATION,
      payload: payload
  }
}

export const addQualification = (payload) => {
    return {
        type: Types.ADD_QUALIFICATION,
        payload: payload
    }
}

export const removeQualification = (id) => {
  return {
    type: Types.REMOVE_QUALIFICATION,
      id: id
  }
}

export const updateQualification = (payload) => {
  return {
    type: Types.UPDATE_QUALIFICATION,
      payload: payload
  }
}
