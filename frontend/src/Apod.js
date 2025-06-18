import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Apod() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [inputDate, setInputDate] = useState('');



  useEffect(() => {
    setLoading(true);
    const baseUrl = 'http://localhost:5000/api/apod';
    const url = selectedDate ? `${baseUrl}?date=${selectedDate}` : baseUrl;
     axios.get(url)
      .then(res => {
        setApod(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch APOD data');
        setLoading(false);
      });
  }, [selectedDate]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    
   <>
    <div className="text-center mb-4">
    <label htmlFor="apod-date" className="form-label fw-bold">Select Date</label>
    <input
        type="date"
        id="apod-date"
        className="form-control w-auto mx-auto"
        value={inputDate}
        onChange={(e) => setInputDate(e.target.value)}
        max={new Date().toISOString().split("T")[0]}
    />
    <button
        className="btn btn-primary btn-sm mt-2"
        onClick={() => setSelectedDate(inputDate)}
        disabled={!inputDate}
    >
        Show APOD
    </button>
    {selectedDate && (
        <button
        className="btn btn-secondary btn-sm mt-2 ms-2"
        onClick={() => {
            setInputDate('');
            setSelectedDate('');
        }}
        >
        Reset
        </button>
  )}
</div>


    
    <div className="card my-4 shadow">
      {apod.media_type === 'image' && (
        <img src={apod.url} className="card-img-top" alt={apod.title} />
      )}
      <div className="card-body">
        <h5 className="card-title">{apod.title}</h5>
        <p className="card-text">{apod.explanation}</p>
        <p className="text-muted text-end">{apod.date}</p>
      </div>
    </div>
  </>
  );
}

export default Apod;
