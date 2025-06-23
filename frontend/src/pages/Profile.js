import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);     // Holds user data
  const [error, setError] = useState('');     // For errors

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Not logged in');
      navigate('/login');
      return;
    }

    // Send token in Authorization header
    axios.get('http://localhost:5000/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => setUser(res.data))
    .catch((err) => {
      console.error(err);
      setError('Session expired or unauthorized');
      localStorage.removeItem('token');
      navigate('/login');
    });
  }, [navigate]);

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5">
        {error}
      </div>
    );
  }

  if (!user) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <div className="card shadow">
        <div className="card-body">
          <h4 className="card-title">👤 Welcome, {user.name || 'User'}!</h4>

          <p className="card-text">
            <strong>Email:</strong> {user.email}
          </p>

          <p className="text-muted">
            <strong>User ID:</strong> {user.userId}
          </p>

          <p className="text-success"> You’re successfully authenticated.</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
