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

export type objFromDBType = {
    employees: employeeType[]
    length: number,
    increaseLength: number,
    allPages: number
}

export type searchFormType = {
    name: string,
    salary: number,
    increase: boolean,
    page: number
}
export type createEmployeeType = {name: string, salary: string, searchForm: searchFormType}

export const getThunk = createAsyncThunk<objFromDBType, searchFormType>(
    'employee/getThunk',
    async (values) => {
        return await employee.get(values)
    }
)

export const createThunk = createAsyncThunk<objFromDBType, createEmployeeType>(
    'employee/createThunk',
    async (obj) => {
        return await employee.create(obj)
    }
)

export type deleteType = {id: string, searchForm: searchFormType}
export const deleteThunk = createAsyncThunk<objFromDBType, deleteType>(
    'employee/deleteThunk',
    async (values) => {
        return await employee.delete(values)
    }
)

export type changeIncreaseType = {id: string, searchForm: searchFormType}
export const changeIncreaseThunk = createAsyncThunk<objFromDBType, changeIncreaseType>(
    'employee/changeIncreaseThunk',
    async (values) => {
        return await employee.changeIncrease(values)
    }
)

const thunks = [getThunk, createThunk, deleteThunk, changeIncreaseThunk]

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees: null as employeeType[] | null,
        length: 0,
        increaseLength: 0,
        currentPage: 1,
        allPages: 1,
        error: null as string | null | undefined
    },
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => thunks.some(t => action.type === t.fulfilled.type),
                (state, action) => {
                    state.employees = (action as PayloadAction<objFromDBType>).payload.employees
                    state.length = (action as PayloadAction<objFromDBType>).payload.length
                    state.increaseLength = (action as PayloadAction<objFromDBType>).payload.increaseLength
                    state.allPages = (action as PayloadAction<objFromDBType>).payload.allPages
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
export const selectPages = (state: stateType) => ({
    currentPage: state.employee.currentPage,
    allPages: state.employee.allPages
})

export default employeeSlice.reducer
export const { setPage } = employeeSlice.actions