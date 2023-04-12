import api from "../../utils/api";
import { addFilter, getPeople } from "./ActionCreators";

/**
 * Display a listing of the resource.
 * @returns {function(*): Promise<unknown>}
 */
export const handleGetPeople = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/people?${params}`).then((res) => {
            dispatch(getPeople(res.data))
            params?.delete('page')
            params && dispatch(addFilter(Object.fromEntries(params)))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}