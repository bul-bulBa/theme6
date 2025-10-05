const employeeModel = require('../models/employee-model')
const epmloyeesDto = require('../dto/employees-dto')

class employeeService {

    async getEmployees(name, salary, increase) {
        let query = {}
        console.log('NAME ', name, " SALARY ", salary, " INCREASE ", increase)
        if(name)  query.$text = { $search: name}
        if(Number(salary)) query.salary = { $gte: salary}
        if(increase === 'true') query.increase = true
        console.log('QUERY ', query)
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