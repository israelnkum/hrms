import { createSlice } from '@reduxjs/toolkit';
import { handleAddDependant, handleGetAllDependants, handleGetSingleDependant, handleUpdateDependant, handleDeleteDependant } from '../services/dependant.service';
import {DependantState} from "../types/dependant";

const initialState: DependantState = {
    dependants: {
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
        }
    },
    dependant: {
        id: 0,
        name: ""
    },
};

const dependantsSlice = createSlice({
    name: 'dependants',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle fulfilled case for adding dependant
        builder.addCase(handleAddDependant.fulfilled, (state, action) => {
            state.dependants.data.push(action.payload); // Add new dependant to the list
        });

        // Handle fulfilled case for getting all dependants
        builder.addCase(handleGetAllDependants.fulfilled, (state, action) => {
            state.dependants = action.payload; // Replace the current list with the fetched list
        });

        // Handle fulfilled case for getting a single dependant
        builder.addCase(handleGetSingleDependant.fulfilled, (state, action) => {
            state.dependant = action.payload; // Replace the current dependant with the fetched dependant
        });

        // Handle fulfilled case for updating a dependant
        builder.addCase(handleUpdateDependant.fulfilled, (state, action) => {
            state.dependants.data = state.dependants.data.map((dependant) =>
                dependant.id === action.payload.id ? action.payload : dependant
            ); // Update the dependant in the list
        });

        // Handle fulfilled case for deleting a dependant
        builder.addCase(handleDeleteDependant.fulfilled, (state, action) => {
            state.dependants.data = state.dependants.data.filter(
                (dependant) => dependant.id !== action.payload
            ); // Remove the deleted dependant from the list
        });
    },
});

export default dependantsSlice.reducer;
