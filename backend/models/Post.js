const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    imageUrls: [
      {
        type: String,
      },
    ],
    content: {
      type: String,
      required: true,
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true,
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

module.exports = Post = mongoose.model("posts", PostSchema);
