import React from "react";

const SavedPlans = ({ savedPlans, onUnsave }) => {
  if (savedPlans.length === 0) return null;

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>📌 Saved Plans</h2>
      {savedPlans.map((plan, index) => (
        <div key={index} className="card">
          <h3>{plan.name}</h3>
          <p><strong>Description:</strong> {plan.plan.description}</p>
          <p><strong>Startup Cost:</strong> {plan.plan.startup_cost}</p>
          <p><strong>Requirements:</strong> {plan.plan.requirements.join(", ")}</p>
          <p><strong>Profit Potential:</strong> {plan.plan.potential}</p>

          {plan.plan.pdf_file && (
            <a
              href={`http://127.0.0.1:5000/pdf/${plan.plan.pdf_file}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 Download Business Plan (PDF)
            </a>
          )}

          <button onClick={() => onUnsave(plan.name)}>❌ Remove</button>
        </div>
      ))}
    </div>
  );
};

export default SavedPlans;
