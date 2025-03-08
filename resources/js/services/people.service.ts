import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

// Fetch People with Filters
export const fetchPeople = createAsyncThunk(
    "people/fetchPeople",
    async (params: any, { rejectWithValue }) => {
        try {
            const response = await api().get(`/people?${params}`);
            return { people: response.data, filters: Object.fromEntries(params) };
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
