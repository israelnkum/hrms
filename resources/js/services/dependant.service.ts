import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Async Thunks

/**
 * Add a new dependant.
 */
export const handleAddDependant = createAsyncThunk(
    'dependants/addDependant',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api().post('/dependants', data);
            return response.data; // return the data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // handle error if any
        }
    }
);

/**
 * Get all dependants.
 */
export const handleGetAllDependants = createAsyncThunk(
    'dependants/getDependants',
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await api().get(`/dependants?${params}`);
            return response.data; // return the data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // handle error if any
        }
    }
);

/**
 * Get a single dependant.
 */
export const handleGetSingleDependant = createAsyncThunk(
    'dependants/getSingleDependant',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api().get(`/dependants/${id}`);
            return response.data; // return the data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // handle error if any
        }
    }
);

/**
 * Update a dependant.
 */
export const handleUpdateDependant = createAsyncThunk(
    'dependants/updateDependant',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await api().post(`/dependants/${data.get('id')}`, data);
            return response.data; // return the updated data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // handle error if any
        }
    }
);

/**
 * Delete a dependant.
 */
export const handleDeleteDependant = createAsyncThunk(
    'dependants/deleteDependant',
    async (id: number, { rejectWithValue }) => {
        try {
            await api().delete(`/dependants/${id}`);
            return id; // return the id of the deleted dependant
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // handle error if any
        }
    }
);
