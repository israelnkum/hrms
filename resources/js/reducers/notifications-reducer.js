import { Types } from '../actions/notifications/Types'

const initialState = {
    notificationNavs: [],
}

export default function notificationsReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_NOTIFICATION_NAVS:
            return {...state, notificationNavs: action.payload}

        default:
            return state
    }
}
