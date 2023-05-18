import api from "../../utils/api";
import {addFilter, getInformationRequest, getInformationRequests} from "./ActionCreators";

export const handleGetAllInformationUpdate = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/information-update/all?${params}`).then((res) => {
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
        api().get(`/information-update/${id}`).then((res) => {
            dispatch(getInformationRequest(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
