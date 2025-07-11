import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// Simple container style
const containerStyle = {
  width: "100%",
  height: "350px",
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.06)",
};

export default function MapView({ center }) {
  // Load script once
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded || !center) return null;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
    >
      <Marker position={center} />
    </GoogleMap>
  );
}
