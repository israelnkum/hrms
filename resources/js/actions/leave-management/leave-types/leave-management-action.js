import api from "../../../utils/api";
import { addLeaveType, deleteLeaveType, getAllLeaveTypes, updateLeaveType } from './ActionCreators'

/**
 * Store a newly created resource in storage.
 * @param data
 * @returns {function(*): Promise<unknown>}
 */
export const handleGetAllLeaveRequest = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get('/leave-management/leave-types', data).then((res) => {
            dispatch(getAllLeaveTypes(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleDeleteLeaveType = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/leave-management/leave-types/${id}`).then((res) => {
            dispatch(deleteLeaveType(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleAddLeaveType = (leaveType) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/leave-management/leave-types', leaveType).then((res) => {
            dispatch(addLeaveType(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
export const handleUpdateLeaveType = (leaveType) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().put('/leave-management/leave-types', leaveType).then((res) => {
            dispatch(updateLeaveType(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}