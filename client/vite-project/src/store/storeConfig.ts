import {configureStore, combineReducers} from '@reduxjs/toolkit'
import { useDispatch, useSelector} from 'react-redux'
import type {TypedUseSelectorHook} from 'react-redux'
import employeeReducer from './reducers/employeeSlice'
import selectReducer from './reducers/searchSlice'

const rootReducer = combineReducers({
    employee: employeeReducer,
    search: selectReducer
})
export type stateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<stateType> = useSelector

const store = configureStore({
    reducer: rootReducer
})
type appDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<appDispatch>()

export default store