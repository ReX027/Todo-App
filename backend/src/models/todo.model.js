import mongoose from "mongoose";
import { User } from "./user.model.js";

const todoSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#c1bdba",
    },
  },
  { timestamps: true }
);

todoSchema.post("save", async function (doc) {
  // Find the associated company
  console.log(doc.createdBy);
  const user = await User.findById(doc.createdBy);
  if (!user) {
    // Handle error if company is not found
    return;
  }

  // Check if the recruiter is already in the company's recruiters array
  if (!user.myTodos.includes(doc._id)) {
    // If not, add the recruiter's ID to the recruiters array
    user.myTodos.push(doc._id);
    await user.save();
  }
});

todoSchema.pre(
  "remove",
  { document: true, query: false },
  async function (next) {
    try {
      const user = await User.findById(this.createdBy);

      console.log("user", user);
      if (user) {
        // Remove the todo's ID from the user's myTodos array
        user.myTodos.pull(this._id);
        await user.save();
      }

      next();
    } catch (error) {
      next(error);
    }
  }
);
export const Todo = mongoose.model("Todo", todoSchema);
