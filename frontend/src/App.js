import React, { useState } from 'react';
import { getRecommendations } from './services/api';

function App() {
  const [location, setLocation] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const search = async () => {
    try {
      const data = await getRecommendations(location);
      setResults(data.businesses);
      setError("");
    } catch (e) {
      setResults(null);
      setError("Location not found");
    }
  };

  return (
    <div className="App">
      <h1>BizLocator SA</h1>
      <input
        type="text"
        placeholder="Enter a location (e.g., Soweto)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={search}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {results && (
        <ul>
          {results.map((biz, index) => (
            <li key={index}>{biz}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
