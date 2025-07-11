// src/services/api.js

export async function getRecommendations(location) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/business-plans?location=${encodeURIComponent(location)}`);
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("Backend not available or returned error. Using mock data.");

    // MOCK FALLBACK
    return {
      businesses: [
        {
          name: "Spaza Shop",
          plan: {
            description: "A small, convenient shop for essential goods.",
            startup_cost: "R5,000 - R10,000",
            requirements: ["Basic inventory", "License", "Shelving"],
            potential: "Consistent daily income",
            pdf_file: "spaza_shop.pdf",
          },
        },
        {
          name: "Tuck Shop",
          plan: {
            description: "A school-friendly tuck shop selling snacks.",
            startup_cost: "R2,000 - R5,000",
            requirements: ["Permission", "Stock", "Cooler box"],
            potential: "High during school hours",
            pdf_file: "tuck_shop.pdf",
          },
        },
      ],
    };
  }
}
