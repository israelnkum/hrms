import { createAsyncThunk } from '@reduxjs/toolkit';
import api from "../utils/api";

// Async Thunks

/**
 * Request time off.
 */
export const handleRequestTimeOff = createAsyncThunk(
    'timeOff/requestTimeOff',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api().post('/leave-request', data);
            return response.data; // Return the data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // Handle error if any
        }
    }
);

/**
 * Get holidays.
 */
export const handleGetHolidays = createAsyncThunk(
    'timeOff/getHolidays',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api().get('/leave-request/holidays');
            return response.data; // Return the data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // Handle error if any
        }
    }
);

/**
 * Get leave types.
 */
export const handleGetLeaveTypes = createAsyncThunk(
    'timeOff/getLeaveTypes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api().get('/leave-request/types');
            return response.data; // Return the data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // Handle error if any
        }
    }
);

/**
 * Get leave requests.
 */
export const handleGetLeaveRequest = createAsyncThunk(
    'timeOff/getLeaveRequests',
    async (params, { rejectWithValue }) => {
        try {
            const response = await api().get(`/leave-request?${params}`);
            return response.data; // Return the data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // Handle error if any
        }
    }
);

/**
 * Get time off details for a specific request.
 */
export const handleGetTimeOff = createAsyncThunk(
    'timeOff/getTimeOff',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api().get(`/leave-request/${id}`);
            return response.data; // Return the data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // Handle error if any
        }
    }
);

/**
 * Change the status of a leave request.
 */
export const handleChangeLeaveRequestStatus = createAsyncThunk(
    'timeOff/changeLeaveRequestStatus',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api().post('/leave-request/status/change', data);
            return response.data; // Return the data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // Handle error if any
        }
    }
);
