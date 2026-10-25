import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { DOCTORS } from "../data/doctors";

const TIME_SLOTS = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "04:30 PM", "06:00 PM"];

function Appointments() {
  const location = useLocation();
  const { appointments, addAppointment, cancelAppointment, showToast } = useContext(UserContext);

  // If the user clicked "Book" on a doctor card, that doctor is pre-selected
  const [form, setForm] = useState({
    doctor: location.state?.doctor || DOCTORS[0].name,
    date: "",
    time: TIME_SLOTS[0],
    reason: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addAppointment({
      id: Date.now(),
      doctor: form.doctor,
      date: form.date,
      time: form.time,
      reason: form.reason.trim()
    });
    setForm({ doctor: DOCTORS[0].name, date: "", time: TIME_SLOTS[0], reason: "" });
    showToast("Appointment booked!");
  }

  function handleCancel(id) {
    cancelAppointment(id);
    showToast("Appointment cancelled");
  }

  return (
    <section className="tab-panel active">
      <div className="panel-top">
        <div>
          <span className="date-pill">📅 Book &amp; manage</span>
          <h1 className="panel-title">Your <em>appointments</em></h1>
        </div>
      </div>

      <div className="card">
        <h3>Book a new appointment</h3>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>Doctor / Hospital
            <select name="doctor" value={form.doctor} onChange={handleChange} required>
              {DOCTORS.map((d) => (
                <option key={d.name} value={d.name}>{d.name} — {d.spec}</option>
              ))}
            </select>
          </label>
          <label>Date
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
          </label>
          <label>Time slot
            <select name="time" value={form.time} onChange={handleChange} required>
              {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <label>Reason <span className="optional-tag">optional</span>
            <input type="text" name="reason" value={form.reason} onChange={handleChange} placeholder="e.g. Routine checkup" />
          </label>
          <button type="submit" className="btn btn-terracotta">Book appointment</button>
        </form>
      </div>

      <div className="card">
        <h3>Your appointments</h3>
        <div className="list-with-actions">
          {appointments.length === 0 && <p className="empty-note">No appointments booked yet.</p>}
          {appointments.map((a) => (
            <div className="list-item" key={a.id}>
              <div className="list-item-info">
                <strong>{a.doctor}</strong>
                <span>{a.date} at {a.time}{a.reason ? " · " + a.reason : ""}</span>
              </div>
              <button type="button" className="list-item-remove" onClick={() => handleCancel(a.id)}>Cancel</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Appointments;
