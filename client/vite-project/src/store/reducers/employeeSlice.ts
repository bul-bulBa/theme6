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

export type objFromDBType = {
    employees: employeeType[]
    length: number,
    increaseLength: number
}

export const getThunk = createAsyncThunk<objFromDBType, void>(
    'employee/getThunk',
    async () => {
        return await employee.get()
    }
)

export const createThunk = createAsyncThunk<objFromDBType, createEmployeeType>(
    'employee/createThunk',
    async (obj) => {
        return await employee.create(obj)
    }
)

export const deleteThunk = createAsyncThunk<objFromDBType, string>(
    'employee/deleteThunk',
    async (id) => {
        return await employee.delete(id)
    }
)

export const changeIncreaseThunk = createAsyncThunk<objFromDBType, string>(
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
        length: null as number | null,
        increaseLength: null as number | null,
        error: null as string | null | undefined
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => thunks.some(t => action.type === t.fulfilled.type),
                (state, action) => {
                    state.employees = (action as PayloadAction<objFromDBType>).payload.employees
                    state.length = (action as PayloadAction<objFromDBType>).payload.length
                    state.increaseLength = (action as PayloadAction<objFromDBType>).payload.increaseLength
                }
            )

            // .addMatcher(
            //     (action) => thunks.some(t => action.type === t.rejected.type),
            //     (state, action) => {
            //         state.error = (action as any).error.message
            //     }
            // )
    }
})

export const selectEmployees = (state: stateType) => state.employee.employees
export const selectAllLengths = (state: stateType) => ({
        length: state.employee.length, 
        increaseLength: state.employee.increaseLength})

export default employeeSlice.reducer