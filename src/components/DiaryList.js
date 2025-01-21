import React from 'react';

function DiaryList({ entries, onDelete }) {
  return (
    <div className="diary-list">
      {entries.map(entry => (
        <div key={entry.id} className="diary-entry">
          <div className="diary-header">
            <h3>{entry.title}</h3>
            <button 
              className="delete-btn"
              onClick={() => onDelete(entry.id)}
            >
              Delete
            </button>
          </div>
          <p>{entry.content}</p>
          <small>{new Date(entry.date).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}

export default DiaryList; 