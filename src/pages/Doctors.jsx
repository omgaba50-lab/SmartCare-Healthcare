import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DOCTORS } from "../data/doctors";

const SPEC_FILTERS = ["All", "General Physician", "Cardiologist", "Dermatologist", "Pediatrician", "Dentist", "Orthopedic"];

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function initials(name) {
  return name.replace("Dr. ", "").split(" ").map((w) => w[0]).join("").slice(0, 2);
}

function Doctors() {
  const navigate = useNavigate();
  const [activeSpec, setActiveSpec] = useState("All");
  const [inputText, setInputText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [locateStatus, setLocateStatus] = useState("Location not shared yet");

  function handleSearch() {
    setSearchTerm(inputText.trim().toLowerCase());
  }

  function handleLocate() {
    if (!navigator.geolocation) {
      setLocateStatus("Geolocation not supported in this browser");
      return;
    }
    setLocateStatus("Locating...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocateStatus("Location shared — showing nearest first");
      },
      () => setLocateStatus("Location access denied — showing full list")
    );
  }

  // Filter by specialization and search text, then sort by distance if location is known
  let list = DOCTORS.filter((d) => activeSpec === "All" || d.spec === activeSpec);
  if (searchTerm) {
    list = list.filter((d) => (d.name + d.spec + d.place).toLowerCase().includes(searchTerm));
  }
  if (userLocation) {
    list = list.map((d) => ({ ...d, distance: haversineKm(userLocation.lat, userLocation.lng, d.lat, d.lng) }));
    list.sort((a, b) => a.distance - b.distance);
  }

  return (
    <section className="tab-panel active">
      <div className="panel-top">
        <div>
          <span className="date-pill">🩺 {list.length} verified specialists</span>
          <h1 className="panel-title">Find your <em>specialist</em></h1>
          <p className="panel-sub">Browse doctors by specialization, hospital, or location.</p>
        </div>
      </div>

      <div className="card finder-controls">
        <div className="search-row">
          <input
            type="text"
            placeholder="Search doctors, hospitals, locations..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
          />
          <button type="button" className="btn btn-forest" onClick={handleSearch}>Search</button>
        </div>
        <button type="button" className="btn btn-ghost" onClick={handleLocate}>📍 Use my location</button>
        <span className="locate-status">{locateStatus}</span>
      </div>

      <div className="spec-filter-row">
        {SPEC_FILTERS.map((spec) => (
          <button
            key={spec}
            type="button"
            className={"filter-pill" + (activeSpec === spec ? " active" : "")}
            onClick={() => setActiveSpec(spec)}
          >
            {spec}
          </button>
        ))}
      </div>

      <div className="doctor-grid">
        {list.length === 0 && <p className="empty-note">No doctors match that search.</p>}
        {list.map((d) => (
          <div className="doctor-card" key={d.name}>
            <div className="doctor-top">
              <span className="doctor-avatar">{initials(d.name)}</span>
              <div>
                <h4>{d.name}</h4>
                <p className="doctor-spec">{d.spec}</p>
                <p className="doctor-place">{d.place}{d.distance !== undefined ? " · " + d.distance.toFixed(1) + " km" : ""}</p>
              </div>
            </div>
            <div className="doctor-meta-row">
              <span>★ <strong>{d.rating}</strong></span>
              <span><strong>{d.exp}</strong> yrs exp</span>
              <span><strong>₹{d.fee}</strong></span>
            </div>
            <div className="doctor-tags">{d.langs.map((l) => <span key={l}>{l}</span>)}</div>
            <div className="doctor-actions">
              <button
                type="button"
                className="btn btn-terracotta"
                onClick={() => navigate("/app/appointments", { state: { doctor: d.name } })}
              >
                Book →
              </button>
              <a className="map-link" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${d.lat},${d.lng}`}>View on map</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Doctors;
