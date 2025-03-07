import {createSlice} from '@reduxjs/toolkit';
import {
    handleGetCommonData,
    handleGetPendingActions,
    handleGetMyTeam,
    handleGetWhoIsOut,
    handleGetAllPermissions,
    handleAssignPermissions
} from '../services/common.service';
import {CommonState} from "../types/common";

const initialState: CommonState = {
    commons: {
        ranks: [],
        departments: []
    },
    pendingActions: {},
    teamMembers: [],
    whoIsOut: [],
    userPermissions: []
};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        changeLeaveStatus: (state, action) => {
            state.pendingActions.leaveRequest = state.pendingActions.leaveRequest.filter(
                (leave) => leave.id !== action.payload.id
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleGetCommonData.fulfilled, (state, action) => {
                state.commons = action.payload;
            })
            .addCase(handleGetPendingActions.fulfilled, (state, action) => {
                state.pendingActions = action.payload;
            })
            .addCase(handleGetMyTeam.fulfilled, (state, action) => {
                state.teamMembers = action.payload;
            })
            .addCase(handleGetWhoIsOut.fulfilled, (state, action) => {
                state.whoIsOut = action.payload;
            })
            .addCase(handleGetAllPermissions.fulfilled, (state, action) => {
                state.userPermissions = action.payload.userPermissions;
            })
            .addCase(handleAssignPermissions.fulfilled, (state, action) => {
                // Assuming action.payload contains the updated employee data
                state.teamMembers = state.teamMembers.map(member =>
                    member.id === action.payload.id ? action.payload : member
                );
            });
    }
});

export const {changeLeaveStatus} = commonSlice.actions;
export default commonSlice.reducer;
