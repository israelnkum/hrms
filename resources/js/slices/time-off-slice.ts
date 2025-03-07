import { createSlice } from '@reduxjs/toolkit';
import {
    handleRequestTimeOff,
    handleGetHolidays,
    handleGetLeaveTypes,
    handleGetLeaveRequest,
    handleGetTimeOff,
    handleChangeLeaveRequestStatus
} from '../services/time-off.service';

const initialState = {
    holidays: [],
    leaveTypes: [],
    leaveRequest: {},
    leaveRequests: {
        data: [],
        meta: {},
    },
    filter: {
        status: 'Pending',
    },
};

const timeOffSlice = createSlice({
    name: 'timeOff',
    initialState,
    reducers: {
        // Sync reducers
        addTimeOffFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Handle fulfilled case for requesting time off
        builder.addCase(handleRequestTimeOff.fulfilled, (state, action) => {
            state.leaveRequests.data.push(action.payload); // Add the new leave request to the list
        });

        // Handle fulfilled case for getting holidays
        builder.addCase(handleGetHolidays.fulfilled, (state, action) => {
            state.holidays = action.payload; // Set the holidays data
        });

        // Handle fulfilled case for getting leave types
        builder.addCase(handleGetLeaveTypes.fulfilled, (state, action) => {
            state.leaveTypes = action.payload; // Set the leave types data
        });

        // Handle fulfilled case for getting leave requests
        builder.addCase(handleGetLeaveRequest.fulfilled, (state, action) => {
            state.leaveRequests = action.payload; // Replace the leave requests data with the new data
        });

        // Handle fulfilled case for getting a single time off request
        builder.addCase(handleGetTimeOff.fulfilled, (state, action) => {
            state.leaveRequest = action.payload; // Set the single leave request data
        });

        // Handle fulfilled case for changing leave request status
        builder.addCase(handleChangeLeaveRequestStatus.fulfilled, (state, action) => {
            state.leaveRequests.data = state.leaveRequests.data.map((leave) =>
                leave.id === action.payload.id ? action.payload : leave
            ); // Update the status of the leave request in the list
        });
    },
});

export const { addTimeOffFilter } = timeOffSlice.actions;

export default timeOffSlice.reducer;
