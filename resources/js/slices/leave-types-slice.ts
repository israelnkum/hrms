import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    leaveTypes: {
        data: [],
        meta: {}
    },
    filter: {
        department_id: 'all',
        rank_id: 'all',
        educational_level_id: 'all',
        job_category_id: 'all'
    }
}

const leaveTypesSlice = createSlice({
    name: 'leaveTypes',
    initialState,
    reducers: {
        getAllLeaveTypes: (state, action) => {
            state.leaveTypes = action.payload
        },
    },
})

export const { getAllLeaveTypes } = leaveTypesSlice.actions

export default leaveTypesSlice.reducer
