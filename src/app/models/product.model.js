const mongoose = require('mongoose');
const schema = mongoose.Schema

const productSchema = new schema({
    seller: { type:String, require, maxLength: 255},
    nameProduct: { type:String, require, maxLength: 255},
    shortDescription: { type:String, require, maxLength: 255},
    description: { type:String, require, maxLength: 255},
    price: { type: Number, require, maxLength: 255},
    tags: { type:String, require, maxLength: 255},
    img: {type:String, require, maxLength: 255},
    everageRating: {type:Number, require, maxLength: 255, default: 5},
    countRating: {type:Number, require, maxLength: 255, default:0}

}, {timestamps: true})

module.exports = mongoose.model('products', productSchema)
