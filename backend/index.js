import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "TEST",
});
app.use(express.json());
app.use(cors());

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE  FROM books WHERE id=?";
  db.query(q, [bookId], (err, data) => {
    if (err) {
      return err;
    }
    return res.json(data);
  });
});
app.put("/books/:id", (req, res) => {
  const q =
    "UPDATE books SET `title`=?,`descr`=?,`cover`=?,`price`=? WHERE id=?";
  const values = [
    req.body.title,
    req.body.descr,
    req.body.cover,
    req.body.price,
  ];
  const bookId = req.params.id;

  db.query(q, [...values, bookId], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  }); 
});
app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`,`descr`,`cover`,`price`) VALUES(?)";
  const values = [
    req.body.title,
    req.body.descr,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.listen(8800, () => {
  console.log("connected to backend ");
});
