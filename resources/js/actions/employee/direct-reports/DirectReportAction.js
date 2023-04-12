import {addDirectReport, getDirectReport, getDirectReports, removeDirectReport, updateDirectReport,} from './ActionCreators'
import api from "../../../utils/api";
import {completeExport} from "../../../utils";

/**
 * Store a newly created resource in storage.
 * @param driver
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddDirectReport = (driver) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/direct-reports', driver).then((res) => {
            dispatch(addDirectReport(res.data))
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
export const handleGetAllDirectReports = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/direct-reports?${params}`).then((res) => {
            dispatch(getDirectReports(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportDirectReports = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/direct-reports?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'DirectReports')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}
export const handleGetSingleDirectReport = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/direct-reports/${id}`).then((res) => {
            dispatch(getDirectReport(res.data))
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
export const handleUpdateDirectReport = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/direct-reports/${data.get('id')}`, data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then((res) => {
            dispatch(updateDirectReport(res.data))
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
export const handleDeleteDirectReport = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/direct-reports/${id}`).then((res) => {
            dispatch(removeDirectReport(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
