// load the things we need
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    photo: [{
        data: Buffer,
        contentType: String
    }],
    detail: {
        point: {
            type: String,
            trim: true,
            required: true
        },
        typeofpark: {
            type: String,
            required: true
        },
        numberofcar: {
            type: Number,
            min: 1,
            trim: true,
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
                trim: true
            }
        }],
        nearby: [{
            text: {
                type: String,
                trim: true
            }
        }],
        facility: [{
            text: {
                type: String,
                trim: true
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
