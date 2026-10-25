const MEDICINES = [
  { category: "Analgesic", name: "Paracetamol", text: "Commonly used for temporary relief of mild pain and fever. Also sold under various brand names.", safety: "Follow the product label and seek professional advice when needed" },
  { category: "NSAID", name: "Ibuprofen", text: "Commonly used for temporary relief of pain and inflammation.", safety: "Follow label directions and check whether it is appropriate for you" },
  { category: "Antihistamine", name: "Cetirizine", text: "Commonly used to relieve allergy symptoms such as sneezing and itching.", safety: "May cause drowsiness in some people" },
  { category: "Antihistamine", name: "Loratadine", text: "Used for seasonal allergy relief, generally considered non-drowsy.", safety: "Check for interactions with other medications" },
  { category: "Antacid", name: "Antacid Medicines", text: "General category used to relieve heartburn and acid indigestion.", safety: "Space out from other medicines" },
  { category: "Rehydration", name: "Oral Rehydration Solution", text: "Used to help restore fluids and salts lost during dehydration.", safety: "Prepare and use as directed on the packet" },
  { category: "Topical", name: "Topical Antiseptic", text: "Used on the skin to help clean minor cuts and wounds.", safety: "For external use only" },
  { category: "Topical", name: "Topical Antifungal", text: "General category used for common fungal skin conditions.", safety: "Complete the full course as labeled" },
  { category: "Nasal Care", name: "Saline Nasal Spray", text: "Used to relieve nasal congestion and dryness.", safety: "Generally safe for regular use, check label" },
  { category: "Antacid", name: "Antiflatulent", text: "General category used to relieve bloating and gas discomfort.", safety: "Follow label directions" },
  { category: "Analgesic", name: "Topical Pain Relief Gel", text: "Used on the skin for minor muscle and joint discomfort.", safety: "Avoid applying to broken skin" },
  { category: "Cough & Cold", name: "Cough Syrup (General)", text: "General category used for temporary relief of mild cough symptoms.", safety: "Check age suitability on the label" },
  { category: "Rehydration", name: "ORS Sachets", text: "Commonly used after mild dehydration episodes, such as from heat or minor illness.", safety: "Use clean water to prepare" },
  { category: "Vitamin Supplement", name: "Multivitamin Supplement", text: "Used to support general nutritional needs alongside a balanced diet.", safety: "Not a substitute for food" },
  { category: "Mineral Supplement", name: "Vitamin C Supplement", text: "Commonly used to support general immune and dietary needs.", safety: "Check recommended intake on the label" },
  { category: "Antiseptic", name: "Hand Sanitizer", text: "Used for general hand hygiene when soap and water aren't available.", safety: "For external use only" },
  { category: "Eye Care", name: "Lubricating Eye Drops", text: "Used for temporary relief of dry or tired eyes.", safety: "Avoid touching the tip to your eye" },
  { category: "Cough & Cold", name: "Throat Lozenges", text: "Commonly used to soothe minor throat irritation.", safety: "Check age suitability on the label" }
];

function MedicineAwareness() {
  return (
    <section className="tab-panel active">
      <div className="panel-top">
        <div>
          <span className="date-pill">💊 Know your options</span>
          <h1 className="panel-title">Medicine <em>awareness</em></h1>
          <p className="panel-sub">Common medicines and their general uses — educational information only.</p>
        </div>
      </div>

      <p className="med-disclaimer med-disclaimer-top">⚠ Educational information only. Do not start, stop, or change medication without advice from a qualified doctor or pharmacist.</p>

      <div className="med-awareness-grid">
        {MEDICINES.map((m) => (
          <div className="med-info-card" key={m.name}>
            <span className="med-category">{m.category}</span>
            <h4>{m.name}</h4>
            <p>{m.text}</p>
            <span className="med-safety">⚠ {m.safety}</span>
          </div>
        ))}
      </div>

      <p className="med-disclaimer">⚠ Educational information only. Do not start, stop, or change medication without advice from a qualified doctor or pharmacist.</p>
    </section>
  );
}

export default MedicineAwareness;
