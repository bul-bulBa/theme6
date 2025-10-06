const employeeModel = require('../models/employee-model')
const epmloyeesDto = require('../dto/employees-dto')

class employeeService {

    async getEmployees({name, salary, increase, page}) {
        let query = {}
        const limit = Number(process.env.limit)

        if(name)  query.$text = { $search: name}
        if(Number(salary)) query.salary = { $gte: salary}
        if(String(increase) === 'true') query.increase = true

        const employees = await employeeModel.find(query).skip((page - 1 ) * limit).limit(limit)
        const length = await employeeModel.countDocuments({})
        const increaseLength = await employeeModel.countDocuments({increase: true})
        const pages = await employeeModel.countDocuments(query)
        const allPages = Math.ceil(pages / limit) 

        const resultDto = employees.map(e => new epmloyeesDto(e))
        return {employees: resultDto, length, increaseLength, allPages}
    }

    async createEmployee(name, salary) {
        await employeeModel.create({name, salary})
    }

    async deleteEmployee(id) {
        await employeeModel.findByIdAndDelete(id)
    }
    
    async changeIncrease(id) {
        const employee = await employeeModel.findOne({_id: id})
        if(!employee) return new Error("такого користувача не існує")

        employee.increase = !employee.increase
        await employee.save()
    }
}

module.exports = new employeeService