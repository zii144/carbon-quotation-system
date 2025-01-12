const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

// Database connection Saft in Docker
const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "password",
  database: "carbon_quotation",
  charset: "utf8mb4",
});

/*
// Database connection in Railway
const db = mysql.createConnection({
  host: process.env.MYSQLHOST || "mysql.railway.internal",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "password",
  database: process.env.MYSQLDATABASE || "carbon_quotation",
  port: process.env.MYSQLPORT || 3306,
  charset: "utf8mb4",
});
*/

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("DB Connection Failed:", err);
    return;
  }
  console.log("DB Connected");
  db.query("SET NAMES utf8mb4;");
  db.query("SET CHARACTER SET utf8mb4;");
});

//* CURD APIs For EmployeeBasicInfo
//#region EmployeeBasicInfo
// API to fetch employee data
app.get("/api/employees", (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const sql = "SELECT * FROM EmployeeBasicInfo";
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
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const {
    employee_id,
    employee_name,
    gender,
    birthDate,
    region,
    role,
    date_of_hire,
    date_of_resignation,
    handover_staff,
    created_at,
  } = req.body;

  const sql = `
    INSERT INTO EmployeeBasicInfo (
      employee_id, employee_name, gender, birthDate, region, role, date_of_hire, date_of_resignation, handover_staff, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      employee_id,
      employee_name,
      gender,
      birthDate,
      region,
      role,
      date_of_hire,
      date_of_resignation || null,
      handover_staff || null,
      created_at,
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

// API to update employee data
app.put("/api/employees/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const {
    employee_id,
    employee_name,
    gender,
    birthDate,
    region,
    role,
    date_of_hire,
    date_of_resignation,
    handover_staff,
    updated_at,
  } = req.body;
  const sql = `
    UPDATE EmployeeBasicInfo
    SET
      employee_id = ?,
      employee_name = ?,
      gender = ?,
      birthDate = ?,
      region = ?,
      role = ?,
      date_of_hire = ?,
      date_of_resignation = ?,
      handover_staff = ?,
      updated_at = ?
    WHERE employee_id = ?
  `;
  db.query(
    sql,
    [
      employee_id,
      employee_name,
      gender,
      birthDate,
      region,
      role,
      date_of_hire,
      date_of_resignation,
      handover_staff || null,
      updated_at,
      req.params.id,
    ],
    (err) => {
      if (err) {
        console.error("Error updating employee:", err.message);
        return res.status(500).send(`Error updating employee: ${err.message}`);
      }
      res.send("Employee updated");
    }
  );
});

// API to delete employee data
app.delete("/api/employees/:id", async (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const { id } = req.params;

  // Validate that `id` is not empty and matches a specific format if needed
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid employee ID format" });
  }

  const sql = "DELETE FROM EmployeeBasicInfo WHERE employee_id = ?";
  try {
    const [result] = await db.promise().query(sql, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Database Error: ", err);
    res.status(500).json({ error: "An internal error occurred." });
  }
});
//#endregion

// TODO: CRUD APIs For CompanyInfo
//#region CompanyInfo
// API to fetch company data
app.get("/api/companies", (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const sql = "SELECT * FROM CompanyInfo";
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});

// API to add company data
app.post("/api/companies", (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const {
    unified_number,
    business_assignee,
    company_name,
    contact_person,
    mobile_phone,
    department,
    contact_phone,
    fax_number,
    contact_email,
    company_address,
    delivery_address,
    created_at,
  } = req.body;

  const sql = `
    INSERT INTO CompanyInfo (
      unified_number, business_assignee, company_name, contact_person, mobile_phone, department, contact_phone, fax_number, contact_email, company_address, delivery_address, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      unified_number,
      business_assignee,
      company_name,
      contact_person,
      mobile_phone,
      department,
      contact_phone,
      fax_number,
      contact_email,
      company_address,
      delivery_address,
      created_at,
    ],
    (err) => {
      if (err) {
        console.log("Error adding company:", err.message);
        return res.status(500).send(`Error adding company: ${err.message}`);
      }
      res.send("Company added");
    }
  );
});

// API to update company data
app.put("/api/companies/:unified_number", (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const {
    unified_number,
    business_assignee,
    company_name,
    contact_person,
    mobile_phone,
    department,
    contact_phone,
    fax_number,
    contact_email,
    company_address,
    delivery_address,
    created_at,
  } = req.body;
  const sql = `
    UPDATE CompanyInfo
    SET
      unified_number = ?,
      business_assignee = ?,
      company_name = ?,
      contact_person = ?,
      mobile_phone = ?,
      department = ?,
      contact_phone = ?,
      fax_number = ?,
      contact_email = ?,
      company_address = ?,
      delivery_address = ?,
      created_at = ?
    WHERE unified_number = ?
  `;
  db.query(
    sql,
    [
      unified_number,
      business_assignee,
      company_name,
      contact_person,
      mobile_phone,
      department,
      contact_phone,
      fax_number,
      contact_email,
      company_address,
      delivery_address,
      created_at,
      req.params.unified_number,
    ],
    (err) => {
      if (err) {
        console.error("Error updating company:", err.message);
        return res.status(500).send(`Error updating company: ${err.message}`);
      }
      res.send("Company updated");
    }
  );
});

// API to delete company data
app.delete("/api/companies/:unified_number", async (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const { unified_number } = req.params;

  const sql = "DELETE FROM CompanyInfo WHERE unified_number = ?";
  try {
    const [result] = await db.promise().query(sql, [unified_number]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (err) {
    console.error("Database Error: ", err);
    res.status(500).json({ error: "An internal error occurred." });
  }
});

//#endregion

// TODO: CRUD APIs For MaterialInfo

// TODO: CRUD APIs For OutsourcingVendor

// TODO: CRUD APIs For CentralDrawingNumber

// TODO: CRUD APIs For CostEntry

// TODO: CRUD APIs For OrderApproval

//#region Login
// API to validate login credentials
app.post("/api/login", (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const { email, password } = req.body;
  const sql =
    "SELECT * FROM LoginAccount WHERE user_email = ? AND user_password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ success: false });
    }
    if (results.length > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  });
});
//#endregion

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
