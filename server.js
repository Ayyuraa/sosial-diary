const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Konfigurasi koneksi ke MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // username mysql
  password: '', // password mysql
  database: 'sosial_diary' // nama database
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Endpoint untuk mengambil semua cerita
app.get('/api/cerita', (req, res) => {
  db.query('SELECT * FROM cerita ORDER BY created_at DESC', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint untuk menambahkan cerita
app.post('/api/cerita', (req, res) => {
  const { judul, isi, pengarang } = req.body;
  const query = 'INSERT INTO cerita (judul, isi, pengarang) VALUES (?, ?, ?)';
  db.query(query, [judul, isi, pengarang], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Cerita berhasil ditambahkan' });
  });
});

// Endpoint untuk menambahkan komentar
app.post('/api/komentar', (req, res) => {
  const { cerita_id, komentar, pengarang } = req.body;
  const query = 'INSERT INTO komentar (cerita_id, komentar, pengarang) VALUES (?, ?, ?)';
  db.query(query, [cerita_id, komentar, pengarang], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Komentar berhasil ditambahkan' });
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
