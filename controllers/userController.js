const pool = require("../config/db");

exports.searchUsers = async (req, res) => {
  const query = req.query.query || "";
  if (!query) return res.json([]);
  try {
    const users = await pool.query(
      "SELECT id, username FROM users WHERE username ILIKE $1 LIMIT 10",
      [query + "%"]
    );
    res.json(users.rows);
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
};