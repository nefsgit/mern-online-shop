const express = require("express");
const { Category } = require("../models/category");
const { isAdmin } = require("../middleware/auth");

const router = express.Router();

// Create a category
router.post("/", isAdmin, async (req, res) => {
    // Name sent from the frontend
    const name = req.body.name;

    // Check if there's a category with this name
    let exCategory = await Category.findOne({name: name});

    /* If there is one, return a response saying so. The response display is
    handled in the redux slice in the frontend */
    if(exCategory) return res.status(400).send("This category already exists.");

    // Success / Failure responses
    try {
        const category = new Category({
            name,
        })

        const savedCategory = await category.save()

        res.status(200).send(savedCategory)
            
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});

// Edit category
router.put("/edit/:id", isAdmin, async (req, res) => {
        try {
            const updatedCategory = await Category.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body.category,
                },
                { new: true }
            );
            res.status(200).send(updatedCategory);
            } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
});

// Delete category
router.delete("/delete/:id", isAdmin, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if(!category) return res.status(404).send("Category not found.");

        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        res.status(200).send(deletedCategory);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});

// Find category by id
router.get("/find/:id", isAdmin, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).send(category);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

// Find all the categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find().sort({ 'name': 1 });
        res.status(200).send(categories)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

module.exports = router