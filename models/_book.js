const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const bookSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    idCar: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    payment: {
        type: String,
        required: true
    },
    post: {
        type: ObjectId,
        ref: 'post'
    },
    user: {
        type: ObjectId,
        ref: 'users'
    },
    renter: {
        type: ObjectId,
        ref: 'users'
    },
    timein: {
        type: String,
        required: true
    },
    timeout: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 1
    }
})

module.exports = mongoose.model('book', bookSchema)