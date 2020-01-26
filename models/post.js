// load the things we need
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    photo: [{
        data: Buffer,
        contentType: String
    }],
    detail: {
        point: {
            type: String,
            required: true
        },
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

    },
    explanation: {
        about: {
            type: String,
            required: true
        },
        rule: [{
            text: {
                type: String,
            }
        }],
        nearby: [{
            text: {
                type: String,
            }
        }],
        facility: [{
            text: {
                type: String,
            }
        }]
    },
    date: {
        open: {
            type: String,
            required: true
        },
        off: {
            type: String,
            required: true
        }
    },
    postedBy: {
        type: ObjectId,
        ref: 'User'
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
        text: String,
        created: {
            type: Date,
            default: Date.now
        },
        postedBy: {
            type: ObjectId,
            ref: 'User'
        }
    }],
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);
