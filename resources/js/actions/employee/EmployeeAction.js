import { completeExport } from "../../utils";
import api from '../../utils/api'
import {
    addEmployee,
    addFilter,
    applySearch,
    getEmployee,
    getEmployees,
    removeEmployee,
    updateEmployee,
} from './ActionCreators'

/**
 * Store a newly created resource in storage.
 * @param employee
 * @returns {function(*): Promise<unknown>}
 */
export const handleAddEmployee = (employee) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post('/employees', employee).then((res) => {
            dispatch(addEmployee(res.data))
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
export const handleGetAllEmployees = (params) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/employees?${params}`).then((res) => {
            dispatch(getEmployees(res.data))
            params?.delete('page')
            params && dispatch(addFilter(Object.fromEntries(params)))
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
export const handleSearchEmployees = (query) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/employees/search/${query}`).then((res) => {
            dispatch(applySearch(res.data))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const handleExportEmployees = (params) => async () => {
    return new Promise((resolve, reject) => {
        api().get(`/employees?${params}`, { responseType: 'blob' })
            .then((res) => {
                completeExport(res.data, 'hrms-employees')
                resolve()
            }).catch((err) => {
            reject(err)
        })
    })
}

export const handleGetSingleEmployee = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().get(`/employees/${id}`).then((res) => {
            dispatch(getEmployee(res.data))
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
export const handleUpdateEmployee = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().post(`/employees/${data.get('id')}`, data, {
            // headers: { 'Content-type': 'multipart/employee-dashboard-data' }
        }).then((res) => {
            dispatch(updateEmployee(res.data))
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
export const handleDeleteEmployee = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        api().delete(`/employees/${id}`).then((res) => {
            dispatch(removeEmployee(id))
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
