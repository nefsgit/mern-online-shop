const express = require("express")
const { Order } = require("../models/order")
const { Product } = require("../models/product")
const { auth, isUser, isAdmin } = require("../middleware/auth")
const moment = require("moment")

const router = express.Router()

// Get all the orders with an optional parameter
router.get("/", isAdmin, async (req, res) => {

    const query = req.query.new

    try {
        const orders = query ? await Order.find().sort({_id: -1}).limit(4) :
        await Order.find().sort({_id: -1})

        res.status(200).send(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

// Get the totals of orders for the last 2 months
router.get("/stats", isAdmin, async (req, res) => {
    
    const previousMonth = moment()
        .month(moment().month() - 1)
        .set("date", 1)
        .format("YYYY-MM-DD HH:mm:ss");

    // Testing with December - January
    //const pM = "2022-12-01"

    try {
        const orders = await Order.aggregate([
            {
                $match: {
                    createdAt : {$gte: new Date(previousMonth)}
                }
            },
            {
                $project: {
                    month: {$month: "$createdAt"},
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ]);

        res.status(200).send(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
    
});

// Get the totals of earnings for the last 2 months
router.get("/income-stats", isAdmin, async (req, res) => {
    
    const previousMonth = moment()
        .month(moment().month() - 1)
        .set("date", 1)
        .format("YYYY-MM-DD HH:mm:ss");

    try {
        const income = await Order.aggregate([
            {
                $match: {createdAt : {$gte: new Date(previousMonth)}}
            },
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$total",
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"}
                }
            }
        ]);

        res.status(200).send(income)
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
    
});

// Get the totals of earnings for the alst week by day
router.get("/income-weekly", isAdmin, async (req, res) => {
    
    const lastWeek = moment()
        .day(moment().day() - 6)
        .format("YYYY-MM-DD HH:mm:ss");
    try {
        const income = await Order.aggregate([
            {
                $match: {createdAt : {$gte: new Date(lastWeek)}}
            },
            {
                $project: {
                    day: {$dayOfWeek: "$createdAt"},
                    sales: "$total",
                    date: "$createdAt",
                }
            },
            {
                $group: {
                    _id: "$day",
                    date: {
                        $first: "$date",
                    },
                    total: {$sum: "$sales"}
                }
            }
        ]);

        res.status(200).send(income)
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
    
});

// Get all the orders
router.get("/all-orders", isAdmin, async (req, res) => {
    try {
        const orders = await Order.find()

        res.status(200).send(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

// Get the most sold products to display in the home page
router.get("/most-popular", async (req, res) => {
    try {
        const products = await Order.aggregate([
              {
                "$unwind": {
                  "path": "$products"
                }
              },
              {
                "$group": {
                  "_id": "$products.description",
                  "title": {
                    "$first": "$products.quantity",
                  },
                  "totalSold": {
                    "$sum": "$products.quantity"
                  },
                }
              },
              {
                "$sort": {
                  "totalSold": -1
                }
              },
              {
                "$limit": 5
              }
        ]);

        let productsArray = [];
        const fallbackArray = await Product.find().sort({ createdAt: -1 }).limit(5);

        for (const name of products) {
            const product = await Product.find({ name: name._id });

            productsArray.push(product)
        }
        
        if (productsArray.length === 0) {
            productsArray = fallbackArray;
        }

        res.status(200).send(productsArray)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

// Get the most sold products related to a specific product by category
router.get("/related/:id", async (req, res) => {
    try {
        // Current product 
        const selectedProd = await Product.findById(req.params.id);

        // Looks up the names of products that were sold at least once, limited to 100
        const products = await Order.aggregate([
              {
                "$unwind": {
                  "path": "$products"
                }
              },
              {
                "$group": {
                  "_id": "$products.description",
                  "title": {
                    "$first": "$products.quantity",
                  },
                  "totalSold": {
                    "$sum": "$products.quantity"
                  },
                }
              },
              {
                "$sort": {
                  "totalSold": -1
                }
              }
        ]).limit(100);
        
        // Finds the latest products added to the store, limited to 100 in case the database is huge
        const unrelatedProducts = await Product.find().sort({ createdAt: -1 }).limit(100)
        // Removes the current product and filters for products of the same category
        const unrelatedProds = unrelatedProducts.filter((pr) => !pr._id.equals(selectedProd._id) && pr.category === selectedProd.category).slice(0, 4)
        /* Declares an array to store filtered products later. It's declared
        here cause the value assigned to it may change */
        let productsArray = [];

        /* Iterating through the names of the products sold, we look up the actual
        actual products, and push them into the array we created earlier */
        for (const name of products) {
            const product = await Product.find({ name: name._id });
            
            for (let pd of product) {
                if (pd._id && !pd._id.equals(selectedProd._id)) {
                    productsArray.push(pd);
                }
            }
        }
        /* If nothing is pushed into the previous array, we set it to be the
        same as the one that contains the products with the same categories
        as the current one */
        if (productsArray.length === 0) {
            productsArray = unrelatedProds;
        }

        /* Here we filter the final array for products of the same category
        as the current one (we did it before for a potentially different array)
        and we limit its length to 4 products */
        let relatedProducts = productsArray.filter((prod) => prod.category === selectedProd.category).slice(0, 4);

        /* If our final array has less than 2 products, we set it to have the
        latest products of the same category as the current one */
        if (relatedProducts.length < 2 && unrelatedProds.length >= 2) {
           relatedProducts = unrelatedProds;
        } else if (relatedProducts.length === 0 && unrelatedProds.length < 2) {
            relatedProducts = unrelatedProducts.slice(0, 4);
        }
        
        res.status(200).send(relatedProducts)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

// Get orders for the user who sends the request
router.get("/user-orders", auth, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 })

        const userOrders = orders.filter((order) => order.userId === req.user._id)
        res.status(200).send(userOrders)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

// Get the total of earnings for all time
router.get("/all-time-earnings", isAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        let total = 0;
        orders.forEach(order => {
            total += order.total
        }
        )
        const totals = total / 100
        const total_earnings = JSON.stringify(totals)
        res.status(200).send(total_earnings)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
});

// Edit Order (unused, but created anyway in case it's needed some time)
router.put("/edit/:id", isAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).send(updatedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Get specific order by id
router.get("/find/:id", auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (req.user._id !== order.userId && !req.user.isAdmin) return res.status(403).send("Access denied");

        res.status(200).send(order);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

module.exports = router