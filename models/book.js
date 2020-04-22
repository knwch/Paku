const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const bookSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: true
    },
    detail: {
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
            type: Number,
            required: true
        },
        timeout: {
            type: Number,
            required: true
        },
        in: {
            type: String,
            required: true
        },
        out: {
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
            type: Number,
            default: 1
        }
    }, 
    check: {
        checkin: {
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
        checkout: {
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
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('book', bookSchema)