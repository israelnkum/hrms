import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../utils/api";
import {completeExport} from "../utils";

/**
 * Async Thunk: Add Contact Detail
 */
export const handleAddContactDetail = createAsyncThunk(
    "contactDetails/addContactDetail",
    async (driver, {rejectWithValue}) => {
        try {
            const response = await api().post("/contact-details", driver);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

/**
 * Async Thunk: Get All Contact Details
 */
export const handleGetAllContactDetails = createAsyncThunk(
    "contactDetails/getContactDetails",
    async (params, {rejectWithValue}) => {
        try {
            const response = await api().get(`/contact-details?${params}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

/**
 * Async Thunk: Export Contact Details
 */
export const handleExportContactDetails = createAsyncThunk(
    "contactDetails/exportContactDetails",
    async (params, {rejectWithValue}) => {
        try {
            const response = await api().get(`/contact-details?${params}`, {
                responseType: "blob",
            });
            completeExport(response.data, "ContactDetails");
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

/**
 * Async Thunk: Get Single Contact Detail
 */
export const handleGetSingleContactDetail = createAsyncThunk(
    "contactDetails/getSingleContactDetail",
    async (id: number, {rejectWithValue}) => {
        try {
            const response = await api().get(`/contact-details/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

/**
 * Async Thunk: Update Contact Detail
 */
export const handleUpdateContactDetail = createAsyncThunk(
    "contactDetails/updateContactDetail",
    async (data: any, {rejectWithValue}) => {
        try {
            const response = await api().post(
                `/contact-details/${data.get("id")}`,
                data,
                {headers: {"Content-type": "multipart/form-data"}}
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

/**
 * Async Thunk: Delete Contact Detail
 */
export const handleDeleteContactDetail = createAsyncThunk(
    "contactDetails/deleteContactDetail",
    async (id, {rejectWithValue}) => {
        try {
            await api().delete(`/contact-details/${id}`);
            return id; // Return the id to be used in reducers
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
