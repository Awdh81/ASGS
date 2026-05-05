import React, { useState } from "react";

function Tracking() {
  const [animalId, setAnimalId] = useState("");

  const animalLocations = {
    "123456789012": { lat: 26.8467, lng: 80.9462 },
    "111122223333": { lat: 28.6139, lng: 77.2090 },
  };

  const handleTrack = () => {
    if (animalId.length !== 12) {
      alert("Enter valid 12 digit ID");
      return;
    }

    const location = animalLocations[animalId];

    if (!location) {
      alert("Animal ID not found");
      return;
    }

    // 🔥 direct route (no reload issue)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const url = `https://www.google.com/maps/dir/${pos.coords.latitude},${pos.coords.longitude}/${location.lat},${location.lng}`;
        window.open(url, "_blank");
      },
      () => {
        // fallback
        const url = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
        window.open(url, "_blank");
      }
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>📍 Animal Tracking</h1>

      <input
        type="text"
        placeholder="Enter 12 digit ID"
        value={animalId}
        onChange={(e) => setAnimalId(e.target.value)}
        maxLength={12}
      />

      <br /><br />

      {/* ✅ IMPORTANT FIX */}
      <button type="button" onClick={handleTrack}>
        Track Animal
      </button>
    </div>
  );
}

export default Tracking;