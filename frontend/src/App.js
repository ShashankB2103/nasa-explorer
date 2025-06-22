import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Home from './Home';
import Apod from './Apod';
import MarsRover from './MarsRover';
import NeoDashboard from './NeoDashboard';
import EpicViewer from './EpicViewer';
import LibrarySearch from './LibrarySearch';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔍 On mount, check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  //  Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login'; //  force redirect after logout
  };

  return (
    <Router>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <NavLink to="/" className="navbar-brand">NASA Space Explorer</NavLink>

        <div className="navbar-nav me-auto">
          <NavLink to="/apod" className="nav-link">APOD</NavLink>
          <NavLink to="/mars" className="nav-link">Mars Rover</NavLink>
          <NavLink to="/neo" className="nav-link">NEOs</NavLink>
          <NavLink to="/epic" className="nav-link">EPIC</NavLink>
          <NavLink to="/library" className="nav-link">Library</NavLink>
        </div>

        <div className="d-flex">
          {isLoggedIn ? (
            <>
              <NavLink to="/profile" className="btn btn-outline-light me-2">Profile</NavLink>
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/register" className="btn btn-outline-primary me-2">Register</NavLink>
              <NavLink to="/login" className="btn btn-outline-light">Login</NavLink>
            </>
          )}
        </div>
      </nav>

      {/* Page Routes */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apod" element={<Apod />} />
          <Route path="/mars" element={<MarsRover />} />
          <Route path="/neo" element={<NeoDashboard />} />
          <Route path="/epic" element={<EpicViewer />} />
          <Route path="/library" element={<LibrarySearch />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
 
          <Route path="*" element={<div className="text-center mt-5">404 – Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
