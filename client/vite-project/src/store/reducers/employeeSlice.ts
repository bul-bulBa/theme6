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

export const deleteThunk = createAsyncThunk<employeeType[], string>(
    'employee/deleteThunk',
    async (id) => {
        return await employee.delete(id)
    }
)

export const changeIncreaseThunk = createAsyncThunk<employeeType[], string>(
    'employee/changeIncreaseThunk',
    async (id) => {
        return await employee.changeIncrease(id)
    }
)

const thunks = [getThunk, createThunk, deleteThunk, changeIncreaseThunk]

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees: null as employeeType[] | null,
        error: null as string | null | undefined
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => thunks.some(t => action.type === t.fulfilled.type),
                (state, action) => {
                    state.employees = (action as PayloadAction<employeeType[]>).payload
                }
            )

            .addMatcher(
                (action) => thunks.some(t => action.type === t.rejected.type),
                (state, action) => {
                    state.employees = (action as any).error.message
                }
            )
    }
})

export const selectEmployees = (state: stateType) => state.employee.employees

export default employeeSlice.reducer