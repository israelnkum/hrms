import api from '../../utils/api'
import { getNotificationNavs, } from './ActionCreators'

export const handleGetNotificationNavs = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get('/notifications/navs').then((res) => {
            dispatch(getNotificationNavs(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}