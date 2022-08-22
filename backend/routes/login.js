const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const { User } = require("../models/user");
const genAuthToken = require("../utils/genAuthToken");

const router = express.Router()

// Login route
router.post("/", async (req, res) => {
    // Validate the data
    const schema = Joi.object({
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required()
    });

    // If the data isn't valid, create an error
    const {error} = schema.validate(req.body)

    // Send the error in the response if it's created
    if(error) return res.status(400).send(error.details[0].message);

    // Look for an user with the received email
    let user = await User.findOne({email: req.body.email});

    // If there is no user with the received email send an error message
    if(!user) return res.status(400).send("Invalid email or password.");

    // Compare the received password with the one associated with the received email
    const isValid = await bcrypt.compare(req.body.password, user.password);

    /* If the password doesn't match we send an error message. It's the same as
    the one we send in case of email not found. We don't want to give away
    too many details about an authentication error. */
    if(!isValid) return res.status(400).send("Invalid email or password.");

    // If everything goes well we generate a token and send it
    const token = genAuthToken(user);

    res.send(token);
});

module.exports = router