const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all users
router.get("/", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

// POST create new user
router.post("/", (req, res) => {
    const { name, email } = req.body;

    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.query(sql, [name, email], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ message: "User added", id: result.insertId });
    });
});

// DELETE user by id
router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [req.params.id], (err) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ message: "User deleted" });
    });
});

module.exports = router;
