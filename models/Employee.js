const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: String,
    savedorders:[{type: mongoose.Schema.Types.ObjectId,ref:"order"}],
})

const EmployeeModel = mongoose.model("employee",EmployeeSchema)
module.exports = EmployeeModel