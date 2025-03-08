import { createSlice } from "@reduxjs/toolkit";
import { fetchPeople } from "../services/people.service";
import {PeopleState} from "../types/people";

const initialState: PeopleState = {
    people: {
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
    person: {
        id: 0,
        name: "",
    },
    filter: undefined
};

const peopleSlice = createSlice({
    name: "people",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPeople.fulfilled, (state, action) => {
                state.people = action.payload.people;
                state.filter = action.payload.filters;
            });
    },
});

export default peopleSlice.reducer;
