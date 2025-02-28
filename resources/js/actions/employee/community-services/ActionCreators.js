import { Types } from './Types'

export const getCommunityServices = (payload) => {
  return {
    type: Types.GET_COMMUNITY_SERVICES,
      payload: payload
  }
}

export const getCommunityService = (payload) => {
  return {
    type: Types.GET_COMMUNITY_SERVICE,
      payload: payload
  }
}

export const addCommunityService = (payload) => {
    return {
        type: Types.ADD_COMMUNITY_SERVICE,
        payload: payload
    }
}

export const removeCommunityService = (id) => {
  return {
    type: Types.REMOVE_COMMUNITY_SERVICE,
      id: id
  }
}

export const updateCommunityService = (payload) => {
  return {
    type: Types.UPDATE_COMMUNITY_SERVICE,
      payload: payload
  }
}
