const mysql = require("mysql2");

const db = mysql.createConnection({
    host        : process.env.HOST,
    user        : process.env.USER,
    password    : process.env.PASSWORD,
    database    : process.env.DB
});

db.connect((err) => {
    if (err)
        return console.log(`There was an error while connecting to data base.`);
    console.log(`Connected to the data base.`);
});

module.exports = {
    db
}