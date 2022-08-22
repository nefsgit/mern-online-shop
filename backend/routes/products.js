const express = require("express");
const { Product } = require("../models/product")
const { Review } = require("../models/review")
const cloudinary = require("../utils/cloudinary")
const { isAdmin } = require("../middleware/auth");

const router = express.Router()

// Create

router.post("/", isAdmin, async (req, res) => {
    const { name, description, price, image, category, subcategory } = req.body;

    let exProduct = await Product.findOne({name: name});

    if(exProduct) return res.status(400).send("There is already a product with this name.");

    try {
        if(image) {
            const uploadRes = await cloudinary.uploader.upload(image, {
                upload_preset: "online-shop"
            })

            if(uploadRes) {

                const product = new Product({
                    name,
                    description,
                    category,
                    subcategory,
                    price,
                    image: uploadRes
                })

                const savedProduct = await product.save()

                res.status(200).send(savedProduct)
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

// Get all the products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).send(products)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

// All products with pagination
router.get("/all", async (req, res) => {
    const cursor = req.query.cursor;
    try {
        const products = await Product.find().sort({ 'createdAt': -1 }).skip(cursor).limit(12)
        res.status(200).send({cursor: cursor * 1 + 12, products: products})
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

// Find specific product by name
router.get("/find-by-name/:name", async (req, res) => {
    const name = req.params.name
    try {
        const product = await Product.find({ name: name })
        res.status(200).send(product)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

// Latest 10 products
router.get("/latest", async (req, res) => {
    try {
        const products = await Product.find().sort({'createdAt': -1}).limit(10)
        res.status(200).send(products)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

// Top rated products
router.get("/top-rated", isAdmin, async (req, res) => {
    try {
        const products = await Review.aggregate([
            {
                "$unwind": {
                    "path": "$productId"
                }
            },
            {
                $group: {
                    _id: "$productId",
                    name: {
                        $first: "$productName",
                    },
                    rating: {
                        $avg: "$classification"
                    },
                    numberOfReviews: {
                        $sum: 1
                    }  
                } 
            }
        ]).sort({ rating: -1 });

        res.status(200).send(products);
    } catch (error) {
        console.log(error);
    }
})

// Pagination test
router.get("/paged", async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.pageNumber);
        const limit = parseInt(req.query.limit) || 5;
        const result = {};
        const totalProducts = await Product.countDocuments();
        let startIndex = pageNumber * limit;
        const endIndex = (pageNumber + 1) * limit;
        result.totalProducts = totalProducts;

        if (startIndex > 0) {
            result.previous = {
                pageNumber: pageNumber - 1,
                limit: limit,
            }
        }
        if (endIndex < (await Product.countDocuments())) {
            result.next = {
                pageNumber: pageNumber + 1,
                limit: limit,
            }
        }

        result.data = await Product.find().sort({'createdAt': -1}).skip(startIndex).limit(limit)
        result.rowsPerPage = limit;
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

// Get specific product by id
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).send(product);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

// Delete product
router.delete("/delete/:id", isAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product) return res.status(404).send("Product not found.");

        if (product.image.public_id) {
            const destroyResponse = await cloudinary.uploader.destroy(
                product.image.public_id
            );

            if (destroyResponse) {
                const deletedProduct = await Product.findByIdAndDelete(req.params.id);

                res.status(200).send(deletedProduct);
            }
        } else {
            console.log("Action terminated. Failed to delete the product's image.")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

// Edit product
router.put("/edit/:id", isAdmin, async (req, res) => {
    if (req.body.productImg) {
        try {
            const destroyResponse = await cloudinary.uploader.destroy(
                req.body.product.image.public_id
            );
    
            if (destroyResponse) {
                const uploadedResponse = await cloudinary.uploader.upload(
                    req.body.productImg,
                    {
                        upload_preset: "online-shop",
                    }
                );
    
                if (uploadedResponse) {
                    const updatedProduct = await Product.findByIdAndUpdate(
                        req.params.id,
                        {
                            $set: {
                                ...req.body.product,
                                image: uploadedResponse,
                            },
                        },
                        { new: true }
                    );
    
                    res.status(200).send(updatedProduct);
                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    } else {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body.product,
                },
                { new: true }
            );
            res.status(200).send(updatedProduct);
        } catch (error) {
            res.status(500).send(error);
        }
    }
})

module.exports = router