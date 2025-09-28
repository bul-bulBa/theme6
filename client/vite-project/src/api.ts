import axios from 'axios'
import type {employeeType, createEmployeeType} from './store/reducers/employeeSlice'

export const EPORT = 'http://localhost:4000/api/employee'
const empRequest = axios.create({
    baseURL: EPORT,
})

export const employee = {
    get() {
        return empRequest.get('').then((res): employeeType[] => res.data) 
    },
    create({name, salary}: createEmployeeType) {
        return empRequest.post('', {name, salary})
        .then((res): employeeType[] => res.data)
    },
    changeIncrease(id: string) {
        return empRequest.put(`/${id}`)
        .then((res): employeeType[] => res.data)
    }
}