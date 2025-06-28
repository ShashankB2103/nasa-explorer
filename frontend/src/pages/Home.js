import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFact = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('https://nasa-explorer-1-2yjv.onrender.com/api/space-fact');
      setFact(res.data.fact);
    } catch (err) {
      console.error(err);
      setError('Could not load space fact today.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <div className="container py-5 text-center">
      <h1 className="mb-4">Welcome to <span className="text-primary">NASA Space Explorer</span></h1>

      <p className="lead mb-4">
        Explore real-time NASA space data using the sections below:
      </p>

      <ul className="list-group list-group-flush mb-4">
        <li className="list-group-item">
          <NavLink to="/apod">Astronomy Picture of the Day (APOD)</NavLink>
        </li>
        <li className="list-group-item">
          <NavLink to="/mars">Mars Rover Photos</NavLink> with filtering & lightbox
        </li>
        <li className="list-group-item">
          <NavLink to="/neo">Near-Earth Objects (NEO)</NavLink> with data charts
        </li>
        <li className="list-group-item">
          <NavLink to="/epic">EPIC Earth Imagery</NavLink> from space
        </li>
        <li className="list-group-item">
          <NavLink to="/library">NASA Library</NavLink> of space images & videos
        </li>
      </ul>

      <hr className="my-5" />

      <div className="bg-dark text-white p-4 rounded shadow-lg">
        <h4 className="mb-3"> Did you know?</h4>

        {loading && <div>Fetching today's space fact...</div>}
        {error && <div className="text-danger">{error}</div>}
        {!loading && !error && <blockquote className="blockquote"><p>{fact}</p></blockquote>}

        <button
          onClick={fetchFact}
          className="btn btn-outline-light mt-3"
        >
          Refresh Fact
        </button>
      </div>
    </div>
  );
}

export default Home;
