import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../utils/api";

/**
 * Async Thunk: Fetch Next of Kin
 */
export const fetchNextOfKin = createAsyncThunk(
    "nextOfKin/fetchNextOfKin",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await api().get(`/next-of-kin/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

/**
 * Async Thunk: Update Next of Kin
 */
export const updateNextOfKin = createAsyncThunk(
    "nextOfKin/updateNextOfKin",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api().post(`/next-of-kin/0`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
