import {createAsyncThunk} from '@reduxjs/toolkit';
import api from "../utils/api";
import {completeExport} from "../utils";

/**
 * Async Thunks
 */

/**
 * Add a qualification.
 */
export const handleAddQualification = createAsyncThunk(
    "qualification/addQualification",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api().post("/qualifications", data);
            return response.data; // return the data on successful response
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // return error if any
        }
    }
);

/**
 * Get all qualifications.
 */
export const handleGetAllQualifications = createAsyncThunk(
    "qualification/getQualifications",
    async (params, { rejectWithValue }) => {
        try {
            const response = await api().get(`/qualifications?${params}`);
            return response.data; // return the data on successful response
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // return error if any
        }
    }
);

/**
 * Export qualifications.
 */
export const handleExportQualifications = createAsyncThunk(
    "qualification/exportQualifications",
    async (params, { rejectWithValue }) => {
        try {
            const response = await api().get(`/qualifications?${params}`, {
                responseType: "blob",
            });
            completeExport(response.data, "Qualifications");
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // return error if any
        }
    }
);

/**
 * Get a single qualification.
 */
export const handleGetSingleQualification = createAsyncThunk(
    "qualification/getSingleQualification",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await api().get(`/qualifications/${id}`);
            return response.data; // return the data on successful response
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // return error if any
        }
    }
);

/**
 * Update a qualification.
 */
export const handleUpdateQualification = createAsyncThunk(
    "qualification/updateQualification",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api().post(`/qualifications/${data.get("id")}`, data, {
                headers: { "Content-type": "multipart/form-data" },
            });
            return response.data; // return the data on successful response
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // return error if any
        }
    }
);

/**
 * Delete a qualification.
 */
export const handleDeleteQualification = createAsyncThunk(
    "qualification/deleteQualification",
    async (id, { rejectWithValue }) => {
        try {
            await api().delete(`/qualifications/${id}`);
            return id; // Return the id that was deleted
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message); // return error if any
        }
    }
);
