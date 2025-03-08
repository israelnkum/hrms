import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Fetch all previous positions
export const fetchPreviousPositions = createAsyncThunk(
    'previousPosition/fetchPreviousPositions',
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await api().get(`/previous-positions?${params}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch a single previous position by ID
export const fetchPreviousPosition = createAsyncThunk(
    'previousPosition/fetchPreviousPosition',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api().get(`/previous-positions/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Add a new previous position
export const addPreviousPosition = createAsyncThunk(
    'previousPosition/addPreviousPosition',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api().post('/previous-positions', data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Update a previous position
export const updatePreviousPosition = createAsyncThunk(
    'previousPosition/updatePreviousPosition',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await api().put(`/previous-positions/${data.get("id")}`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Remove a previous position
export const removePreviousPosition = createAsyncThunk(
    'previousPosition/removePreviousPosition',
    async (id: number, { rejectWithValue }) => {
        try {
            await api().delete(`/previous-positions/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
