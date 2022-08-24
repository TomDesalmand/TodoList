require("dotenv").config({path: "../../env"});
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const auth_router = require("./routes/auth/auth");
const todo_router = require("./routes/todos/todos");
const user_router = require("./routes/user/user");
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.raw());
app.use(auth_router);
app.use(todo_router);
app.use(user_router);

app.listen(port, () => {
    console.log(`Starting app...`);
    console.log(`App started on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("This is index page");
});
