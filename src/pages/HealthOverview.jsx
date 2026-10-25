import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { calcBmi } from "../utils";

function HealthOverview() {
  const { user } = useContext(UserContext);

  const cards = [
    { label: "BMI", value: calcBmi(user) },
    { label: "AGE", value: user.age ? user.age + " years" : "—" },
    { label: "HEIGHT", value: user.height ? user.height + " cm" : "—" },
    { label: "WEIGHT", value: user.weight ? user.weight + " kg" : "—" },
    { label: "BLOOD GROUP", value: user.blood || "—" }
  ];

  return (
    <section className="tab-panel active">
      <div className="panel-top">
        <div>
          <span className="date-pill">❤️ Your snapshot</span>
          <h1 className="panel-title">Health <em>overview</em></h1>
          <p className="panel-sub">A quick snapshot built from your profile information.</p>
        </div>
      </div>

      <div className="overview-cards-grid">
        {cards.map((c) => (
          <div className="card overview-card" key={c.label}>
            <p className="overview-label">{c.label}</p>
            <p className="overview-value">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <p className="med-disclaimer" style={{ margin: 0 }}>This overview is based only on the details saved in your Profile. Update your profile to keep it accurate.</p>
      </div>
    </section>
  );
}

export default HealthOverview;
