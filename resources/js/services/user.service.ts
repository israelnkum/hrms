import { createAsyncThunk } from '@reduxjs/toolkit'
import api from "../utils/api";

    // Async thunk actions
export const fetchAllUsers = createAsyncThunk(
    'user/fetchAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api().get('/users')
            return response.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const addNewUser = createAsyncThunk(
    'user/addNewUser',
    async (values, { rejectWithValue }) => {
        try {
            const response = await api().post('/users', values)
            return response.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const updateUserData = createAsyncThunk(
    'user/updateUserData',
    async (values: any, { rejectWithValue }) => {
        try {
            const response = await api().put(`/users/${values.id}`, values)
            return response.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const removeUser = createAsyncThunk(
    'user/removeUser',
    async (id, { rejectWithValue }) => {
        try {
            await api().delete(`/users/${id}`)
            return id
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const fetchActiveRoles = createAsyncThunk(
    'user/fetchActiveRoles',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await api().get(`user/${id}/roles/active`)
            return response.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const fetchUserRoles = createAsyncThunk(
    'user/fetchUserRoles',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api().get(`/user/${id}/roles`)
            return response.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const addUserRoles = createAsyncThunk(
    'user/addUserRoles',
    async (values, { rejectWithValue }) => {
        try {
            const response = await api().post('/user/roles/add', values)
            return response.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const fetchDashboardData = createAsyncThunk(
    'user/fetchDashboardData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api().get('/dashboard/')
            return response.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const updateRoleActions = createAsyncThunk(
    'user/updateRoleActions',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api().post('/user/roles/actions/', data)
            return response.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message)
        }
    }
)
