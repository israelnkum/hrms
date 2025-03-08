import {createSlice} from '@reduxjs/toolkit';
import {
    handleAddQualification, handleDeleteQualification,
    handleGetAllQualifications,
    handleGetSingleQualification, handleUpdateQualification
} from "../services/qualification.service";
import {QualificationState} from "../types/qualification";

/**
 * Initial state
 */
const initialState: QualificationState = {
    qualifications: {
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
    qualification: { id: 0 },
};

/**
 * Create the qualification slice
 */
const qualificationSlice = createSlice({
    name: "qualification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle the fulfilled case for addQualification
        builder.addCase(handleAddQualification.fulfilled, (state, action) => {
            state.qualifications.data.push(action.payload);
        });

        // Handle the fulfilled case for getQualifications
        builder.addCase(handleGetAllQualifications.fulfilled, (state, action) => {
            state.qualifications = action.payload;
        });

        // Handle the fulfilled case for getSingleQualification
        builder.addCase(handleGetSingleQualification.fulfilled, (state, action) => {
            state.qualification = action.payload;
        });

        // Handle the fulfilled case for updateQualification
        builder.addCase(handleUpdateQualification.fulfilled, (state, action) => {
            state.qualifications.data = state.qualifications.data.map((qualification) =>
                qualification.id === action.payload.id ? action.payload : qualification
            );
        });

        // Handle the fulfilled case for deleteQualification
        builder.addCase(handleDeleteQualification.fulfilled, (state, action) => {
            state.qualifications.data = state.qualifications.data.filter(
                (qualification) => qualification.id !== action.payload
            );
        });
    },
});

export default qualificationSlice.reducer;
