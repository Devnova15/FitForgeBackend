const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AwardSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        type: { type: String, required: true },
        threshold: { type: Number, required: true },
        icon: { type: String },
        imageUrl: { type: String },
        content: { type: String, required: true },
        color: { type: String },
        date: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

AwardSchema.index({ "$**": "text" });

module.exports = mongoose.model("Award", AwardSchema);
