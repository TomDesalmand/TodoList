const express = require('express');
const router = express.Router();

const {authenticateToken} = require("../../middleware/auth")

const {view_all_todos, view_todo_id, create_todo, update_todo, delete_todo} = require("./todos.query");

router.get('/todos', authenticateToken, (req, res) => {
    view_all_todos(res);
});

router.get('/todos/:id', authenticateToken, (req, res) => {
    view_todo_id(res, req.params.id);
});

router.post('/todos', authenticateToken, (req, res) => {
    const {title, description, due_time, user_id, status} = req.body;
    if (title === "undefined" || description === "undefined" || title === "undefined" || user_id === "undefined" || status === "undefined")
        res.status(401).json({
            "msg": "Bad parameter"
        });
    create_todo(title, description, due_time, user_id, status, res, req);
});

router.put('/todos/:id', authenticateToken, (req, res) => {
    const {title, description, due_time, user_id, status} = req.body;
    if (title === "undefined" || description === "undefined" || title === "undefined" || user_id === "undefined" || status === "undefined")
    res.status(401).json({
        "msg": "Bad parameter"
    });
    update_todo(title, description, due_time, user_id, status, res, req);
});

router.delete('/todos/:id', authenticateToken, (req, res) => {
    delete_todo(res, req);
});

module.exports = router;
