import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Apod from './Apod';
import MarsRover from './MarsRover';
import NeoDashboard from './NeoDashboard';
import EpicViewer from './EpicViewer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      {/* 🔗 Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand">🚀 NASA Explorer</span>
        <div className="navbar-nav">
          <NavLink to="/apod" className="nav-link">APOD</NavLink>
          <NavLink to="/mars" className="nav-link">Mars Rover</NavLink>
          <NavLink to="/neo" className="nav-link">NEOs</NavLink>
          <NavLink to="/epic" className="nav-link">EPIC</NavLink>
        </div>
      </nav>

      {/* 📦 Page Routes */}
      <div className="container mt-4">
        <Routes>
          <Route path="/apod" element={<Apod />} />
          <Route path="/mars" element={<MarsRover />} />
          <Route path="*" element={<div className="text-center">404 – Page Not Found 🚫</div>} />
          <Route path="/neo" element={<NeoDashboard />} />
          <Route path="/epic" element={<EpicViewer />} />          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
