// load the things we need
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    // photos: [{
    //     type: String,
    //     required: true
    // }],
    detail: {
        typeofpark: {
            type: String,
            required: true
        },
        numberofcar: {
            type: Number,
            min: 1,
            required: true
        },
        typeofcar: {
            type: String,
            required: true
        },
        explain: {
            type: String,
            required: true
        },
        rule: {
            type: [String],
            default: undefined
        },
        nearby: {
            type: [String],
            default: undefined
        },
        facility: {
            type: [String],
            default: undefined
        }
    },
    location: {
        address: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        },
        latitude: {
            type: String,
            required: true
        }
    },
    date: {
        open: {
            type: String,
            required: true
        },
        close: {
            type: String,
            required: true
        }
    },
    user: {
        type: ObjectId,
        ref: 'users'
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    rate: {
        type: Number,
        default: 0
    },
    comments: [{
        comment: String,
        created: {
            type: Date,
            default: Date.now
        },
        postedBy: {
            type: ObjectId,
            ref: 'users'
        }
    }],
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('post', postSchema);
