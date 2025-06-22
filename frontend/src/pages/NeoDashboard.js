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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get today’s date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Fetch near-Earth objects from backend on component mount
  useEffect(() => {
    axios.get(`http://localhost:5000/api/neo?start=${today}&end=${today}`)
      .then(res => {
        const allObjects = Object.values(res.data).flat(); // Flatten all NEOs for the date
        setNeoData(allObjects);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch NEO data');
        setLoading(false);
      });
  }, []);

  // Prepare data for Recharts: asteroid name vs estimated diameter (km)
  const chartData = neoData.map(obj => ({
    name: obj.name,
    size: obj.estimated_diameter.kilometers.estimated_diameter_max,
  }));

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">☄️ Near-Earth Objects Today</h2>

      {loading && <div className="text-center">Loading NEO data...</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* Table of NEOs */}
      {neoData.length > 0 && (
        <>
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

          {/* Chart: Size of Asteroids */}
          <h5 className="text-center">📊 Asteroid Size Distribution</h5>
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
