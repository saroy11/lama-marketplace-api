const router = require("express").Router();
const UserModel = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await UserModel.findOne(
            {
                username: req.body.username
            }
        );

        if (!user)
            return res.status(200).json("_id : 0");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;

        if (originalPassword != inputPassword)
            return res.status(200).json("_id : 0");

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });

    } catch (err) {
        console.log("err " + err);
        res.status(500).json(err);
    }

});

module.exports = router;