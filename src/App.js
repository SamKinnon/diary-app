import React, { useState, useEffect } from 'react';
import DiaryForm from './components/DiaryForm';
import DiaryList from './components/DiaryList';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);

  // Fetch entries when component mounts
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const response = await fetch('http://localhost:5000/api/entries');
    const data = await response.json();
    setEntries(data);
  };

  const handleEntrySubmit = async (entry) => {
    await fetch('http://localhost:5000/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
    fetchEntries();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/entries/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete entry');
        }
        
        await fetchEntries(); // Refresh the list after successful deletion
        
      } catch (error) {
        console.error('Error deleting entry:', error);
        alert('Failed to delete entry. Please try again.');
      }
    }
  };

  return (
    <div className="App">
      <h1>My Diary</h1>
      <DiaryForm onEntrySubmit={handleEntrySubmit} />
      <DiaryList entries={entries} onDelete={handleDelete} />
    </div>
  );
}

export default App; 