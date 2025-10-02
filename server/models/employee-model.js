const {Schema, model} = require('mongoose')

const employeeSchema = new Schema({
    name: {type: String, required: true},
    salary: {type: Number, required: true},
    increase: {type: Boolean, default: false}
})

employeeSchema.index({name: 'text'})
employeeSchema.index({salary: 1})
employeeSchema.index( 
    {increase: 1},
    {partialFilterExpression: {promotion: true}}
)

module.exports = model('employee', employeeSchema)