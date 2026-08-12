import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "blood_donation",
});

db.connect((err) => {
  if (err) {
    console.log("Error while connecting database");
    console.error(err);
    return;
  }

  console.log(" Database connected successfully");
});

export default db;