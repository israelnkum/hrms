import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    informationUpdates: {
        data: [],
        meta: {}
    },
    informationUpdate: {},
    filterParams: {},
    filter: {
        status: 'Pending',
    }
}

const informationUpdateSlice = createSlice({
    name: 'informationUpdate',
    initialState,
    reducers: {
        getInformationRequests: (state, action) => {
            state.informationUpdates = action.payload
        },
        getInformationRequest: (state, action) => {
            state.informationUpdate = action.payload
        },
        addInformationRequestFilter: (state, action) => {
            state.filter = action.payload
        },
        getFilterParams: (state, action) => {
            state.filterParams = action.payload
        },
    },
})

export const {
    getInformationRequests,
    getInformationRequest,
    addInformationRequestFilter,
    getFilterParams,
} = informationUpdateSlice.actions

export default informationUpdateSlice.reducer
