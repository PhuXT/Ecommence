const mongoose = require('mongoose');
const schema = mongoose.Schema

const userSchema = new schema({
    fullName: {type: String, required: true, maxLength: 255},
    email: {type: String, required: true, maxLength: 255},
    password: {type: String, required: true, maxLength: 255},
    phone: {type: String, required: true, maxLength: 255},  
    isSeller:{type: Boolean, required: true}
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema)
