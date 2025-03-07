import {createAsyncThunk} from '@reduxjs/toolkit'
import api from '../utils/api'

// Async Thunks

/**
 * Add a new emergency contact.
 */
export const handleAddEmergencyContact = createAsyncThunk(
    'emergencyContact/addEmergencyContact',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api().post('/emergency-contacts', data);
            return response.data; // return the data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // handle error if any
        }
    }
);

/**
 * Get all emergency contacts.
 */
export const handleGetAllEmergencyContacts = createAsyncThunk(
    'emergencyContact/getEmergencyContacts',
    async (params, { rejectWithValue }) => {
        try {
            const response = await api().get(`/emergency-contacts?${params}`);
            return response.data; // return the data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // handle error if any
        }
    }
);

/**
 * Get a single emergency contact.
 */
export const handleGetSingleEmergencyContact = createAsyncThunk(
    'emergencyContact/getSingleEmergencyContact',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api().get(`/emergency-contacts/${id}`);
            return response.data; // return the data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // handle error if any
        }
    }
);

/**
 * Update an emergency contact.
 */
export const handleUpdateEmergencyContact = createAsyncThunk(
    'emergencyContact/updateEmergencyContact',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api().post(`/emergency-contacts/${data.get('id')}`, data);
            return response.data; // return the updated data on success
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // handle error if any
        }
    }
);

/**
 * Delete an emergency contact.
 */
export const handleDeleteEmergencyContact = createAsyncThunk(
    'emergencyContact/deleteEmergencyContact',
    async (id: number, { rejectWithValue }) => {
        try {
            await api().delete(`/emergency-contacts/${id}`);
            return id; // return the id of the deleted emergency contact
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // handle error if any
        }
    }
);
