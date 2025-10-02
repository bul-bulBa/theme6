const employeeModel = require('../models/employee-model')
const epmloyeesDto = require('../dto/employees-dto')

class employeeService {

    async getEmployees(increase, salary, name) {
        let query = {}

        if(name)  query.$text = { $search: name}
        if(salary) query.salary = { $gte: salary}
        if(increase) query.increase = true

        const employees = await employeeModel.find(query)
        const length = await employeeModel.countDocuments({})
        const increaseLength = await employeeModel.countDocuments({increase: true})

        const resultDto = employees.map(e => new epmloyeesDto(e))
        return {employees: resultDto, length, increaseLength}
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