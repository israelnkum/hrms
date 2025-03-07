import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Fetch common data
export const handleGetCommonData = createAsyncThunk(
    'common/getCommonData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api().get('/commons');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch pending actions for a supervisor
export const handleGetPendingActions = createAsyncThunk(
    'common/getPendingActions',
    async (supervisorId, { rejectWithValue }) => {
        try {
            const response = await api().get(`/supervisor/${supervisorId}/pending-actions`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch my team members
export const handleGetMyTeam = createAsyncThunk(
    'common/getMyTeam',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api().get('/my-team');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch who is currently out
export const handleGetWhoIsOut = createAsyncThunk(
    'common/getWhoIsOut',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api().get('/who-is-out');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch user permissions
export const handleGetAllPermissions = createAsyncThunk(
    'common/getAllPermissions',
    async (staffId, { rejectWithValue }) => {
        try {
            const response = await api().get(`/common/permissions/${staffId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Assign new permissions
export const handleAssignPermissions = createAsyncThunk(
    'common/assignPermissions',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api().post('/common/permissions/assign', data);
            return response.data.data; // Only return necessary data
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
