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
        user: {
            type: Boolean,
            default: false
        },
        renter: {
            type: Boolean,
            default: false
        }
    },
    checkOut: {
        status: {
            type: Boolean,
            default: false
        },
        user: {
            type: Boolean,
            default: false
        },
        renter: {
            type: Boolean,
            default: false
        }
    }
});

module.exports = mongoose.model('check', checkSchema);
