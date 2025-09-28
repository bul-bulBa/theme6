const {Schema, model} = require('mongoose')

const employeeSchema = new Schema({
    name: {type: String, required: true},
    salary: {type: Number, required: true},
    increase: {type: Boolean, default: false}
})

module.exports = model('employee', employeeSchema)