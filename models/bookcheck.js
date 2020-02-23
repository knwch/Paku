const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const checkSchema = new mongoose.Schema({
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
    checkIn: {
        status: {
            type: Boolean,
            default: false
        },
        match: {
            type: Number,
            default: 0
        }
    },
    checkOut: {
        status: {
            type: Boolean,
            default: false
        },
        match: {
            type: Number,
            default: 0
        }
    }
});

module.exports = mongoose.model('check', checkSchema);
