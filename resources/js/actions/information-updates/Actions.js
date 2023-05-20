import api from "../../utils/api";
import {addFilter, getInformationRequest, getInformationRequests, updateInformationRequest} from "./ActionCreators";

export const handleGetAllInformationUpdate = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/information-updates?${params}`).then((res) => {
            dispatch(getInformationRequests(res.data))
            params?.delete('page')
            params && dispatch(addFilter(Object.fromEntries(params)))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
export const handleGetInformationUpdate = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/information-updates/${id}`).then((res) => {
            dispatch(getInformationRequest(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}


export const handleUpdateInformationRequest = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        data['_method'] = 'PUT'
        api().post(`/information-updates/${data.id}`, data, {
            headers: {'Content-type': 'multipart/form-data'}
        }).then((res) => {
            dispatch(updateInformationRequest(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
