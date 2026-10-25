const DIET_ITEMS = [
  { icon: "🍽️", title: "Balanced Meals", text: "Include grains, protein, vegetables and healthy fats in every meal." },
  { icon: "💧", title: "Hydration", text: "Drink water regularly throughout the day, not just when thirsty." },
  { icon: "🥚", title: "Protein Sources", text: "Eggs, lentils, beans, and lean meats support muscle and tissue repair." },
  { icon: "🍎", title: "Fruits & Vegetables", text: "Aim for a colorful variety to get a broad range of vitamins." },
  { icon: "🌾", title: "Whole Grains", text: "Choose whole wheat, oats and brown rice over refined grains." },
  { icon: "🥑", title: "Healthy Fats", text: "Nuts, seeds and olive oil support heart health in moderation." }
];

function Diet() {
  return (
    <section className="tab-panel active">
      <div className="panel-top">
        <div>
          <span className="date-pill">🥗 Eat well</span>
          <h1 className="panel-title">Diet <em>&amp; nutrition</em></h1>
          <p className="panel-sub">General educational tips for a balanced, healthy diet.</p>
        </div>
      </div>

      <div className="diet-grid">
        {DIET_ITEMS.map((item) => (
          <div className="diet-card" key={item.title}>
            <span className="diet-icon">{item.icon}</span>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}

        <div className="diet-card">
          <svg className="diet-thumb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 112" width="56" height="56" role="img" aria-label="Balanced plate with vegetables, protein and grains">
            <rect width="112" height="112" rx="24" fill="#DCFCE7" />
            <circle cx="56" cy="56" r="42" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2" />
            <circle cx="56" cy="56" r="33" fill="#F8FAF9" />
            <path d="M56 56 L31.75 42 A28 28 0 0 1 80.25 42 Z" fill="#4ADE80" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="48" cy="40" r="3.2" fill="#15803D" />
            <circle cx="58" cy="36" r="3.2" fill="#15803D" />
            <circle cx="67" cy="41" r="3.2" fill="#15803D" />
            <circle cx="57" cy="45" r="2.4" fill="#16A34A" />
            <path d="M56 56 L80.25 42 A28 28 0 0 1 56 84 Z" fill="#F4A261" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
            <ellipse cx="68" cy="62" rx="6.5" ry="4.5" transform="rotate(-35 68 62)" fill="#E76F51" />
            <ellipse cx="62" cy="73" rx="5" ry="3.4" transform="rotate(-35 62 73)" fill="#E76F51" />
            <path d="M56 56 L56 84 A28 28 0 0 1 31.75 42 Z" fill="#FCD34D" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
            <path d="M42 62 q3 -3 6 0 M38 70 q3 -3 6 0 M47 73 q3 -3 6 0 M36 57 q3 -3 6 0" fill="none" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <h4>Build a Balanced Plate</h4>
          <p>Include vegetables, protein sources and whole grains in your meals for variety.</p>
        </div>

        <div className="diet-card">
          <svg className="diet-thumb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 112" width="56" height="56" role="img" aria-label="Bowl of yogurt topped with berries and nuts">
            <rect width="112" height="112" rx="24" fill="#DCFCE7" />
            <path d="M26 60 Q56 28 86 60 Z" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="45" cy="50" r="5.5" fill="#6366F1" />
            <circle cx="45" cy="48.5" r="1.4" fill="#A5B4FC" />
            <circle cx="58" cy="43" r="5.5" fill="#EF4444" />
            <circle cx="56.5" cy="41.5" r="1.2" fill="#FCA5A5" />
            <circle cx="70" cy="51" r="5.5" fill="#6366F1" />
            <circle cx="70" cy="49.5" r="1.4" fill="#A5B4FC" />
            <ellipse cx="53" cy="53" rx="4.2" ry="2.7" transform="rotate(-25 53 53)" fill="#B7791F" />
            <ellipse cx="63" cy="54" rx="4.2" ry="2.7" transform="rotate(20 63 54)" fill="#B7791F" />
            <path d="M22 60 H90 A34 34 0 0 1 22 60 Z" fill="#16A34A" />
            <path d="M34 66 Q40 80 56 84" fill="none" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
            <rect x="44" y="90" width="24" height="4" rx="2" fill="#15803D" />
          </svg>
          <h4>Healthy Snacks</h4>
          <p>Choose simple options such as fruit, nuts or yogurt when you need a snack.</p>
        </div>

        <div className="diet-card">
          <svg className="diet-thumb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 112" width="56" height="56" role="img" aria-label="Glass of water with a water droplet">
            <rect width="112" height="112" rx="24" fill="#DCFCE7" />
            <path d="M30 26 H72 L66.5 88 Q66 94 60 94 H42 Q36 94 35.5 88 Z" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M32.2 46 Q41 41 51 46 T70 46 L66.5 88 Q66 94 60 94 H42 Q36 94 35.5 88 Z" fill="#7DD3FC" />
            <path d="M40 54 L42 82" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
            <path d="M86 28 C86 28 76 40 76 47 A10 10 0 0 0 96 47 C96 40 86 28 86 28 Z" fill="#38BDF8" />
            <path d="M82 47 A4.5 4.5 0 0 0 86.5 51.5" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </svg>
          <h4>Healthy Hydration</h4>
          <p>Keep a water bottle nearby and sip water regularly through the day.</p>
        </div>
      </div>
    </section>
  );
}

export default Diet;
