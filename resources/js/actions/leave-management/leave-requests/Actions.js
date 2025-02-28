import { completeExport } from "../../../utils";
import api from "../../../utils/api";
import { approveLeaveRequest, getLeaveRequest, addFilter, getFilterParams } from './ActionCreators'

/**
 * Store a newly created resource in storage.
 * @param params
 * @returns {function(*): Promise<unknown>}
 */
export const handleGetAllLeaveRequest = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/leave-management/leave-request?${ params }`).then((res) => {
            dispatch(getLeaveRequest(res.data))
            params?.delete('page')
            params && dispatch(addFilter(Object.fromEntries(params)))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}


export const handleGetFilterParams = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get('/leave-management/filter-params').then((res) => {
            dispatch(getFilterParams(res.data.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}


export const handleApproveLeaveRequest = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/leave-management/leave-request/status/hr/change`, data).then((res) => {
            dispatch(approveLeaveRequest(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportAllLeaveRequest = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/leave-request?${ params }`, {responseType: 'blob'})
            .then((res) => {
                completeExport(res.data, 'hrms-leave-request')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}