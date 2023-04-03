import api from "../../../utils/api";
import { approveLeaveRequest, getLeaveRequest } from './ActionCreators'

/**
 * Store a newly created resource in storage.
 * @param params
 * @returns {function(*): Promise<unknown>}
 */
export const handleGetAllLeaveRequest = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/leave-management/leave-request?${ params }`).then((res) => {
            dispatch(getLeaveRequest(res.data))
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