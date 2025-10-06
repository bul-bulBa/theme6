import axios from 'axios'
import type { createEmployeeType, objFromDBType, searchFormType,
    changeIncreaseType, deleteType } from './store/reducers/employeeSlice'

export const EPORT = 'http://localhost:4000/api/employee'
const empRequest = axios.create({
    baseURL: EPORT,
})

export const employee = {
    get(values: searchFormType) {
        return empRequest.get('', { params: {...values}}).then((res): objFromDBType => res.data) 
    },
    create(obj: createEmployeeType) {
        return empRequest.post('', obj)
        .then((res): objFromDBType => res.data)
    },
    delete(values: deleteType) {
        return empRequest.delete(``, {data: values})
        .then((res): objFromDBType => res.data)
    },
    changeIncrease(values: changeIncreaseType) {
        return empRequest.put(``, values)
        .then((res): objFromDBType => res.data)
    }
}