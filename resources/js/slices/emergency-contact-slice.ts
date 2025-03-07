import {
    handleAddEmergencyContact, handleDeleteEmergencyContact,
    handleGetAllEmergencyContacts,
    handleGetSingleEmergencyContact,
    handleUpdateEmergencyContact
} from "../services/emergency-contact.service";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    emergencyContacts: {
        data: [],
        meta: {},
    },
    filter: {},
    emergencyContact: {},
};

const emergencyContactSlice = createSlice({
    name: 'emergencyContact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle fulfilled case for adding emergency contact
        builder.addCase(handleAddEmergencyContact.fulfilled, (state, action) => {
            state.emergencyContacts.data.push(action.payload);
        });

        // Handle fulfilled case for getting all emergency contacts
        builder.addCase(handleGetAllEmergencyContacts.fulfilled, (state, action) => {
            state.emergencyContacts = action.payload;
        });

        // Handle fulfilled case for getting a single emergency contact
        builder.addCase(handleGetSingleEmergencyContact.fulfilled, (state, action) => {
            state.emergencyContact = action.payload;
        });

        // Handle fulfilled case for updating an emergency contact
        builder.addCase(handleUpdateEmergencyContact.fulfilled, (state, action) => {
            state.emergencyContacts.data = state.emergencyContacts.data.map((contact) =>
                contact.id === action.payload.id ? action.payload : contact
            );
        });

        // Handle fulfilled case for deleting an emergency contact
        builder.addCase(handleDeleteEmergencyContact.fulfilled, (state, action) => {
            state.emergencyContacts.data = state.emergencyContacts.data.filter(
                (contact) => contact.id !== action.payload
            );
        });
    },
});

export default emergencyContactSlice.reducer;
