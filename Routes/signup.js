// route USER/SIGNUP
const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const User = require("../models/User");


router.post("/user/Signup", async (req, res) => {
    try {
        // const body = { email: req.body.email, password: req.body.password, username: req.body.username }


        if (!req.body.username) {
            return res.status(400).json({ message: "Username non renseigné" })
        }

        const userExist = await User.findOne({ email: req.body.email });

        if (userExist) {
            return res.status(409).json({ message: "l'email renseigné existe déjà" })
        }
        const salt = uid2(16);
        const hash = SHA256(req.body.password + salt).toString(encBase64);
        const token = uid2(64);
        const newUser = new User({

            email: req.body.email,
            account: {
                username: req.body.username,
                avatar: {},
            },
            newsletter: true,
            token: token,
            hash: hash,
            salt: salt
        });

        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            token: newUser.token,
            account: {
                username: newUser.account.username
            },

        });
    }


    catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;