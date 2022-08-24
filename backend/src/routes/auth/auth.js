var config = require("../../config/db");
var db = config.db;
var bcrypt = require("bcrypt");

const express = require("express");
const router = express.Router();

const {generateAccessToken} = require("../../middleware/auth");

router.post("/register", (req, res) => {
    const {email, password, name, firstname} = req.body;
    if (email === "undefined" || password === "undefined" || name === "undefined" || firstname === "undefined")
        res.status(401).json({
            "msg": "Bad parameter"
        });
    bcrypt.hash(password, 10).then((hash) => {
        let insert = `INSERT INTO user (email, password, name, firstname) VALUES ('${email}', '${hash}', '${name}', '${firstname}')`;
        db.query(insert, async (err, results) => {
            if (err)
                return res.status(401).json({
                    "msg": "Token is not valid"
                });
            res.status(200).json({
                "token": generateAccessToken(req.body)
            });
        });
    });
});

router.post("/log", (req, res) => {
    const {email, password} = req.body;
    if (email === "undefined" || password === "undefined")
        res.status(401).json({
            "msg": "Bad parameter"
        });
    let sql = `SELECT * FROM user WHERE email = '${email}'`;
    db.query(sql, async (err, result) => {
        if (err)
            if (result === "undefined" || !(result.length > 0))
                res.status(401).json({
                    "msg": "Bad parameter"
                });
            else
                console.log(err);
        else {
            const user = result[0];
            bcrypt.compare(password, user.password, function (err, result) {
                if (err)
                    res.status(401).json({
                        "msg": "Invalid Credentials",
                    });
                else {
                    res.status(200).json({
                        "token": generateAccessToken(user)
                    });
                }
            });
        }
    });
});

module.exports = router;
