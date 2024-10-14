const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AwardSchema = new Schema(
  {
    imageUrl: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false },
);

AwardSchema.index({ "$**": "text" });

module.exports = Award = mongoose.model("awards", AwardSchema);
