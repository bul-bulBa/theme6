const employeeModel = require('../models/employee-model')
const epmloyeesDto = require('../dto/employees-dto')
const { deleteEmployee } = require('../controller/employee-controller')

class employeeService {

    async getEmployees() {

        const employees = await employeeModel.find({})

        const resultDto = employees.map(e => new epmloyeesDto(e))
        return resultDto
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