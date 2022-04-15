const mongoose = require('mongoose')
const Schema = mongoose.Schema

const author = new Schema({
    noti_id:{ type: String,},
    name:{  type: String,},
    age: { type: String, },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})


module.exports = mongoose.model('Author', author)