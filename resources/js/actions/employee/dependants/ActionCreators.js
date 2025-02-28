import { Types } from './Types'


export const getDependants = (payload) => {
  return {
    type: Types.GET_DEPENDANTS,
      payload: payload
  }
}

export const getDependant = (payload) => {
  return {
    type: Types.GET_DEPENDANT,
      payload: payload
  }
}

export const addDependant = (payload) => {
    return {
        type: Types.ADD_DEPENDANT,
        payload: payload
    }
}

export const removeDependant = (id) => {
  return {
    type: Types.REMOVE_DEPENDANT,
      id: id
  }
}

export const updateDependant = (payload) => {
  return {
    type: Types.UPDATE_DEPENDANT,
      payload: payload
  }
}
