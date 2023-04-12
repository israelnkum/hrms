import {addCommunityService, getCommunityService, getCommunityServices, removeCommunityService, updateCommunityService,} from './ActionCreators'
import api from "../../../utils/api";
import {completeExport} from "../../../utils";

/**
 * Store a newly created resource in storage.
 * @param driver
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddCommunityService = (driver) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/community-services', driver).then((res) => {
            dispatch(addCommunityService(res.data))
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
export const handleGetAllCommunityServices = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/community-services?${params}`).then((res) => {
            dispatch(getCommunityServices(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportCommunityServices = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/community-services?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'CommunityServices')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}
export const handleGetSingleCommunityService = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/community-services/${id}`).then((res) => {
            dispatch(getCommunityService(res.data))
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
export const handleUpdateCommunityService = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/community-services/${data.get('id')}`, data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then((res) => {
            dispatch(updateCommunityService(res.data))
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
export const handleDeleteCommunityService = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/community-services/${id}`).then((res) => {
            dispatch(removeCommunityService(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
