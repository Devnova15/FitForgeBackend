const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false },
);

module.exports = Comment = mongoose.model("comments", CommentSchema);
