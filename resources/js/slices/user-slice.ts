import {createSlice} from '@reduxjs/toolkit'
import {
    addNewUser,
    fetchActiveRoles,
    fetchAllUsers,
    fetchDashboardData,
    fetchUserRoles,
    removeUser,
    updateUserData
} from "../services/user.service";
import {Role} from "../types/common";

interface User {
    id: number;
    [key: string]: any;
}

interface DashboardData {
    [key: string]: any;
}

interface UserState {
    users: User[];
    newUser: Partial<User>;
    userData: Partial<User>;
    userDetail: Partial<User>;
    userRoles: Role[];
    permissions: string[];
    loggedInUser: Partial<User>;
    activeRoles: Role[];
    otherRoles: Role[];
    dashboardData: DashboardData;
    serverTime: number | null;
}

const initialState: UserState = {
    users: [],
    newUser: {},
    userData: {},
    userDetail: {},
    userRoles: [],
    permissions: [],
    loggedInUser: {},
    activeRoles: [],
    otherRoles: [],
    dashboardData: {},
    serverTime: null
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserDetail: (state, action) => {
            state.userDetail = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.users.push(action.payload)
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.users = state.users.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                )
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user: any) => user.id !== action.payload)
            })
            .addCase(fetchActiveRoles.fulfilled, (state, action) => {
                state.loggedInUser = {
                    ...action.payload.user,
                    employee_id: action.payload.employee_id
                }
                state.activeRoles = action.payload.roles
                state.permissions = action.payload.permissions
            })
            .addCase(fetchUserRoles.fulfilled, (state, action) => {
                state.userRoles = action.payload[0]
                state.otherRoles = action.payload[1]
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.dashboardData = action.payload
            })
    }
})

export const { getUserDetail } = userSlice.actions

export default userSlice.reducer
