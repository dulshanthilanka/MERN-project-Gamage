const mongoose = require('mongoose')

const EmployeeShema = new mongoose.Schema({
    email: String,
    password: String
})

const EmployeeModel = mongoose.model("employees", EmployeeShema)
module.exports = EmployeeModel
