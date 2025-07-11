import React, { useState } from "react";
import { getRecommendations } from "./services/api";   // <-- make sure api.js exists

function App() {
  /* ----------------------------- state ----------------------------- */
  const [location, setLocation]   = useState("");   // text in the search box
  const [results, setResults]     = useState(null); // array of businesses (or null)
  const [error, setError]         = useState("");   // error message string

  /* ------------------------ event handlers ------------------------- */
  const handleSearch = async () => {
    if (!location.trim()) return;  // ignore empty search
    try {
      const data = await getRecommendations(location.trim());
      setResults(data.businesses);
      setError("");
    } catch (err) {
      setResults(null);
      setError("Location not found");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  /* ---------------------------- render ----------------------------- */
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>BizLocator SA</h1>

      {/* search box */}
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter a location (e.g., Soweto)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>

      {/* error message */}
      {error && <p style={styles.error}>{error}</p>}

      {/* results */}
      {results &&
        results.map((biz, idx) => (
          <div key={idx} style={styles.card}>
            <h3 style={styles.cardTitle}>{biz.name}</h3>

            <p>
              <strong>Description:</strong> {biz.plan.description}
            </p>
            <p>
              <strong>Startup Cost:</strong> {biz.plan.startup_cost}
            </p>
            <p>
              <strong>Requirements:</strong>{" "}
              {biz.plan.requirements.join(", ")}
            </p>
            <p>
              <strong>Profit Potential:</strong> {biz.plan.potential}
            </p>

            {/* download link */}
            {biz.plan.pdf_file && (
              <a
                href={`http://127.0.0.1:5000/pdf/${biz.plan.pdf_file}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                📄 Download Business Plan (PDF)
              </a>
            )}
          </div>
        ))}
    </div>
  );
}

/* ----------------------------- styles ----------------------------- */
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
  },
  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  cardTitle: { marginTop: 0 },
  link: {
    marginTop: "10px",
    display: "inline-block",
    color: "#007bff",
    textDecoration: "none",
    fontWeight: 600,
  },
};

export default App;
