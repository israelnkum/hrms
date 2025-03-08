import {createAsyncThunk} from '@reduxjs/toolkit'
import api from "../utils/api"

// Async thunk actions
export const fetchEmployees = createAsyncThunk(
    'employee/fetchEmployees',
    async (filters: URLSearchParams, { rejectWithValue }) => {
        try {
            const response = await api().get('/employees', { params: filters })
            return response.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

// Async thunk actions
export const getAllPeople = createAsyncThunk(
    'employee/getAllPeople',
    async (filters: URLSearchParams, { rejectWithValue }) => {
        try {
            const response = await api().get(`/people`, { params: filters })
            return response.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const fetchEmployee = createAsyncThunk(
    'employee/fetchEmployee',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await api().get(`/employees/${id}`)
            return response.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const addEmployee = createAsyncThunk(
    'employee/addEmployee',
    async (values, { rejectWithValue }) => {
        try {
            const response = await api().post('/employees', values)
            return response.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const updateEmployee = createAsyncThunk(
    'employee/updateEmployee',
    async (values: any, { rejectWithValue }) => {
        try {
            const response = await api().put(`/employees/${values.get('id')}`, values)
            return response.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const removeEmployee = createAsyncThunk(
    'employee/removeEmployee',
    async (id: number, { rejectWithValue }) => {
        try {
            await api().delete(`/employees/${id}`)
            return id
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const fetchEmployeesByFilter = createAsyncThunk(
    'employee/fetchEmployeesByFilter',
    async (filter, { rejectWithValue }) => {
        try {
            const response = await api().get('/employees', { params: filter })
            return response.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)
