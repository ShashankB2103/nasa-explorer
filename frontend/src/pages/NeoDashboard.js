import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

function NeoDashboard() {
  const [neoData, setNeoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [inputDate, setInputDate] = useState('');

  // Default to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setInputDate(today);
    setSelectedDate(today);
  }, []);

  const fetchNEOs = async () => {
    if (!inputDate) return;
    setLoading(true);
    setError('');
    setNeoData([]);

    try {
      const res = await axios.get(`http://localhost:5000/api/neo?start=${inputDate}&end=${inputDate}`);
      const allObjects = Object.values(res.data).flat();
      setNeoData(allObjects);
      setSelectedDate(inputDate);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch NEO data');
    }

    setLoading(false);
  };

  const chartData = neoData.map(obj => ({
    name: obj.name,
    size: obj.estimated_diameter.kilometers.estimated_diameter_max,
  }));

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Near-Earth Objects Explorer</h2>

      {/* Date Picker */}
      <div className="d-flex justify-content-center mb-3">
        <input
          type="date"
          className="form-control w-auto me-2"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
        />
        <button className="btn btn-primary me-2" onClick={fetchNEOs} disabled={!inputDate}>
          Fetch NEOs
        </button>
        <button className="btn btn-secondary" onClick={() => setNeoData([])}>
          Reset
        </button>
      </div>

      {/* Loading/Error */}
      {loading && <div className="text-center">Loading NEO data...</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* Table */}
      {neoData.length > 0 && (
        <>
          <h5 className="text-center mb-3">NEOs on {selectedDate}</h5>
          <div className="table-responsive mb-5">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Diameter (km)</th>
                  <th>Velocity (km/h)</th>
                  <th>Miss Distance (km)</th>
                </tr>
              </thead>
              <tbody>
                {neoData.map(obj => (
                  <tr key={obj.id}>
                    <td>{obj.name}</td>
                    <td>{obj.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)}</td>
                    <td>{parseFloat(obj.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(2)}</td>
                    <td>{parseFloat(obj.close_approach_data[0].miss_distance.kilometers).toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chart */}
          <h5 className="text-center">Asteroid Size Distribution</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="size" fill="#007bff" name="Size (km)" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

export default NeoDashboard;
