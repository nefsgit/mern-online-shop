const express = require("express")
const Stripe = require("stripe")
const { Order } = require("../models/order")
require("dotenv").config()

const stripe = Stripe(process.env.STRIPE_KEY)

const router = express.Router()

// Create session
router.post('/create-checkout-session', async (req, res) => {

    // Create a customer
    const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.userId,
        }
    })

    // Products in the order
    const line_items = req.body.cartItems.map((item) => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    images: [item.image.url],
                    description: item.description,
                    metadata: {
                        id: item._id
                    }
                },
                unit_amount: item.price * 100,
            },
            quantity: item.cartQuantity,
        }
    })

    // Session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'PT'],
        },
        shipping_options: [
        {
            shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
                amount: 0,
                currency: 'usd',
            },
            display_name: 'Free shipping',
            // Delivers between 5-7 business days
            delivery_estimate: {
                minimum: {
                unit: 'business_day',
                value: 5,
                },
                maximum: {
                unit: 'business_day',
                value: 7,
                },
            }
            }
        },
        {
            shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
                amount: 1500,
                currency: 'usd',
            },
            display_name: 'Fast shipping',
            // Delivers in exactly 1 business day
            delivery_estimate: {
                minimum: {
                unit: 'business_day',
                value: 1,
                },
                maximum: {
                unit: 'business_day',
                value: 2,
                },
            }
            }
        },
        ],
        phone_number_collection: {
            enabled: true
        },
        customer: customer.id,
        line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/pre-checkout`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
    res.send({url: session.url});
  });

// Create Order

const createOrder = async (customer, data, lineItems) => {

    const newOrder = new Order({
        userId: customer.metadata.userId,
        customerId: data.customer,
        paymentIntentId: data.payment_intent,
        products: lineItems.data,
        subtotal: data.amount_subtotal,
        total: data.amount_total,
        shipping_address: data.customer_details,
        payment_status: data.payment_status
    });

    try {
        const savedOrder = await newOrder.save();

        console.log("Processed Order", savedOrder)
    } catch (error) {
        console.log(error);
    }
}

// Stripe webhook
const endpointSecret = `${process.env.ENDPOINT_SECRET}`;

router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const payload = request.body;
    const payloadString = JSON.stringify(payload, null, 2);
    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret,
    });
  
    let event;
    let data;
    let eventType;
  
    try {
        event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
        console.log("Webhook verified")
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
  
    // Handle the event
    data = event.data.object
    eventType = event.type;

    if(eventType === "checkout.session.completed") {
        stripe.customers.retrieve(data.customer).then(
            (customer) => {
                stripe.checkout.sessions.listLineItems(
                    data.id, {},
                    function(err, lineItems) {
                        createOrder(customer, data, lineItems)
                    }
                )                
            }
        ).catch(err => console.log(err.message))
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send().end();
  });


module.exports = router