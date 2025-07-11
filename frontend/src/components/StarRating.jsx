import React, { useState, useEffect } from "react";

const StarRating = ({ planId }) => {
  const savedRating = localStorage.getItem(`rating-${planId}`);
  const [rating, setRating] = useState(savedRating ? parseInt(savedRating) : 0);

  useEffect(() => {
    localStorage.setItem(`rating-${planId}`, rating);
  }, [rating, planId]);

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            cursor: "pointer",
            fontSize: "20px",
            color: star <= rating ? "#ffc107" : "#ccc",
            marginRight: "4px",
          }}
        >
          ★
        </span>
      ))}
      <span style={{ marginLeft: "8px", fontSize: "14px", color: "var(--text-color)" }}>
        {rating > 0 ? `${rating}/5` : "Rate this plan"}
      </span>
    </div>
  );
};

export default StarRating;
