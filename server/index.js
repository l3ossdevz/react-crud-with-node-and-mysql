const express = require("express");
const app = express;
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "123456",
    database: "employeeSystem",
});

// get data from db
app.get("/employees", (req, resp) => {
    db.query("SLELCT * FROM employees", (error, result) => {
        if (error) {
            console.log(error);
        } else {
            resp.send(result);
        }
    });
});

// set port running
app.listen("3001", () => {
    console.log("Server is running on port 3001");
});
