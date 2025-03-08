import {createAsyncThunk} from '@reduxjs/toolkit';
import api from "../utils/api";
import {completeExport} from "../utils";

/**
 * Async Thunk: Add Job Detail
 */
export const handleAddJobDetail = createAsyncThunk(
    "jobDetails/addJobDetail",
    async (driver, { rejectWithValue }) => {
        try {
            const response = await api().post("/job-details", driver);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

/**
 * Async Thunk: Get All Job Details
 */
export const handleGetAllJobDetails = createAsyncThunk(
    "jobDetails/getJobDetails",
    async (params, { rejectWithValue }) => {
        try {
            const response = await api().get(`/job-details?${params}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

/**
 * Async Thunk: Export Job Details
 */
export const handleExportJobDetails = createAsyncThunk(
    "jobDetails/exportJobDetails",
    async (params, { rejectWithValue }) => {
        try {
            const response = await api().get(`/job-details?${params}`, {
                responseType: "blob",
            });
            completeExport(response.data, "JobDetails");
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

/**
 * Async Thunk: Get Single Job Detail
 */
export const handleGetSingleJobDetail = createAsyncThunk(
    "jobDetails/getSingleJobDetail",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await api().get(`/job-details/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

/**
 * Async Thunk: Update Job Detail
 */
export const handleUpdateJobDetail = createAsyncThunk(
    "jobDetails/updateJobDetail",
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await api().post(
                `/job-details/${data.get("id")}`,
                data,
                { headers: { "Content-type": "multipart/form-data" } }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

/**
 * Async Thunk: Delete Job Detail
 */
export const handleDeleteJobDetail = createAsyncThunk(
    "jobDetails/deleteJobDetail",
    async (id, { rejectWithValue }) => {
        try {
            await api().delete(`/job-details/${id}`);
            return id; // Return the id to be used in reducers
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
