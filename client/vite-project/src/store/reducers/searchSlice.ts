import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {stateType} from '../storeConfig'
import {employee} from '../../api'

export type autoCompleteType = {value: string}

export const autoCompleteThunk = createAsyncThunk(
    'search/autoCompleteThunk',
    async (name: string) => {
        return await employee.autoComplete(name)
    }
)

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchParams: {
            salary: 0,
            increase: false,
            name: ''
        },
        autoCompleteArr: [] as autoCompleteType[]
    },
    reducers: {
        setState(state, action) {
            state.searchParams = action.payload 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(autoCompleteThunk.fulfilled, (state, action) => {
                state.autoCompleteArr = action.payload
            })
    }
})

export const selectSearch = (state: stateType) => state.search.searchParams
export const selectAutoCoplete = (state: stateType) => state.search.autoCompleteArr

export default searchSlice.reducer
export const {setState} = searchSlice.actions