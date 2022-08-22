const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const register = require("./routes/register")
const login = require("./routes/login")
const stripe = require("./routes/stripe")
const productsRoute = require("./routes/products")
const users = require("./routes/users")
const orders = require("./routes/orders")
const categories = require("./routes/categories")
const subcategories = require("./routes/subcategories")
const reviews = require("./routes/reviews")

const products = require("./products")

const app = express()

require("dotenv").config()

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))

app.use(cors())

app.use("/api/register", register)

app.use("/api/login", login)

app.use("/api/stripe", stripe)

app.use("/api/products", productsRoute)

app.use("/api/users", users)

app.use("/api/orders", orders)

app.use("/api/categories", categories)

app.use("/api/subcategories", subcategories)

app.use("/api/reviews", reviews)

app.get("/", (req, res) => {
    res.send("Welcome")
})

app.get("/products", (req, res) => {
    res.send(products)
})

const port = process.env.PORT || 5000
const uri = process.env.DB_URI

app.listen(port, console.log(`Server running on port ${port}`))

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("DB connection successful")).catch(
    (error) => console.log("DB connection failed", error.message))