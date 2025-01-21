const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Get all diary entries
app.get('/api/entries', (req, res) => {
  db.all('SELECT * FROM diary_entries ORDER BY date DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add new diary entry
app.post('/api/entries', (req, res) => {
  const { title, content } = req.body;
  const date = new Date().toISOString();
  
  db.run(
    'INSERT INTO diary_entries (title, content, date) VALUES (?, ?, ?)',
    [title, content, date],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Add delete endpoint
app.delete('/api/entries/:id', (req, res) => {
  const id = req.params.id;
  
  console.log('Deleting entry with id:', id);
  
  db.run('DELETE FROM diary_entries WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Delete error:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Entry deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 