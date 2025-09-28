const employeeService = require('../service/employee-service')

class employeeController {
    async hello(req, res) {
        try {

            res.json({message: "hello"})
        }catch(e) {
            console.log("ERROR", e)
            res.json({error: e})
        }
    }
    async getEmployees(req, res) {
        try {

            const employees = await employeeService.getEmployees()

            res.json(employees)
        }catch(e) {
            console.log("ERROR", e)
            res.json({error: e})
        }
    }
    async createEmployee(req, res) {
        try {
            const {name, salary} = req.body 

            await employeeService.createEmployee(name, salary)
            const employees = await employeeService.getEmployees()

            res.json(employees)
        }catch(e) {
            console.log("ERROR", e)
            res.json({error: e})
        }
    }
    async deleteEmployee(req,res) {
        try{
            const {id} = req.params

            await employeeService.deleteEmployee(id)
            const employees = await employeeService.getEmployees()

            res.json(employees)
        }catch(e) {
            console.log("ERROR", e)
            res.json({error: e})
        }
    }
    async changeIncrease(req, res) {
        try{
            const {id} = req.params

            await employeeService.changeIncrease(id)
            const employees = await employeeService.getEmployees()

            res.json(employees)
        }catch(e) {
            console.log("ERROR", e)
            res.json({error: e})
        }
    }
}

module.exports = new employeeController