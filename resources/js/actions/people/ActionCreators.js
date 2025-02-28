import { Types } from './Types'

export const getPeople = (payload) => {
  return {
    type: Types.GET_PEOPLE,
    payload: payload
  }
}

export const addFilter = (payload) => {
  return {
    type: Types.ADD_PEOPLE_FILTER,
    payload: payload
  }
}
