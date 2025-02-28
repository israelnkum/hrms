import { Types } from './Types'

export const getNotificationNavs = (payload) => {
  return {
    type: Types.GET_NOTIFICATION_NAVS,
      payload: payload
  }
}