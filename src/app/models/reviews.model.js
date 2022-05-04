const mongoose = require('mongoose');
const schema = mongoose.Schema

const reviewModel = new schema({
    email: {type: String, maxLength: 255, require},
    rating: {type: String, maxLength: 255, require},
    productID: {type: String, maxLength: 255, require},
    reviewContent: {type: String, maxLength: 255, require},
    reviewTitle: {type: String, maxLength: 255, require},
})
module.exports = mongoose.model('reviews', reviewModel)
