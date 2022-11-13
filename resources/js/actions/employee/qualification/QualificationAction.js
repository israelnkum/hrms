import api from '../../../utils/api'
import {addQualification, getQualification, getQualifications, removeQualification, updateQualification,} from './ActionCreators'
import {completeExport} from "../../../utils";

/**
 * Store a newly created resource in storage.
 * @param driver
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddQualification = (driver) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/qualifications', driver).then((res) => {
            dispatch(addQualification(res.data))
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
export const handleGetAllQualifications = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/qualifications?${params}`).then((res) => {
            dispatch(getQualifications(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportQualifications = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/qualifications?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'Qualifications')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}
export const handleGetSingleQualification = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/qualifications/${id}`).then((res) => {
            dispatch(getQualification(res.data))
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
export const handleUpdateQualification = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/qualifications/${data.get('id')}`, data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then((res) => {
            dispatch(updateQualification(res.data))
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
export const handleDeleteQualification = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/qualifications/${id}`).then((res) => {
            dispatch(removeQualification(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
