import {createSlice} from '@reduxjs/toolkit';
import {
    handleAddJobDetail,
    handleDeleteJobDetail,
    handleGetAllJobDetails,
    handleGetSingleJobDetail,
    handleUpdateJobDetail
} from '../services/job-details.service';

/**
 * Initial State
 */
const initialState = {
    jobDetails: {
        data: [],
        meta: {},
    },
    filter: {},
    jobDetail: {},
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
};

/**
 * Redux Slice
 */
const jobDetailsSlice = createSlice({
    name: "jobDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(handleAddJobDetail.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.jobDetails.data.push(action.payload);
            })
            .addCase(handleGetAllJobDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.jobDetails = action.payload;
            })
            .addCase(handleGetSingleJobDetail.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.jobDetail = action.payload;
            })
            .addCase(handleUpdateJobDetail.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.jobDetail = action.payload;
                state.jobDetails.data = state.jobDetails.data.map(
                    (jobDetail) =>
                        jobDetail.id === action.payload.id ? action.payload : jobDetail
                );
            })
            .addCase(handleDeleteJobDetail.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.jobDetails.data = state.jobDetails.data.filter(
                    (jobDetail) => jobDetail.id !== action.payload
                );
            });
    },
});

export default jobDetailsSlice.reducer;
