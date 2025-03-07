import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    directReports: {
        data: [],
        meta: {}
    },
    filter: {},
    directReport: {},
}

const directReportSlice = createSlice({
    name: 'directReport',
    initialState,
    reducers: {
        getDirectReports: (state, action) => {
            state.directReports = action.payload
        },
        getDirectReport: (state, action) => {
            state.directReport = action.payload
        },
        addDirectReport: (state, action) => {
            state.directReports.data.push(action.payload)
        },
        updateDirectReport: (state, action) => {
            state.directReports.data = state.directReports.data.map((directReport) =>
                directReport.id === action.payload.id ? action.payload : directReport
            )
        },
        removeDirectReport: (state, action) => {
            state.directReports.data = state.directReports.data.filter(
                (directReport) => directReport.id !== action.payload
            )
        },
    },
})

export const {
    getDirectReports,
    getDirectReport,
    addDirectReport,
    updateDirectReport,
    removeDirectReport,
} = directReportSlice.actions

export default directReportSlice.reducer
