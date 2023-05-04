const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    rating: Number,
    comment: String,
    user: { type: String, required: true },
    userID: { type: String, required: true },
    product: { type: String, required: true },
    productID: { type: String, required: true }
})

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = { CommentModel };