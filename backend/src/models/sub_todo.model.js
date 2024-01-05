// Note Important!!!!
//I have not used this model but I am looking forward to add it to make it more complex

import mongoose from 'mongoose';

const subTodoSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        complete: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

export const SubTodo = mongoose.model('SubTodo', subTodoSchema);
