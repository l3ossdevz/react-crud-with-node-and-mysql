const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1", //see on kubernets namespace {local-mysql} name {mysql}
    password: "3Ax94KS5UZ",
    database: "my_database",
    port: 51089,
});

// get data from db
app.get("/", (req, resp) => {
    db.query("SELECT * FROM employees", (error, result) => {
        if (error) {
            console.log(error);
        } else {
            resp.send(result);
        }
    });
});

app.post("/create", (req, resp) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query(
        "INSERT INTO employees (name, age, country, position, wage) VALUES(?,?,?,?,?)",
        [name, age, country, position, wage],
        (error, result) => {
            if (error) {
                console.log(error);
            } else {
                resp.send("Values Inserted !");
            }
        }
    );
});

app.put("/update", (req, resp) => {
    const id = req.body.id;
    const wage = req.body.wage;

    db.query(
        "UPDATE employees SET wage = ? WHERE id = ?",
        [wage, id],
        (error, result) => {
            if (error) {
                console.log(error);
            } else {
                resp.send(result);
            }
        }
    );
});

app.delete("/delete/:id", (req, resp) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", id, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            resp.send(result);
        }
    });
});

// // set port running
app.listen("3001", () => {
    console.log("Server is running on port 3001");
});
