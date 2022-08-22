const express = require("express");
const { Review } = require("../models/review")
const { isAdmin, isUser, auth } = require("../middleware/auth")

const router = express.Router()

// Create a review
router.post("/:id", auth, async (req, res) => {

    try {
        const exReview = await Review.findOne({ userId: req.user._id, productId: req.params.id });

        if (exReview) return res.status(403).send("Access denied. You already reviewed this product.");

        const review = new Review({
            userId: req.user._id,
            userName: req.user.name,
            productId: req.params.id,
            productName: req.body.productName,
            content: req.body.content,
            classification: req.body.classification,
        })

        const savedReview = await review.save()

        res.status(200).send(savedReview)
            
        } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});

// Edit review
router.put("/edit/:id", auth, async (req, res) => {
        try {
            const review = findById(req.params.id);

            if (review.userId !== req.user._id && !req.user.isAdmin) return res.status(403).send('Access denied.');

            const updatedReview = await Review.findByIdAndUpdate(
                review._id,
                {
                    $set: {
                        ...req.body.review,
                        content: req.body.content,
                        classification: req.body.classification
                    }
                },
                { new: true }
            );
            res.status(200).send(updatedReview);
            } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
});

// Delete a review
router.delete("/delete/:id", auth, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if(!review) return res.status(404).send("Review not found.");

        if(review.userId !== req.user._id && !req.user.isAdmin) return res.status(403).send("Access denied.");

        const deletedReview = await Review.findByIdAndDelete(req.params.id);

        res.status(200).send(deletedReview);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});

// Find specific review by id
router.get("/find/:id", async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        res.status(200).send(review);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

// Get all the reviews
router.get("/", isAdmin, async (req, res) => {
    try {
        const reviews = await Review.find().sort({ 'createdAt': -1 });
        res.status(200).send(reviews)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

// Find all the reviews for a specific product
router.get("/product/:id", async (req, res) => {
    const cursor = req.query.cursor;
    try {
        const reviews = await Review.find().sort({ 'createdAt': -1 }).skip(cursor).limit(20);

        const productReviews = reviews.filter((review) => review.productId === req.params.id)
        res.status(200).send({cursor: cursor * 1 + 20, reviews: productReviews});
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

// Get existing review for specific product and user
router.get("/product-user/:id", auth, async (req, res) => {
    try {
        const review = await Review.findOne({ userId: req.user._id, productId: req.params.id });

        res.status(200).send(review);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

module.exports = router