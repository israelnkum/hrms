import {addPreviousRank, getPreviousRank, getPreviousRanks, removePreviousRank, updatePreviousRank,} from './ActionCreators'
import api from "../../../utils/api";
import {completeExport} from "../../../utils";

/**
 * Store a newly created resource in storage.
 * @param driver
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddPreviousRank = (driver) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/previous-ranks', driver).then((res) => {
            dispatch(addPreviousRank(res.data))
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
export const handleGetAllPreviousRanks = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/previous-ranks?${params}`).then((res) => {
            dispatch(getPreviousRanks(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportPreviousRanks = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/previous-ranks?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'PreviousRanks')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}
export const handleGetSinglePreviousRank = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/previous-ranks/${id}`).then((res) => {
            dispatch(getPreviousRank(res.data))
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
export const handleUpdatePreviousRank = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/previous-ranks/${data.get('id')}`, data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then((res) => {
            dispatch(updatePreviousRank(res.data))
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
export const handleDeletePreviousRank = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/previous-ranks/${id}`).then((res) => {
            dispatch(removePreviousRank(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
