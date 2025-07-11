import React, { useState, useEffect } from "react";
import { getRecommendations } from "./services/api";
import MapView from "./components/MapView";
import StarRating from "./components/StarRating";
import "./App.css";

// Coordinates for each location
const COORDS = {
  "Soweto":      { lat: -26.2485, lng: 27.8585 },
  "Ga-Matlala":  { lat: -23.6484, lng: 28.5980 },
  "Umhlanga":    { lat: -29.7264, lng: 31.0748 },
  "Tembisa":     { lat: -25.9992, lng: 28.2268 },
  "Mamelodi":    { lat: -25.7167, lng: 28.3898 },
  "KwaMashu":    { lat: -29.7038, lng: 30.9838 },
};

function App() {
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const [results, setResults] = useState(null);
  const [savedPlans, setSavedPlans] = useState([]);
  const [error, setError] = useState("");

  // 🌙 Dark Mode toggle using localStorage
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleSearch = async () => {
    if (!location) return;
    try {
      const data = await getRecommendations(location);
      setResults(data.businesses);
      setCoords(COORDS[location] || null);
      setError("");
    } catch {
      setResults(null);
      setCoords(null);
      setError("Location not found");
    }
  };

  const handleSavePlan = (plan) => {
    const planId = `${location}-${plan.name}`;
    if (!savedPlans.some(p => p.id === planId)) {
      setSavedPlans(prev => [...prev, { id: planId, name: plan.name }]);
      alert(`Saved: ${plan.name}`);
    }
  };

  return (
    <div className="App">
      <h1>BizLocator SA</h1>

      {/* 🌙 Dark Mode Toggle */}
      <div className="toggle-container">
        <label>
          🌙 Dark Mode
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </label>
      </div>

      {/* 📍 Location Dropdown */}
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

      {/* 🗺 Google Map */}
      {coords && (
        <div style={{ marginBottom: "30px" }}>
          <MapView center={coords} />
        </div>
      )}

      {/* ❗ Error Message */}
      {error && <p className="error">{error}</p>}

      {/* 📦 Business Plan Cards */}
      {results &&
        results.map((biz, index) => (
          <div key={index} className="card">
            <h3>{biz.name}</h3>
            <p><strong>Description:</strong> {biz.plan.description}</p>
            <p><strong>Startup Cost:</strong> {biz.plan.startup_cost}</p>
            <p><strong>Requirements:</strong> {biz.plan.requirements.join(", ")}</p>
            <p><strong>Profit Potential:</strong> {biz.plan.potential}</p>

            {/* 📄 Download PDF */}
            {biz.plan.pdf_file && (
              <a
                href={`http://127.0.0.1:5000/pdf/${biz.plan.pdf_file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 Download Business Plan (PDF)
              </a>
            )}

            {/* ⭐ Star Rating */}
            <StarRating planId={`${location}-${biz.name}`} />

            {/* 💾 Save Plan Button */}
            <button
              onClick={() => handleSavePlan(biz)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              💾 Save Plan
            </button>
          </div>
        ))}

      {/* 💼 Saved Plans Section */}
      {savedPlans.length > 0 && (
        <div className="saved-section">
          <h2>💼 Saved Plans</h2>
          <ul>
            {savedPlans.map((plan) => (
              <li key={plan.id}>{plan.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
