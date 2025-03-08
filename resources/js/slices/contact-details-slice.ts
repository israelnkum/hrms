import {createSlice} from "@reduxjs/toolkit";
import {
    handleAddContactDetail,
    handleDeleteContactDetail,
    handleGetAllContactDetails,
    handleGetSingleContactDetail,
    handleUpdateContactDetail
} from "../services/contact-details.service";
import {ContactDetailState} from "../types/contact-detail";

/**
 * Initial State
 */
const initialState: ContactDetailState = {
    contactDetails: {
        data: [],
        meta: {
            pageCount: 0,
            currentPage: 0,
            total: 0,
            from: 0,
            links: {
                first: "",
                last: "",
                next: null,
                prev: null
            }
        },
    },
    contactDetail: {
        id: 0
    }
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
