export async function getRecommendations(location) {
  const response = await fetch(`http://127.0.0.1:5000/recommend?location=${location}`);
  if (!response.ok) throw new Error("Location not found");
  return await response.json();
}
