var config = require("../../config/db");
var db = config.db;

exports.all_users = async function (res) {
    let sql = `SELECT * FROM user`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(`An error happened when retrieving user infos.`);
            return res.status(408).json({
                "msg": "Internal server error"
            });
        }
        res.status(200).json({results});
    });
}

exports.all_user_information = async function (res, req) {
    let sql = `SELECT * FROM user WHERE id = ${req.params.info} OR email = ${req.params.info}`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(`An error happened when retrieving info from user with id ${req.params.id}`);
            return res.status(401).json({
                "msg": "Token is not valid"
            });
        }
        console.log(results);
        res.status(200).json({results});
    });
}

exports.all_user_tasks = async function (res, req) {
    let sql = `SELECT * FROM todo WHERE id = ${req.user.id}`;
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

exports.update_user_information = async function (res, id, email, name, firstname, hash) {
    let sql = `UPDATE user SET email = '${email}', password = '${hash}', name = '${name}', firstname = '${firstname}' WHERE id = '${id}'`;
    db.query(sql, (err, results) => {
        if (err)
            return res.status(401).json({
                "msg": "Token is not valid"
            });
        console.log(results);
        res.status(200).json({results});
    });  
}

exports.delete_user = async function (res, req) {
    let sql = `DELETE FROM user WHERE id = ${req.params.id}`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(401).json({
                "msg": "Token is not valid"
            });
        }
        res.status(200).json({
            "msg" : "Successfully deleted record number: ${id}"
        });
    });
}
