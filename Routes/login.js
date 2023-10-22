//ROUTE LOGIN

const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const User = require("../models/User");

router.post("/user/login", async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ message: "Unauthorized" });
        }

        const hash2 = SHA256(req.body.password + user.salt).toString(encBase64);


        if (hash2 !== user.hash) {
            return res.status(400).json({ message: "Unauthorized" });
        }
        res.status(200).json({

            _id: user._id,
            token: user.token,
            account: {
                username: user.account.username,
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


module.exports = router;