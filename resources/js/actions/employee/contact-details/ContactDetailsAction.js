import {addContactDetail, getContactDetail, getContactDetails, removeContactDetail, updateContactDetail,} from './ActionCreators'
import api from "../../../utils/api";
import {completeExport} from "../../../utils";

/**
 * Store a newly created resource in storage.
 * @param driver
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddContactDetail = (driver) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/contact-details', driver).then((res) => {
            dispatch(addContactDetail(res.data))
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
export const handleGetAllContactDetails = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/contact-details?${params}`).then((res) => {
            dispatch(getContactDetails(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportContactDetails = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/contact-details?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'ContactDetails')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}
export const handleGetSingleContactDetail = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/contact-details/${id}`).then((res) => {
            dispatch(getContactDetail(res.data))
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
export const handleUpdateContactDetail = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/contact-details/${data.get('id')}`, data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then((res) => {
            dispatch(updateContactDetail(res.data))
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
export const handleDeleteContactDetail = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/contact-details/${id}`).then((res) => {
            dispatch(removeContactDetail(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
