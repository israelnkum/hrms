import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    people: {
        data: [],
        meta: {}
    },
    filter: {
        department_id: 'all',
        rank_id: 'all',
        educational_level_id: 'all',
        job_category_id: 'all'
    }
}

const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
        getPeople: (state, action) => {
            state.people = action.payload
        },
    },
})

export const { getPeople } = peopleSlice.actions

export default peopleSlice.reducer
