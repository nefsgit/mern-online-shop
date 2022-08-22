const express = require("express");
const { Subcategory } = require("../models/subcategory")
const { isAdmin } = require("../middleware/auth")

const router = express.Router()

// Create a subcategory
router.post("/", isAdmin, async (req, res) => {
    const name = req.body.name;

    let exSubcategory = await Subcategory.findOne({name: name});

    if(exSubcategory) return res.status(400).send("This subcategory already exists.");

    try {
        const subcategory = new Subcategory({
            name,
        })

        const savedSubcategory = await subcategory.save()

        res.status(200).send(savedSubcategory)
            
        } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});

// Edit a subcategory
router.put("/edit/:id", isAdmin, async (req, res) => {
        try {
            const updatedSubcategory = await Subcategory.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body.subcategory,
                },
                { new: true }
            );
            res.status(200).send(updatedSubcategory);
            } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
});

// Delete a subcategory
router.delete("/delete/:id", isAdmin, async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id);

        if(!subcategory) return res.status(404).send("Subcategory not found.");

        const deletedSubcategory = await Subcategory.findByIdAndDelete(req.params.id);

        res.status(200).send(deletedSubcategory);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});

// Find a subcategory by id
router.get("/find/:id", isAdmin, async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id);
        res.status(200).send(subcategory);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

// Get all the subcategories
router.get("/", async (req, res) => {
    try {
        const subcategories = await Subcategory.find().sort({ 'name': 1 });
        res.status(200).send(subcategories)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

module.exports = router