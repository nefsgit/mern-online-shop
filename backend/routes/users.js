const express = require("express")
const { User } = require("../models/user")
const { auth, isUser, isAdmin } = require("../middleware/auth")
const moment = require("moment")
const bcrypt = require("bcrypt")

const router = express.Router()

// Get all the users registered since the beginning of last month
router.get("/stats", isAdmin, async (req, res) => {
    
    const previousMonth = moment()
        .month(moment().month() - 1)
        .set("date", 1)
        .format("YYYY-MM-DD HH:mm:ss");

    try {
        const users = await User.aggregate([
            {
                $match: {createdAt : {$gte: new Date(previousMonth)}}
            },
            {
                $project: {
                    month: {$month: "$createdAt"}
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ]);

        res.status(200).send(users)
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
    
});

// Get all the users
router.get("/all-users", isAdmin, async (req, res) => {
    try {
        const users = await User.find().sort({ _id: -1 });

        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Find user by id
router.get("/find/:id", isUser, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

// Delete a user
router.delete("/delete/:id", isAdmin, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        res.status(200).send(deletedUser);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Edit an user
router.put("/update/:id", isUser, async(req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (req.body.password || req.body.old_password) {
            if (!req.body.old_password) return res.status(403).send("Enter your current password.");
            const validPassword = await bcrypt.compare(req.body.old_password, user.password);
            if (!validPassword && req.body.password) return res.status(403).send("Wrong password.");
        }   

        if (!(user.email === req.body.email)) {
            const emailInUse = await User.findOne({
                email: req.body.email
            });

            if (emailInUse) return res.status(400).send("Email already registered.");
        }

        if (req.body.password && user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            user.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                isAdmin: req.body.isAdmin,
                password: user.password
            },
            { new: true }
        );

        res.status(200).send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

module.exports = router