import { Types } from './Types'


export const getContactDetails = (payload) => {
  return {
    type: Types.GET_CONTACT_DETAILS,
      payload: payload
  }
}

export const getContactDetail = (payload) => {
  return {
    type: Types.GET_CONTACT_DETAIL,
      payload: payload
  }
}

export const addContactDetail = (payload) => {
    return {
        type: Types.ADD_CONTACT_DETAIL,
        payload: payload
    }
}

export const removeContactDetail = (id) => {
  return {
    type: Types.REMOVE_CONTACT_DETAIL,
      id: id
  }
}

export const updateContactDetail = (payload) => {
  return {
    type: Types.UPDATE_CONTACT_DETAIL,
      payload: payload
  }
}
