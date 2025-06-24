import React from 'react';

function Home() {
  return (
    <div className="container py-5 text-center">
      <h1 className="mb-4"> Welcome to NASA Explorer</h1>
      <p className="lead">
        Explore real-time NASA data from space, including:
      </p>
      <ul className="list-unstyled">
        <li>Astronomy Picture of the Day (APOD)</li>
        <li>Mars Rover Photos with filtering & lightbox</li>
        <li>Near-Earth Objects (NEO) data with charts</li>
        <li>EPIC Earth imagery from space</li>
        <li>Library - images & videos of celestial bodies</li>
      </ul>
      <p className="mt-4">
        Use the navigation bar above to explore each section.
      </p>
    </div>
  );
}

export default Home;
