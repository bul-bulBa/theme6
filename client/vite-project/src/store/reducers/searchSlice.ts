import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {stateType} from '../storeConfig'

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        salary: 0,
        increase: false,
        name: ''
    },
    reducers: {
        setState(state, action) {
            state.salary = action.payload.salary,
            state.increase = action.payload.increase,
            state.name = action.payload.name
        }
    }
})

export const selectSearch = (state: stateType) => ({
    salary: state.search.salary,
    increase: state.search.increase,
    name: state.search.name
})

export default searchSlice.reducer
export const {setState} = searchSlice.actions