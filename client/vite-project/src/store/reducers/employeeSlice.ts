import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {stateType} from '../storeConfig'
import {employee} from '../../api'

export type employeeType = {
    id: string,
    name: string,
    salary: number,
    increase: boolean,    
}
export type createEmployeeType = {name: string, salary: string}

export const getThunk = createAsyncThunk<employeeType[], void>(
    'employee/getThunk',
    async () => {
        return await employee.get()
    }
)

export const createThunk = createAsyncThunk<employeeType[], createEmployeeType>(
    'employee/createThunk',
    async (obj) => {
        return await employee.create(obj)
    }
)

export const changeIncreaseThunk = createAsyncThunk<employeeType[], string>(
    'employee/changeIncreaseThunk',
    async (id) => {
        return await employee.changeIncrease(id)
    }
)

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees: null as employeeType[] | null,
        error: null as string | null | undefined
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // create employee
            .addCase(createThunk.fulfilled, (state, action) => {
                state.employees = action.payload
            })
            .addCase(createThunk.rejected, (state, action) => {
                state.error = action.error.message 
            } )
        // get employees
            .addCase(getThunk.fulfilled, (state, action) => {
                state.employees = action.payload
            })
            .addCase(getThunk.rejected, (state, action) => {
                state.error = action.error.message 
            } )
        // change increase
            .addCase(changeIncreaseThunk.fulfilled, (state, action) => {
                state.employees = action.payload
            })
            .addCase(changeIncreaseThunk.rejected, (state, action) => {
                state.error = action.error.message 
            } )
    }
})

export const selectEmployees = (state: stateType) => state.employee.employees

export default employeeSlice.reducer