import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        complete: {
            type: Boolean,
            default: false,
        },
        color: {
            type: String,
            default: '#c1bdba'
        },
    },
    { timestamps: true }
);

export const Todo = mongoose.model('Todo', todoSchema);
