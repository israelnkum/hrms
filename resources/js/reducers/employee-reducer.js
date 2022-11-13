import { Types } from '../actions/employee/Types'
const initialState = {
    employees: {
        data: [],
        meta: {}
    },
    employee: {},
    filter: {
        department_id: 'all',
        rank_id: 'all',
        educational_level_id: 'all',
        job_category_id: 'all'
    }
}

export default function employeeReducer (state = initialState, action) {
    switch (action.type) {
        case Types.GET_EMPLOYEES:
            return { ...state, employees: action.payload }

        case Types.ADD_EMPLOYEE_FILTER:
            return { ...state, filter: action.payload}

        case Types.GET_EMPLOYEE:
            return { ...state, employee: action.payload }

        case Types.ADD_EMPLOYEE:
            return {
                ...state,
                employees: { ...state.employees, data: state.employees.data.concat(action.payload) }
            }

        case Types.UPDATE_EMPLOYEE:
            return {
                ...state,
                employee: action.payload,
                employees: {
                    ...state.employees,
                    data: state.employees.data.map((employee) => {
                        return employee.id === action.payload.id ? action.payload : employee
                    })
                }
            }

        case Types.REMOVE_EMPLOYEE:
            return {
                ...state,
                employees: { ...state.employees, data: state.employees.data.filter((employee) => employee.id !== action.id) }
            }

        default:
            return state
    }
}
