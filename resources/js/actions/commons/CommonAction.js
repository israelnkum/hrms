import api from '../../utils/api'
import {getCommonData,} from './ActionCreators'

export const handleGetCommonData = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get('/commons').then((res) => {
            dispatch(getCommonData(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
