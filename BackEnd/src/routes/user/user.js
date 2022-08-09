var bcrypt =  require("bcryptjs");
const express = require("express");
const router = express.Router();

const {authenticateToken} = require("../../middleware/auth");

const {all_users, all_user_information, all_user_tasks, update_user_information, delete_user} = require("./user.query");

router.get('/user', authenticateToken, (req, res) => {   
    res.status(200).json({
        "id" : req.user.id,
        "email" : req.user.email,
        "password" : req.user.password,
        "created_at" : req.user.created_at,
        "firstname" : req.user.firstname,
        "name" : req.user.name
    });
});

router.get('/users', authenticateToken, (req, res) => {
    all_users(res);   
});

router.get('/users/:info', authenticateToken, (req, res) => {
    all_user_information(res, req);
});

router.get('/user/todos', authenticateToken, (req, res) => {
    all_user_tasks(res, req);
});

router.put('/users/:id', authenticateToken, (req, res) => {
    const {email, password, name, firstname} = req.body;
    if (email === "undefined" || password === "undefined" || name === "undefined" || firstname === "undefined")
        res.status(401).json({
            "msg": "Bad parameter"
        });
    const hash = bcrypt.hashSync(password, 10);
    update_user_information(res, id, email, name, firstname, hash);
});

router.delete('/users/:id', authenticateToken, (req, res) => {
    delete_user(res, req);
});

module.exports = router;
