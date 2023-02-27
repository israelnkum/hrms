
import api from "../../utils/api";
import { getHolidays, getLeaveRequests, getLeaveTypes, requestTimeOff, } from './ActionCreators'

/**
 * Store a newly created resource in storage.
 * @param data
 * @returns {function(*): Promise<unknown>}
 */
export const handleRequestTimeOff = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/leave-request', data).then((res) => {
            dispatch(requestTimeOff(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 *
 * @returns {function(*): Promise<unknown>}
 */
export const handleGetHolidays = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get('/leave-request/holidays').then((res) => {
            dispatch(getHolidays(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 *
 * @returns {function(*): Promise<unknown>}
 */
export const handleGetLeaveTypes = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get('/leave-request/types').then((res) => {
            dispatch(getLeaveTypes(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
/**
 *
 * @returns {function(*): Promise<unknown>}
 */
export const handleGetLeaveRequest = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/leave-request?${params}`).then((res) => {
            dispatch(getLeaveRequests(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}