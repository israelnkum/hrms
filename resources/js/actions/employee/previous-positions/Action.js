import {addPreviousPosition, getPreviousPosition, getPreviousPositions, removePreviousPosition, updatePreviousPosition,} from './ActionCreators'
import api from "../../../utils/api";
import {completeExport} from "../../../utils";

/**
 * Store a newly created resource in storage.
 * @param driver
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddPreviousPosition = (driver) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/previous-positions', driver).then((res) => {
            dispatch(addPreviousPosition(res.data))
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
export const handleGetAllPreviousPositions = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/previous-positions?${params}`).then((res) => {
            dispatch(getPreviousPositions(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportPreviousPositions = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/previous-positions?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'PreviousPositions')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}
export const handleGetSinglePreviousPosition = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/previous-positions/${id}`).then((res) => {
            dispatch(getPreviousPosition(res.data))
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
export const handleUpdatePreviousPosition = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/previous-positions/${data.get('id')}`, data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then((res) => {
            dispatch(updatePreviousPosition(res.data))
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
export const handleDeletePreviousPosition = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/previous-positions/${id}`).then((res) => {
            dispatch(removePreviousPosition(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
