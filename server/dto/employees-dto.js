
module.exports = class epmloyeesDto {
    constructor(module) {
        this.id = module._id.toString(),
        this.name = module.name,
        this.salary = module.salary,
        this.increase = module.increase
    }

}