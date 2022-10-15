import api from '../../../utils/api'
import {addDependant, getDependant, getDependants, removeDependant, updateDependant,} from './ActionCreators'

/**
 * Store a newly created resource in storage.
 * @param driver
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddDependant = (driver) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/dependants', driver).then((res) => {
            dispatch(addDependant(res.data))
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
export const handleGetAllDependants = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/dependants?${params}`).then((res) => {
            dispatch(getDependants(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetSingleDependant = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/dependants/${id}`).then((res) => {
            dispatch(getDependant(res.data))
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
export const handleUpdateDependant = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/dependants/${data.get('id')}`, data, {
            // headers: { 'Content-type': 'multipart/employee-data' }
        }).then((res) => {
            dispatch(updateDependant(res.data))
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
export const handleDeleteDependant = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/dependants/${id}`).then((res) => {
            dispatch(removeDependant(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
