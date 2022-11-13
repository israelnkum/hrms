import {addJobDetail, getJobDetail, getJobDetails, removeJobDetail, updateJobDetail,} from './ActionCreators'
import api from "../../../utils/api";
import {completeExport} from "../../../utils";

/**
 * Store a newly created resource in storage.
 * @param driver
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddJobDetail = (driver) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/job-details', driver).then((res) => {
            dispatch(addJobDetail(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * Display a listing of the resource.
 * @returns {function(*): Promise<unknown>}
 */
export const handleGetAllJobDetails = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/job-details?${params}`).then((res) => {
            dispatch(getJobDetails(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportJobDetails = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/job-details?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'JobDetails')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}
export const handleGetSingleJobDetail = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/job-details/${id}`).then((res) => {
            dispatch(getJobDetail(res.data))
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
export const handleUpdateJobDetail = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/job-details/${data.get('id')}`, data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then((res) => {
            dispatch(updateJobDetail(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * Remove the specified resource from storage.
 * @param id
 * @returns {function(*): Promise<unknown>}
 */
export const handleDeleteJobDetail = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/job-details/${id}`).then((res) => {
            dispatch(removeJobDetail(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
