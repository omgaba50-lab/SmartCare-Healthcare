import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserContext } from "../context/UserContext";
import { TIPS } from "../data/tips";
import { calcBmi } from "../utils";

const WELLNESS_KEY = "smartcare_wellness_tracker";
const HABITS = [
  { value: "water", label: "💧 Drink Water" },
  { value: "activity", label: "🚶 Physical Activity" },
  { value: "meal", label: "🥗 Balanced Meals" }
];
const WELLNESS_MESSAGES = ["Let's get started!", "Good start, keep going!", "Almost there!", "Great job, all habits done! 🎉"];

// Saved habits are only valid for today; a new day starts empty again
function loadDoneHabits() {
  try {
    const saved = JSON.parse(localStorage.getItem(WELLNESS_KEY) || "{}");
    return saved.date === new Date().toDateString() ? saved.done : [];
  } catch (e) {
    return [];
  }
}

function Dashboard() {
  const navigate = useNavigate();
  const { user, appointments } = useContext(UserContext);

  // Redux: favourites list -> count shown in the stat card
  const favourites = useSelector((state) => state.favourites.items);
  const favouriteCount = favourites.filter((id) => TIPS.some((t) => t.id === id)).length;

  const [done, setDone] = useState(loadDoneHabits);
  const [risk, setRisk] = useState({ age: "", activity: "", water: "" });
  const [riskResult, setRiskResult] = useState(null);

  const firstName = (user.name || "there").split(" ")[0];
  const hour = new Date().getHours();
  const greetingWord = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const bmi = calcBmi(user);
  const blood = user.blood || "—";

  let wellnessScore = 70 + Math.min(appointments.length * 5, 20);
  if (user.height && user.weight) wellnessScore += 10;
  wellnessScore = Math.min(wellnessScore, 100);

  function toggleHabit(value) {
    const newDone = done.includes(value) ? done.filter((h) => h !== value) : [...done, value];
    setDone(newDone);
    localStorage.setItem(WELLNESS_KEY, JSON.stringify({ date: new Date().toDateString(), done: newDone }));
  }

  function handleRiskChange(e) {
    setRisk({ ...risk, [e.target.name]: e.target.value });
  }

  // Activity (0-2) + water (0-2) gives a score from 0 to 4. General lifestyle info only.
  function handleRiskSubmit(e) {
    e.preventDefault();
    const age = Number(risk.age);
    const score = Number(risk.activity) + Number(risk.water);

    const summary =
      score <= 1 ? "Your daily activity and hydration have room to improve." :
      score <= 3 ? "You are on the right track with a few habits to improve." :
                   "Great! Your activity and hydration look healthy.";

    const tips = ["Aim for regular sleep and balanced meals."];
    if (risk.activity === "0") tips.push("Try a 15-minute walk every day.");
    if (risk.water !== "2") tips.push("Drink a little more water through the day.");
    tips.push(age >= 60 ? "Gentle walking and stretching are good for you." : "Adults are advised about 150 minutes of moderate activity a week.");

    setRiskResult({ summary, tips });
  }

  return (
    <section className="tab-panel active">
      <div className="panel-top">
        <div>
          <span className="date-pill">✨ {today}</span>
          {/* The user's name comes from UserContext */}
          <h1 className="panel-title">Good <span>{greetingWord}</span>, <em>{firstName}</em>.</h1>
          <p className="panel-sub">Here's a snapshot of your care routine.</p>
        </div>
        <button type="button" className="btn btn-terracotta" onClick={() => navigate("/app/healthtips")}>💚 View Health Tips</button>
      </div>

      <div className="stat-grid four five">
        <div className="card stat-card">
          <div className="stat-top"><span>UPCOMING APPTS</span><span className="stat-ic">📅</span></div>
          <p className="stat-num">{appointments.length}</p>
        </div>
        <div className="card stat-card">
          <div className="stat-top"><span>BMI</span><span className="stat-ic">❤️</span></div>
          <p className="stat-num">{bmi}</p>
        </div>
        <div className="card stat-card">
          <div className="stat-top"><span>TOTAL APPTS</span><span className="stat-ic">📊</span></div>
          <p className="stat-num">{appointments.length}</p>
        </div>
        <div className="card stat-card">
          <div className="stat-top"><span>WELLNESS SCORE</span><span className="stat-ic">♥</span></div>
          <p className="stat-num">{wellnessScore}<span className="stat-of">/100</span></p>
        </div>
        <div className="card stat-card">
          <div className="stat-top"><span>FAVOURITE TIPS</span><span className="stat-ic">❤️</span></div>
          <p className="stat-num">{favouriteCount}</p>
        </div>
      </div>

      <div className="card">
        <div className="card-head"><h3>✅ Daily Wellness Tracker</h3><strong>{done.length}/3</strong></div>
        {HABITS.map((h) => (
          <label className="mini-item" key={h.value}>
            <div>
              <input type="checkbox" checked={done.includes(h.value)} onChange={() => toggleHabit(h.value)} /> {h.label}
            </div>
          </label>
        ))}
        <progress id="wtBar" max="3" value={done.length}></progress>
        <p className="panel-sub">{WELLNESS_MESSAGES[done.length]}</p>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-head"><h3>📅 Upcoming Appointment</h3><Link to="/app/appointments" className="view-all">View all ↗</Link></div>
          {appointments.length === 0 ? (
            <div className="empty-state">
              <p>No upcoming visits</p>
              <span>Book with a specialist to get started.</span>
              <button type="button" className="btn btn-terracotta" onClick={() => navigate("/app/doctors")}>Find a doctor</button>
            </div>
          ) : (
            appointments.slice(0, 3).map((a) => (
              <div className="mini-item" key={a.id}>
                <div><strong>{a.doctor}</strong><span>{a.date} · {a.time}</span></div>
              </div>
            ))
          )}
        </div>
        <div className="card">
          <div className="card-head"><h3>💚 Health Tips</h3><Link to="/app/healthtips" className="view-all">View all ↗</Link></div>
          <div className="tip-grid-mini">
            {TIPS.slice(0, 3).map((t) => (
              <div className="tip-mini-card" key={t.id}>
                <span className="tip-mini-icon">{t.icon}</span>
                <div><h5>{t.title}</h5><p>{t.short}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card health-overview-preview">
        <div className="card-head"><h3>❤️ Health Overview</h3><Link to="/app/overview" className="view-all">View all ↗</Link></div>
        <div className="overview-mini-row">
          <div className="overview-mini-item"><span className="overview-mini-label">BMI</span><span className="overview-mini-value">{bmi}</span></div>
          <div className="overview-mini-item"><span className="overview-mini-label">Age</span><span className="overview-mini-value">{user.age ? user.age + " years" : "—"}</span></div>
          <div className="overview-mini-item"><span className="overview-mini-label">Height</span><span className="overview-mini-value">{user.height ? user.height + " cm" : "—"}</span></div>
          <div className="overview-mini-item"><span className="overview-mini-label">Weight</span><span className="overview-mini-value">{user.weight ? user.weight + " kg" : "—"}</span></div>
          <div className="overview-mini-item"><span className="overview-mini-label">Blood Group</span><span className="overview-mini-value">{blood}</span></div>
        </div>
      </div>

      <div className="card">
        <div className="card-head"><h3>📋 Health Risk Assessment</h3></div>
        <form className="form-grid" onSubmit={handleRiskSubmit}>
          <label>Age
            <input type="number" name="age" min="1" max="120" placeholder="e.g. 21" required value={risk.age} onChange={handleRiskChange} />
          </label>
          <label>Activity level
            <select name="activity" required value={risk.activity} onChange={handleRiskChange}>
              <option value="">Select...</option>
              <option value="0">Low</option>
              <option value="1">Moderate</option>
              <option value="2">High</option>
            </select>
          </label>
          <label className="span-2">Daily water intake
            <select name="water" required value={risk.water} onChange={handleRiskChange}>
              <option value="">Select...</option>
              <option value="0">Less than 1 litre</option>
              <option value="1">1–2 litres</option>
              <option value="2">More than 2 litres</option>
            </select>
          </label>
          <button type="submit" className="btn btn-terracotta">Analyze My Lifestyle</button>
        </form>
        {riskResult && (
          <div className="med-disclaimer">
            <strong>{riskResult.summary}</strong>
            <ul id="riskTips">
              {riskResult.tips.map((tip) => <li key={tip}>{tip}</li>)}
            </ul>
            ⚠ General lifestyle guidance only — not a medical diagnosis or prediction of disease.
          </div>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
