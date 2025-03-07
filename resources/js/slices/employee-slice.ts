import {createSlice} from '@reduxjs/toolkit'
import {
    addEmployee,
    fetchEmployee,
    fetchEmployees,
    fetchEmployeesByFilter,
    removeEmployee,
    updateEmployee
} from "../services/employee.service";
import {EmployeeState} from "../types/employee";

const initialState: EmployeeState = {
    people: {
        data: [],
        meta: {
            pageCount: 0,
            currentPage: 0,
            total: 0,
            from: 0,
            links: {
                first: "",
                last: "",
                next: null,
                prev: null
            }
        }
    },
    filter: {
        department_id: 'all',
        rank_id: 'all',
        educational_level_id: 'all',
        job_category_id: 'all'
    },
    employees: {
        data: [],
        meta: {
            pageCount: 0,
            currentPage: 0,
            total: 0,
            from: 0,
            links: {
                first: "",
                last: "",
                next: null,
                prev: null
            }
        }
    },
    employee: {
        id: 0
    }
}

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        addEmployeeFilter: (state, action) => {
            state.filter = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.employees = action.payload
            })
            .addCase(fetchEmployee.fulfilled, (state, action) => {
                state.employee = action.payload
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.employees.data.push(action.payload)
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.employee = action.payload
                state.employees.data = state.employees.data.map((employee) =>
                    employee.id === action.payload.id ? action.payload : employee
                )
            })
            .addCase(removeEmployee.fulfilled, (state, action) => {
                state.employees.data = state.employees.data.filter(
                    (employee) => employee.id !== action.payload
                )
            })
            .addCase(fetchEmployeesByFilter.fulfilled, (state, action) => {
                state.employees = action.payload
            })
    }
})

export const { addEmployeeFilter } = employeeSlice.actions

export default employeeSlice.reducer
