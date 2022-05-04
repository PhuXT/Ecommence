require('dotenv').config()
const mongoose = require('mongoose')

module.exports = {
    async connect() {
        try {
            await mongoose.connect(process.env.MONGO_CONNECTION_URL)
            console.log('Connected DB');
        } catch (error) {
            console.log('Connect DB failure');
            console.log(error);
        }
    }
}