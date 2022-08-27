const { Schema, model } = require("mongoose");

const dateFormatter = require()

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: (createdAtVal)=> dateFormatter(createdAtVal),
        },
        username: {
            type: String,
            required: true
        }
    }
)