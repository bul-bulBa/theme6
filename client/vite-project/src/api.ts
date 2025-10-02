import axios from 'axios'
import type { createEmployeeType, objFromDBType} from './store/reducers/employeeSlice'

export const EPORT = 'http://localhost:4000/api/employee'
const empRequest = axios.create({
    baseURL: EPORT,
})

export const employee = {
    get() {
        return empRequest.get('').then((res): objFromDBType => res.data) 
    },
    create({name, salary}: createEmployeeType) {
        return empRequest.post('', {name, salary})
        .then((res): objFromDBType => res.data)
    },
    delete(id: string) {
        return empRequest.delete(`/${id}`)
        .then((res): objFromDBType => res.data)
    },
    changeIncrease(id: string) {
        return empRequest.put(`/${id}`)
        .then((res): objFromDBType => res.data)
    }
}