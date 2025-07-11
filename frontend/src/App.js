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
        placeholder="Enter a location (e.g., Ga-Matlala)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={search}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {results && (
        <div>
          {results.map((biz, index) => (
            <div key={index} style={{ border: "1px solid gray", margin: "10px", padding: "10px", borderRadius: "10px" }}>
              <h3>{biz.name}</h3>
              <p><strong>Description:</strong> {biz.plan.description}</p>
              <p><strong>Startup Cost:</strong> {biz.plan.startup_cost}</p>
              <p><strong>Requirements:</strong> {biz.plan.requirements.join(", ")}</p>
              <p><strong>Profit Potential:</strong> {biz.plan.potential}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
