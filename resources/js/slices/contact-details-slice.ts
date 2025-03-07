import {createSlice} from "@reduxjs/toolkit";
import {
    handleAddContactDetail,
    handleDeleteContactDetail,
    handleGetAllContactDetails,
    handleGetSingleContactDetail,
    handleUpdateContactDetail
} from "../services/contact-details.service";

/**
 * Initial State
 */
const initialState = {
    contactDetails: {
        data: [],
        meta: {},
    },
    filter: {},
    contactDetail: {},
    error: null,
};

/**
 * Redux Slice
 */
const contactDetailsSlice = createSlice({
    name: "contactDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(handleAddContactDetail.fulfilled, (state, action) => {
                state.contactDetails.data.push(action.payload);
            })
            .addCase(handleGetAllContactDetails.fulfilled, (state, action) => {
                state.contactDetails = action.payload;
            })
            .addCase(handleGetSingleContactDetail.fulfilled, (state, action) => {
                state.contactDetail = action.payload;
            })
            .addCase(handleUpdateContactDetail.fulfilled, (state, action) => {
                state.contactDetail = action.payload;
                state.contactDetails.data = state.contactDetails.data.map(
                    (contactDetail) =>
                        contactDetail.id === action.payload.id ? action.payload : contactDetail
                );
            })
            .addCase(handleDeleteContactDetail.fulfilled, (state, action) => {
                state.contactDetails.data = state.contactDetails.data.filter(
                    (contactDetail) => contactDetail.id !== action.payload
                );
            });
    },
});

export default contactDetailsSlice.reducer;
