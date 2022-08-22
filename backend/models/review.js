const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    userName: {type: String, required: true},
    productId: {type: String, required: true},
    productName: {type: String, required: true},
    content: {type: String, required: true},
    classification: {type: Number, require: true},
    },
    {timestamps: true}
);

const Review = mongoose.model("Review", reviewSchema);

exports.Review = Review;