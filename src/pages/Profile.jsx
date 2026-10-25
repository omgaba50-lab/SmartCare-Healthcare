import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { calcBmi } from "../utils";

function Profile() {
  const { user, setUser, showToast } = useContext(UserContext);

  const [form, setForm] = useState({
    name: user.name || "",
    age: user.age || "",
    gender: user.gender || "Prefer not to say",
    blood: user.blood || "",
    height: user.height || "",
    weight: user.weight || "",
    email: user.email || "",
    allergies: user.allergies || "",
    conditions: user.conditions || ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setUser({
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      allergies: form.allergies.trim(),
      conditions: form.conditions.trim()
    });
    showToast("Profile updated");
  }

  function handleReset() {
    if (window.confirm("This will clear your profile and appointments from this browser. Continue?")) {
      localStorage.removeItem("smartcare_profile");
      localStorage.removeItem("smartcare_appointments");
      localStorage.removeItem("smartcare_favourites");
      localStorage.removeItem("smartcare_wellness_tracker");
      window.location.href = "/";
    }
  }

  return (
    <section className="tab-panel active">
      <div className="panel-top">
        <div>
          <span className="date-pill">👤 Your info</span>
          <h1 className="panel-title">Health <em>profile</em></h1>
        </div>
      </div>

      <div className="profile-summary-grid">
        <div className="card summary-card">
          <p className="summary-label">FULL NAME</p>
          <p className="summary-value">{user.name || "—"}</p>
        </div>
        <div className="card summary-card">
          <p className="summary-label">EMAIL</p>
          <p className="summary-value small">{user.email || "Not set"}</p>
        </div>
        <div className="card summary-card">
          <p className="summary-label">BMI</p>
          <p className="summary-value">{calcBmi(user)}</p>
        </div>
      </div>

      <div className="card">
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>Name
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>Age
            <input type="number" name="age" min="1" max="120" value={form.age} onChange={handleChange} required />
          </label>
          <label>Gender
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="Prefer not to say">Prefer not to say</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>Blood group <span className="optional-tag">optional</span>
            <select name="blood" value={form.blood} onChange={handleChange}>
              <option value="">—</option>
              <option>A+</option><option>A-</option>
              <option>B+</option><option>B-</option>
              <option>AB+</option><option>AB-</option>
              <option>O+</option><option>O-</option>
            </select>
          </label>
          <label>Height (cm) <span className="optional-tag">optional</span>
            <input type="number" name="height" value={form.height} onChange={handleChange} />
          </label>
          <label>Weight (kg) <span className="optional-tag">optional</span>
            <input type="number" name="weight" value={form.weight} onChange={handleChange} />
          </label>
          <label className="span-2">Email <span className="optional-tag">optional</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} />
          </label>
          <label className="span-2">Allergies
            <input type="text" name="allergies" value={form.allergies} onChange={handleChange} />
          </label>
          <label className="span-2">Existing conditions
            <input type="text" name="conditions" value={form.conditions} onChange={handleChange} />
          </label>
          <button type="submit" className="btn btn-terracotta span-2">💾 Save profile</button>
        </form>
      </div>

      <div className="card danger-zone">
        <h3>Reset data</h3>
        <p>This clears your profile and appointments from this browser.</p>
        <button type="button" className="btn btn-danger" onClick={handleReset}>Clear all data</button>
      </div>
    </section>
  );
}

export default Profile;
