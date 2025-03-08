import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Fetch all previous ranks
export const fetchPreviousRanks = createAsyncThunk(
    'previousRank/fetchPreviousRanks',
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await api().get(`/previous-ranks?${params}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch a single previous rank by ID
export const fetchPreviousRank = createAsyncThunk(
    'previousRank/fetchPreviousRank',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api().get(`/previous-ranks/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Add a new previous rank
export const addPreviousRank = createAsyncThunk(
    'previousRank/addPreviousRank',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api().post('/previous-ranks', data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Update a previous rank
export const updatePreviousRank = createAsyncThunk(
    'previousRank/updatePreviousRank',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await api().put(`/previous-ranks/${data.get('id')}`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Remove a previous rank
export const removePreviousRank = createAsyncThunk(
    'previousRank/removePreviousRank',
    async (id: number, { rejectWithValue }) => {
        try {
            await api().delete(`/previous-ranks/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
