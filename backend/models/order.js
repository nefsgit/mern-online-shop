const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    customerId: {type: String},
    paymentIntentId: {type: String},
    products: [],
    subtotal: {type: Number, require: true},
    total: {type: Number, require: true},
    shipping_address: {type: Object, require: true},
    delivery_status: {type: String, default: "pending"},
    payment_status: {type: String, required: true},
    },
    {timestamps: true}
);

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;