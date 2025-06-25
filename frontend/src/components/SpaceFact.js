// src/components/SpaceFact.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SpaceFact() {
  const [fact, setFact] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/space-fact')
      .then(res => setFact(res.data.fact))
      .catch(err => {
        console.error('Error fetching space fact:', err);
        setError('Could not load space fact today.');
      });
  }, []);

  if (error) {
    return <div className="alert alert-warning mt-4 text-center">{error}</div>;
  }

  return (
    <div className="alert alert-info mt-5 text-center shadow-sm">
      <h5> Did You Know?</h5>
      <p className="mb-0"><em>{fact}</em></p>
    </div>
  );
}

export default SpaceFact;
