import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    leaveRequests: {
        data: [],
        meta: {}
    },
    filterParams: {},
    filter: {
        department_id: 'all',
        supervisor_id: 'all',
        hr_id: 'all',
        leave_type_id: 'all',
        hr_status: 'Pending',
    }
}

const leaveManagementSlice = createSlice({
    name: 'leaveManagement',
    initialState,
    reducers: {
        getLeaveRequests: (state, action) => {
            state.leaveRequests = action.payload
        },
        addLeaveRequestFilter: (state, action) => {
            state.filter = action.payload
        },
        getFilterParams: (state, action) => {
            state.filterParams = action.payload
        },
    },
})

export const {
    getLeaveRequests,
    addLeaveRequestFilter,
    getFilterParams,
} = leaveManagementSlice.actions

export default leaveManagementSlice.reducer
