import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import Apod from './Apod';
import MarsRover from './MarsRover';
import NeoDashboard from './NeoDashboard';
import EpicViewer from './EpicViewer';
import LibrarySearch from './LibrarySearch';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand">NASA Space Explorer</span>
        <div className="navbar-nav">
          <NavLink to="/apod" className="nav-link">APOD</NavLink>
          <NavLink to="/mars" className="nav-link">Mars Rover</NavLink>
          <NavLink to="/neo" className="nav-link">NEOs</NavLink>
          <NavLink to="/epic" className="nav-link">EPIC</NavLink>
          <NavLink to="/library" className="nav-link">Library</NavLink>
        </div>
      </nav>

      {/*Page Routes */}
      <div className="container mt-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apod" element={<Apod />} />
        <Route path="/mars" element={<MarsRover />} />
        <Route path="/neo" element={<NeoDashboard />} />
        <Route path="/epic" element={<EpicViewer />} />
        <Route path="*" element={<div className="text-center mt-5">404 – Page Not Found</div>} />
        <Route path="/library" element={<LibrarySearch />} />
      </Routes>

      </div>
    </Router>
  );
}

export default App;
