import React, { useState } from 'react';
import axios from 'axios';

function LibrarySearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Search NASA library
  const searchLibrary = async () => {
    if (!query) return;

    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`https://nasa-explorer-1-2yjv.onrender.com/api/library?search=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch NASA library results');
    }
    setLoading(false);
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">NASA Image & Video Library</h2>

      {/* Search Input */}
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search NASA media (e.g. Moon, Mars, Earth)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchLibrary()}
        />
        <button className="btn btn-primary" onClick={searchLibrary}>Search</button>
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* Loading Spinner */}
      {loading && <div className="text-center">Loading...</div>}

      {/* Results */}
      <div className="row">
        {results.map((item, idx) => (
          <div key={idx} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100" onClick={() => setSelected(item)} style={{ cursor: 'pointer' }}>
              <img src={item.imageUrl} alt={item.title} className="card-img-top" />
              <div className="card-body">
                <h6 className="card-title">{item.title}</h6>
                <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                  {item.date_created ? new Date(item.date_created).toLocaleDateString() : ''}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selected && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selected.title}</h5>
                <button type="button" className="btn-close" onClick={() => setSelected(null)}></button>
              </div>
              <div className="modal-body text-center">
                <img src={selected.imageUrl} alt="Preview" className="img-fluid mb-3" />
                <p className="text-muted">{selected.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LibrarySearch;
