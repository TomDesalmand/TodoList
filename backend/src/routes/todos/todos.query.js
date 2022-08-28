var config = require("../../config/db");
var db = config.db;

exports.view_all_todos = async function (res) {
    let sql = `SELECT * FROM todo`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(404).json({
                "msg": "Not found"
            });
        }
        console.log(results);
        res.status(200).json({results});
    });
}

exports.view_todo_id = async function (res, id) {
    let sql = `SELECT * FROM todo WHERE id = ${req.params.info}`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(401).json({
                "msg": "Token is not valid"
            });
        }
        console.log(results);
        res.status(200).json({results});
    });
}

exports.create_todo = async function (title, description, due_time, user_id, status, res, req) {
    let insert;
    console.log(title, description, due_time, user_id, status)
    if (status === undefined) {
        insert = `INSERT INTO todo (title, description, due_time, user_id, status) VALUES ('${title}', '${description}', '${due_time}', '${user_id}', 'not started')`;
    } 
    else {
        insert = `INSERT INTO todo (title, description, due_time, user_id, status) VALUES ('${title}', '${description}', '${due_time}', '${user_id}', '${status}')`;
    }
    db.query(insert, (err, results) => {
        if (err) {
            return res.status(400).json({
                "msg": "Bad parameters"
            });
        }
        res.status(200).json({results});
    });
}

exports.update_todo = async function(title, description, due_time, user_id, status, req, res) {
    let insert;
    if (status === undefined) {
        insert = `UPDATE todo SET title = '${title}', description = '${description}', due_time = '${due_time}', user_id = '${user_id}', status = 'not started' WHERE id = '${req.params.id}'`;
    } 
    else {
        insert = `UPDATE todo SET title = '${title}', description = '${description}', due_time = '${due_time}', user_id = '${user_id}', status = '${status}' WHERE id = '${req.params.id}'`;
    }
    db.query(insert, (err, results) => {
        if (err)
            return res.status(401).json({
                "msg": "Token is not valid"
            });
        res.status(200).json({results});
    });
}

exports.delete_todo_id = async function (res, req) {
    let sql = `DELETE FROM todo WHERE id = ${req.params.id}`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(401).json({
                "msg": "Token is not valid"
            });
        }
        return res.status(200).json({
            "msg" : `Successfully deleted record number: ${req.params.id}`
        });
    });
}
