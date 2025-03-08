import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';
import { completeExport } from "../utils";

// Async Thunks

/**
 * Add a new community service.
 */
export const handleAddCommunityService = createAsyncThunk(
    'communityServices/addCommunityService',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api().post('/community-services', data);
            return response.data; // return the data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // handle error if any
        }
    }
);

/**
 * Get all community services.
 */
export const handleGetAllCommunityServices = createAsyncThunk(
    'communityServices/getCommunityServices',
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await api().get(`/community-services?${params}`);
            return response.data; // return the data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // handle error if any
        }
    }
);

/**
 * Export community services.
 */
export const handleExportCommunityServices = createAsyncThunk(
    'communityServices/exportCommunityServices',
    async (params, { rejectWithValue }) => {
        try {
            const response = await api().get(`/community-services?${params}`, { responseType: 'blob' });
            completeExport(response.data, 'CommunityServices'); // Export the data
            return;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // handle error if any
        }
    }
);

/**
 * Get a single community service by id.
 */
export const handleGetSingleCommunityService = createAsyncThunk(
    'communityServices/getSingleCommunityService',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api().get(`/community-services/${id}`);
            return response.data; // return the data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // handle error if any
        }
    }
);

/**
 * Update a community service.
 */
export const handleUpdateCommunityService = createAsyncThunk(
    'communityServices/updateCommunityService',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await api().post(`/community-services/${data.get('id')}`, data, {
                headers: { 'Content-type': 'multipart/form-data' }
            });
            return response.data; // return the updated data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // handle error if any
        }
    }
);

/**
 * Delete a community service.
 */
export const handleDeleteCommunityService = createAsyncThunk(
    'communityServices/deleteCommunityService',
    async (id: number, { rejectWithValue }) => {
        try {
            await api().delete(`/community-services/${id}`);
            return id; // return the id of the deleted service
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // handle error if any
        }
    }
);
