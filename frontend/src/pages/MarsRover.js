import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Map of available cameras per rover
  const cameraOptions = {
  curiosity: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'],
  opportunity: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
  spirit: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
};

function MarsRover() {
  // State to hold API response
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rover, setRover] = useState('curiosity'); // default rover
  //const [sol, setSol] = useState(1000);            // default sol
  const [error, setError] = useState('');
  const [camera, setCamera] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null); // holds clicked photo
  const [page, setPage] = useState(0); // offset from base sol
  const baseSol = 1000; // starting sol value
  const actualSol = baseSol + page;



  // Function to fetch photos based on rover and sol
  const fetchPhotos = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`http://localhost:5000/api/mars?rover=${rover}&sol=${actualSol}${camera ? `&camera=${camera}` : ''}`);
      setPhotos(res.data);
    } catch (err) {
      setError('Failed to load Mars Rover photos');
      console.error(err);
    }
    setLoading(false);
  };
  // ✅ Auto-fetch on page load
  useEffect(() => {
    fetchPhotos(); // Auto-load default photos (rover: curiosity, sol: 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rover, camera]);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Mars Rover Photo Explorer</h2>

      {/* Controls for selecting rover and sol */}
      <div className="row justify-content-center mb-3">
        <div className="col-md-3">
          <label className="form-label">Select Rover</label>
          <select
            className="form-select"
            value={rover}
            onChange={(e) => {
            setRover(e.target.value);  // update selected rover
            setCamera('');             // reset camera since available cameras change
            }}
            >
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Enter Sol (Martian day)</label>
          <input
            type="number"
            className="form-control"
            min={0}
            value={actualSol}
            disabled
          />
        </div>
        <div className="col-md-3">
            <label className="form-label">Select Camera </label>
            <select
                className="form-select"
                value={camera}
                onChange={(e) => setCamera(e.target.value)}
            >
            <option value="">-- All Cameras --</option>
                {cameraOptions[rover].map((cam) => (
                <option key={cam} value={cam.toLowerCase()}>
                {cam}
            </option>
            ))}
            </select>
        </div>

        
        <div className="col-md-2 align-self-end">
          <button className="btn btn-primary w-100" onClick={fetchPhotos}>
            Fetch Photos
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* Loading State */}
      {loading && <div className="text-center my-4">Loading...</div>}

      {/* Gallery Display */}
      <div className="row">
        {photos.length === 0 && !loading && (
          <div className="text-center text-muted">No photos found for this Sol.</div>
        )}
        {photos.map((photo) => (
        <div key={photo.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
             <img 
                src={photo.img_src}
                alt={`Mars by ${photo.rover.name}`}
                className="card-img-top"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedPhoto(photo)} // 👈 open modal on click
             />

              <div className="card-body">
                <h6 className="card-title">{photo.camera.full_name}</h6>
                <p className="card-text">
                  Rover: {photo.rover.name} <br />
                  Earth Date: {photo.earth_date}
                </p>
              </div>
            </div>
        </div>
        ))}
      </div>
      {/* Pagination Controls */}
        <div className="d-flex justify-content-between mt-4">
        <button
            className="btn btn-outline-secondary"
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
        >
            ← Previous
        </button>

        <span className="align-self-center text-muted">
            Sol: {actualSol}
        </span>

        <button
            className="btn btn-outline-primary"
            onClick={() => setPage((prev) => prev + 1)}
        >
            Next →
        </button>
        </div>


      {selectedPhoto && (
      <div
        className="modal fade show"
        tabIndex="-1"
        style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.8)' }}
        onClick={() => setSelectedPhoto(null)} // Close modal on background click
        >
        <div
        className="modal-dialog modal-lg modal-dialog-centered"
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
        >
        <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{selectedPhoto.camera.full_name}</h5>
          <button type="button" className="btn-close" onClick={() => setSelectedPhoto(null)} />
        </div>
        <div className="modal-body text-center">
          <img src={selectedPhoto.img_src} alt="Mars Preview" className="img-fluid" />
          <p className="mt-3 text-muted">
            Rover: {selectedPhoto.rover.name} <br />
            Earth Date: {selectedPhoto.earth_date}
          </p>
        </div>
      </div>
    </div>
    </div>
    )}


</div>
  );
}

export default MarsRover;
