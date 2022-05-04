const mongoose = require('mongoose');
const schema = mongoose.Schema

const sellerShema = new schema(
    {
        bussinessName: {type: String, require, maxLength: 255},
        numberContact: {type: String, require, maxLength: 255},
        address: {type: String, require, maxLength: 255},
        about: {type: String, require, maxLength: 255},
        email: {type: String, require, maxLength: 255},
    }, {timestamps: true}
)
module.exports = mongoose.model('sellers', sellerShema)
