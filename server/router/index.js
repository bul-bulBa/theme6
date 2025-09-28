const Router = require('express').Router
const employeeController = require('../controller/employee-controller')

const router = new Router

router.get('/getHello', employeeController.hello)
router.get('/employee', employeeController.getEmployees)

router.post('/employee', employeeController.createEmployee)
router.put('/employee/:id', employeeController.changeIncrease)
router.delete('/employee/:id', employeeController.deleteEmployee)

module.exports = router