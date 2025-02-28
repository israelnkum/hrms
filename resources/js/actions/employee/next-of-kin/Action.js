import api from "../../../utils/api";
import { getNextOfKin, updateNextOfKin, } from './ActionCreators'

export const handleGetNextOfKin = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/next-of-kin/${ id }`).then((res) => {
            dispatch(getNextOfKin(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
/**
 * Update the specified resource in storage.
 * @param data
 * @returns {function(*): Promise<unknown>}
 */
export const handleUpdateNextOfKin = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {

        api().post(`/next-of-kin/0`, data).then((res) => {
            dispatch(updateNextOfKin(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}