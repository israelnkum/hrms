import {createSlice} from "@reduxjs/toolkit";
import {fetchNextOfKin, updateNextOfKin} from "../services/next-of-kin.service";

/**
 * Initial State
 */
const initialState = {
    nextOfKin: {},
    error: null,
};

/**
 * Redux Slice
 */
const nextOfKinSlice = createSlice({
    name: "nextOfKin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNextOfKin.fulfilled, (state, action) => {
                state.nextOfKin = action.payload;
            })
            .addCase(updateNextOfKin.fulfilled, (state, action) => {
                state.nextOfKin = action.payload;
            });
    },
});

export default nextOfKinSlice.reducer;
