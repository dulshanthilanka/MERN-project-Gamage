const mongoose = require('mongoose')

const DataShema = new mongoose.Schema({
    id: String,
    name: String,
    age: Number,
    status: String,
    image: String
})

const DataModel = mongoose.model("data", DataShema)
module.exports = DataModel