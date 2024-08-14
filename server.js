import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
// import { configDotenv } from "dotenv";
import dotenv from 'dotenv';

dotenv.config();
// configDotenv();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.HOST,
  port: process.env.PORT_DB,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get the latest banner
app.get('/api/banner', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM banner ORDER BY id DESC LIMIT 1');
    res.json(rows[0] || {}); // Return empty object if no rows
  } catch (err) {
    console.error('Error fetching banner data:', err);
    res.status(500).send('Error fetching banner data');
  }
});

// Update or create a banner
app.post('/api/banner', async (req, res) => {
  const { description, timer, link } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO banner (description, timer, link, visible) VALUES (?, ?, ?, TRUE)
       ON DUPLICATE KEY UPDATE description = VALUES(description), timer = VALUES(timer), link = VALUES(link), visible = TRUE`,
      [description, timer, link]
    );

    // Set the banner visibility to false after the timer expires
    setTimeout(async () => {
      await db.query('UPDATE banner SET visible = FALSE WHERE id = ?', [result.insertId]);
    }, timer * 1000);

    res.sendStatus(200);
  } catch (err) {
    console.error('Error updating banner data:', err);
    res.status(500).send('Error updating banner data');
  }
});


const port = process.env.PORT || 2030;

app.listen(port, () => {
  console.log("Server running on port 5000");
});
