const { Schema, model, Types } = require("mongoose");

const dateFormatter = require()

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username:{
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormatter(createdAtVal),
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
)

const ThoughtSchema = new Schema(
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
        },
        reactions: [{ reactionSchema }]
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thoughts = model("Thoughts", ThoughtSchema);

module.exports = Thoughts;

