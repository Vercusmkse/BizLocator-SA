import React, { useState } from "react";
import { getRecommendations } from "./services/api";
import "./App.css"; // Make sure this file exists

function App() {
  const [location, setLocation] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!location) return;
    try {
      const data = await getRecommendations(location);
      setResults(data.businesses);
      setError("");
    } catch {
      setResults(null);
      setError("Location not found");
    }
  };

  return (
    <div className="App">
      <h1>BizLocator SA</h1>

      {/* Location dropdown */}
      <div className="search-box">
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            flex: 1,
          }}
        >
          <option value="">-- Select a location --</option>
          <option value="Soweto">Soweto</option>
          <option value="Ga-Matlala">Ga-Matlala</option>
          <option value="Umhlanga">Umhlanga</option>
          <option value="Tembisa">Tembisa</option>
          <option value="Mamelodi">Mamelodi</option>
          <option value="KwaMashu">KwaMashu</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Business Results */}
      {results &&
        results.map((biz, index) => (
          <div key={index} className="card">
            <h3>{biz.name}</h3>
            <p><strong>Description:</strong> {biz.plan.description}</p>
            <p><strong>Startup Cost:</strong> {biz.plan.startup_cost}</p>
            <p><strong>Requirements:</strong> {biz.plan.requirements.join(", ")}</p>
            <p><strong>Profit Potential:</strong> {biz.plan.potential}</p>

            {biz.plan.pdf_file && (
              <a
                href={`http://127.0.0.1:5000/pdf/${biz.plan.pdf_file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 Download Business Plan (PDF)
              </a>
            )}
          </div>
        ))}
    </div>
  );
}

export default App;
