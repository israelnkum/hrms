import { createSlice } from '@reduxjs/toolkit';
import {
    handleAddCommunityService,
    handleGetAllCommunityServices,
    handleExportCommunityServices,
    handleGetSingleCommunityService,
    handleUpdateCommunityService,
    handleDeleteCommunityService
} from '../services/community-service.service';

const initialState = {
    communityServices: {
        data: [],
        meta: {},
    },
    filter: {},
    communityService: {},
};

const communityServiceSlice = createSlice({
    name: 'communityServices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle fulfilled case for adding a community service
        builder.addCase(handleAddCommunityService.fulfilled, (state, action) => {
            state.communityServices.data.push(action.payload); // Add new service to the list
        });

        // Handle fulfilled case for getting all community services
        builder.addCase(handleGetAllCommunityServices.fulfilled, (state, action) => {
            state.communityServices = action.payload; // Replace the current list with the fetched list
        });

        // Handle fulfilled case for exporting community services
        builder.addCase(handleExportCommunityServices.fulfilled, (state, action) => {
            // No state update required for export, as it's just a file download
        });

        // Handle fulfilled case for getting a single community service
        builder.addCase(handleGetSingleCommunityService.fulfilled, (state, action) => {
            state.communityService = action.payload; // Replace the current service with the fetched one
        });

        // Handle fulfilled case for updating a community service
        builder.addCase(handleUpdateCommunityService.fulfilled, (state, action) => {
            state.communityServices.data = state.communityServices.data.map((service) =>
                service.id === action.payload.id ? action.payload : service
            ); // Update the service in the list
        });

        // Handle fulfilled case for deleting a community service
        builder.addCase(handleDeleteCommunityService.fulfilled, (state, action) => {
            state.communityServices.data = state.communityServices.data.filter(
                (service) => service.id !== action.payload
            ); // Remove the deleted service from the list
        });
    },
});

export default communityServiceSlice.reducer;
