import { Types } from './Types'


export const getCommonData = (payload) => {
  return {
    type: Types.GET_COMMON_DATA,
      payload: payload
  }
}
