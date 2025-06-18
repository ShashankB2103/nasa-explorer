import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EpicViewer() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch EPIC image data from backend on load
  useEffect(() => {
    axios.get('http://localhost:5000/api/epic')
      .then(res => {
        setImages(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load EPIC images');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-4">Loading EPIC images...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">🌍 EPIC Earth Images</h2>

      <div id="epicCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {images.map((img, index) => (
            <div
              key={img.identifier}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              <img
                src={img.imgUrl}
                className="d-block w-100 rounded shadow"
                alt={img.caption}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>{new Date(img.date).toUTCString()}</h5>
                <p>{img.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#epicCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#epicCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default EpicViewer;
