import { completeExport } from "../../utils";
import api from "../../utils/api";
import { changeLeaveStatus } from "../commons/ActionCreators";
import {
    changeLeaveRequestStatus,
    getHolidays,
    getLeaveRequests,
    getLeaveTypes, getTimeOff,
    requestTimeOff,
    addFilter
} from './ActionCreators'

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
        api().get(`/leave-request?${ params }`).then((res) => {
            dispatch(getLeaveRequests(res.data))
            params?.delete('page')
            params && dispatch(addFilter(Object.fromEntries(params)))
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
export const handleGetTimeOff = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/leave-request/${ id }`).then((res) => {
            dispatch(getTimeOff(res.data))
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
export const handleChangeLeaveRequestStatus = (data, fromDashboard = false) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/leave-request/status/change', data).then((res) => {

            if (fromDashboard) {
                dispatch(changeLeaveStatus(res.data))
            } else {
                dispatch(changeLeaveRequestStatus(res.data))
            }
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}