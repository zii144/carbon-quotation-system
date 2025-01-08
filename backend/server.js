const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

/*
// Database connection Saft in Docker
const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "password",
  database: "carbon_quotation",
  charset: "utf8mb4",
});
*/

// Database connection in Railway
const db = mysql.createConnection({
  host: process.env.MYSQLHOST || "mysql.railway.internal",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "password",
  database: process.env.MYSQLDATABASE || "carbon_quotation",
  port: process.env.MYSQLPORT || 3306,
  charset: "utf8mb4",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("DB Connection Failed:", err);
    return;
  }
  console.log("DB Connected");
});

// API to fetch employee data
app.get("/api/employees", (req, res) => {
  const sql = "SELECT * FROM employees";
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});

// API to add employee data
app.post("/api/employees", (req, res) => {
  const {
    id,
    name,
    gender,
    birthDate,
    region,
    role,
    startDate,
    endDate,
    createdData,
    transferPerson,
  } = req.body;

  const sql = `
    INSERT INTO employees (
      id, name, gender, birthDate, region, role, startDate, endDate, createdData, transferPerson
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      id,
      name,
      gender,
      birthDate,
      region,
      role,
      startDate,
      endDate,
      createdData,
      transferPerson,
    ],
    (err) => {
      if (err) {
        console.log("Error adding employee:", err.message);
        return res.status(500).send(`Error adding employee: ${err.message}`);
      }
      res.send("Employee added");
    }
  );
});

// API to delete employee data
app.delete("/api/employees/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM employees WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error deleting employee");
    }
    res.send("Employee deleted");
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
