import React, { useState, useEffect } from "react";
import "./Tracking.css";

function Tracking() {
  const [animalId, setAnimalId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [animalData, setAnimalData] = useState(null);

  // Varanasi specific locations with detailed info
  const animalLocations = {
    "123456789012": { 
      lat: 25.3176, 
      lng: 82.9739,
      name: "Ganga Dolphin Spot",
      area: "Dashashwamedh Ghat",
      city: "Varanasi",
      landmark: "Near Kashi Vishwanath Temple",
      lastSeen: "10 minutes ago",
      status: "Active",
      caretaker: "Ram Sharma",
      contact: "+91 98765 43210"
    },
    "111122223333": { 
      lat: 25.2820, 
      lng: 82.9563,
      name: "Assi Ghat Area",
      area: "Assi Ghat",
      city: "Varanasi",
      landmark: "Near Assi Ghat Park",
      lastSeen: "25 minutes ago",
      status: "Moving",
      caretaker: "Sita Devi",
      contact: "+91 87654 32109"
    },
    "444455556666": {
      lat: 25.3260,
      lng: 82.9797,
      name: "Banaras Hindu University",
      area: "BHU Campus",
      city: "Varanasi",
      landmark: "Near Vishwanath Temple",
      lastSeen: "1 hour ago",
      status: "Resting",
      caretaker: "Dr. Kumar",
      contact: "+91 76543 21098"
    },
    "777788889999": {
      lat: 25.2876,
      lng: 82.9725,
      name: "Durga Kund",
      area: "Durga Temple Area",
      city: "Varanasi",
      landmark: "Near Durga Mandir",
      lastSeen: "30 minutes ago",
      status: "Active",
      caretaker: "Meera Singh",
      contact: "+91 65432 10987"
    },
    "222233334444": {
      lat: 25.3400,
      lng: 82.9450,
      name: "Sarnath Deer Park",
      area: "Sarnath",
      city: "Varanasi",
      landmark: "Buddhist Temple Complex",
      lastSeen: "45 minutes ago",
      status: "Grazing",
      caretaker: "Anand Gupta",
      contact: "+91 54321 09876"
    },
    "555566667777": {
      lat: 25.3080,
      lng: 82.9650,
      name: "Kedar Ghat",
      area: "Kedar Ghat",
      city: "Varanasi",
      landmark: "Ancient Steps",
      lastSeen: "15 minutes ago",
      status: "Active",
      caretaker: "Lakshmi Bai",
      contact: "+91 43210 98765"
    }
  };

  // Famous Varanasi landmarks for quick tracking
  const varanasiLandmarks = [
    { id: "Kashi Vishwanath", lat: 25.3109, lng: 82.9739, name: "🛕 Kashi Vishwanath Temple" },
    { id: "Dashashwamedh", lat: 25.3176, lng: 82.9739, name: "🕉️ Dashashwamedh Ghat" },
    { id: "BHU", lat: 25.3260, lng: 82.9797, name: "🏛️ Banaras Hindu University" },
    { id: "Assi Ghat", lat: 25.2820, lng: 82.9563, name: "🏞️ Assi Ghat" },
    { id: "Sarnath", lat: 25.3400, lng: 82.9450, name: "🕍 Sarnath" },
    { id: "Manikarnika", lat: 25.3130, lng: 82.9780, name: "🔥 Manikarnika Ghat" }
  ];

  // Sample animals data
  const animals = [
    { id: "123456789012", name: "Ramu", type: "Elephant", color: "Grey", age: 12, image: "🐘" },
    { id: "111122223333", name: "Shamu", type: "Dolphin", color: "Blue-grey", age: 5, image: "🐬" },
    { id: "444455556666", name: "Bhola", type: "Bull", color: "White", age: 8, image: "🐂" },
    { id: "777788889999", name: "Gauri", type: "Cow", color: "Brown", age: 6, image: "🐄" },
    { id: "222233334444", name: "Harini", type: "Deer", color: "Golden", age: 4, image: "🦌" },
    { id: "555566667777", name: "Kalu", type: "Buffalo", color: "Black", age: 7, image: "🐃" }
  ];

  const getAnimalDetails = (id) => {
    return animals.find(animal => animal.id === id);
  };

  const handleTrack = () => {
    if (animalId.length !== 12) {
      alert("❌ Please enter a valid 12-digit Animal ID");
      return;
    }

    setLoading(true);
    const location = animalLocations[animalId];
    const animal = getAnimalDetails(animalId);

    if (!location) {
      alert("🔍 Animal ID not found in our database");
      setLoading(false);
      return;
    }

    setAnimalData({ ...location, ...animal });
    setCurrentLocation(location);

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          
          // Open Google Maps with directions
          const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${location.lat},${location.lng}`;
          window.open(url, "_blank");
          setLoading(false);
          setShowMap(true);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback - open map without directions
          const url = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
          window.open(url, "_blank");
          setLoading(false);
          setShowMap(true);
        }
      );
    } else {
      alert("⚠️ Geolocation is not supported by your browser");
      setLoading(false);
    }
  };

  const handleDirectLocation = (lat, lng) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const url = `https://www.google.com/maps/dir/${pos.coords.latitude},${pos.coords.longitude}/${lat},${lng}`;
          window.open(url, "_blank");
        },
        () => {
          const url = `https://www.google.com/maps?q=${lat},${lng}`;
          window.open(url, "_blank");
        }
      );
    }
  };

  const handleSampleId = (id) => {
    setAnimalId(id);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return '#4CAF50';
      case 'Resting': return '#FF9800';
      case 'Moving': return '#2196F3';
      case 'Grazing': return '#8BC34A';
      default: return '#666';
    }
  };

  return (
    <div className="tracking-container">
      {/* Background Pattern */}
      <div className="background-pattern"></div>

      <div className="tracking-content">
        {/* Header Section */}
        <div className="tracking-header">
          <div className="header-icon">📍</div>
          <h1>Animal Tracking System</h1>
          <p>Track your animals in real-time across Varanasi</p>
        </div>

        {/* Main Search Card */}
        <div className="search-card">
          <div className="card-icon">🔍</div>
          <h2>Track Your Animal</h2>
          
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter 12-digit Animal ID"
              value={animalId}
              onChange={(e) => setAnimalId(e.target.value)}
              maxLength={12}
              className="tracking-input"
            />
            <button 
              onClick={handleTrack} 
              className="track-btn"
              disabled={loading}
            >
              {loading ? '🔍 Tracking...' : '📍 Track Now'}
            </button>
          </div>

          <p className="input-hint">Example: 123456789012 (12 digits)</p>

          {/* Sample IDs */}
          <div className="sample-ids">
            <p>📋 Sample Animal IDs:</p>
            <div className="sample-buttons">
              <button onClick={() => handleSampleId("123456789012")}>🐘 123456789012</button>
              <button onClick={() => handleSampleId("111122223333")}>🐬 111122223333</button>
              <button onClick={() => handleSampleId("444455556666")}>🐂 444455556666</button>
              <button onClick={() => handleSampleId("777788889999")}>🐄 777788889999</button>
            </div>
          </div>
        </div>

        {/* Animal Details Card */}
        {animalData && (
          <div className="animal-details-card animate-slideIn">
            <div className="animal-header">
              <span className="animal-emoji">{animalData.image}</span>
              <h3>{animalData.name}</h3>
              <span className="status-badge" style={{ backgroundColor: getStatusColor(animalData.status) }}>
                {animalData.status}
              </span>
            </div>
            
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-icon">🐾</span>
                <div>
                  <strong>Type:</strong> {animalData.type}
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🎨</span>
                <div>
                  <strong>Color:</strong> {animalData.color}
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📅</span>
                <div>
                  <strong>Age:</strong> {animalData.age} years
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🆔</span>
                <div>
                  <strong>ID:</strong> {animalId}
                </div>
              </div>
            </div>

            <div className="location-info">
              <h4>📍 Current Location - Varanasi</h4>
              <div className="location-details">
                <p><strong>Area:</strong> {animalData.area}</p>
                <p><strong>Landmark:</strong> {animalData.landmark}</p>
                <p><strong>Last Seen:</strong> {animalData.lastSeen}</p>
                <p><strong>Caretaker:</strong> {animalData.caretaker}</p>
                <p><strong>Contact:</strong> <a href={`tel:${animalData.contact}`}>{animalData.contact}</a></p>
              </div>
            </div>

            <button 
              className="navigate-btn"
              onClick={() => handleDirectLocation(currentLocation.lat, currentLocation.lng)}
            >
              🗺️ Open in Google Maps
            </button>
          </div>
        )}

        {/* Varanasi Landmarks Section */}
        <div className="landmarks-section">
          <h2>📍 Famous Varanasi Locations</h2>
          <p>Quick navigate to important sites</p>
          
          <div className="landmarks-grid">
            {varanasiLandmarks.map((landmark, index) => (
              <button
                key={index}
                className="landmark-card"
                onClick={() => handleDirectLocation(landmark.lat, landmark.lng)}
              >
                <span className="landmark-emoji">{landmark.name.split(' ')[0]}</span>
                <span className="landmark-name">{landmark.name}</span>
                <span className="directions-icon">→</span>
              </button>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="info-card">
          <div className="info-icon">ℹ️</div>
          <div className="info-content">
            <h3>How It Works</h3>
            <ul>
              <li>✓ Enter the 12-digit ID found on your animal's collar/tag</li>
              <li>✓ System will show real-time location in Varanasi</li>
              <li>✓ Get directions from your current location to the animal</li>
              <li>✓ Contact caretaker directly for more details</li>
              <li>✓ Check last seen time and status</li>
            </ul>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="emergency-card">
          <div className="emergency-icon">🚨</div>
          <div className="emergency-content">
            <h3>Emergency Support - Varanasi</h3>
            <p>🐘 Animal Helpline: <strong>+91 1800-123-4567</strong></p>
            <p>🚑 Forest Department: <strong>+91 542-1234567</strong></p>
            <p>🏥 Veterinary Hospital (BHU): <strong>+91 542-2368492</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tracking;