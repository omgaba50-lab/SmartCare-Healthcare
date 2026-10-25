import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Brand from "../components/Brand";

function Landing() {
  const navigate = useNavigate();
  const { user, signIn, showToast } = useContext(UserContext);

  function goToSignup() {
    navigate("/signup");
  }

  // "Sign in" enters the dashboard if a profile already exists on this device
  function handleSignIn() {
    if (user) {
      signIn();
      navigate("/app/dashboard");
    } else {
      showToast("No profile found on this device yet — let's create one");
      navigate("/signup");
    }
  }

  return (
    <div className="screen landing-screen active">

      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className="site-nav">
            <a href="#features">Features</a>
            <a href="#specialists">Specialists</a>
            <a href="#how-it-works">How it works</a>
            <a href="#wellness">Wellness</a>
          </nav>
          <div className="header-actions">
            <button type="button" className="link-btn" onClick={handleSignIn}>Sign in</button>
            <button type="button" className="btn btn-terracotta" onClick={goToSignup}>Get started →</button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="pill">✨ Intelligent healthcare, made human</span>
            <h1 className="hero-title">Your <em>calm</em> corner<br />of the clinic.</h1>
            <p className="hero-sub">SmartCare AI brings doctors, appointments, health information and wellness resources together in one simple place.</p>
            <div className="hero-btns">
              <button type="button" className="btn btn-terracotta btn-lg" onClick={goToSignup}>Start free — no card →</button>
              <button type="button" className="btn btn-forest-outline btn-lg" onClick={handleSignIn}>I already have an account</button>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack">
                <span style={{ background: "#e8b4a0" }}>AK</span>
                <span style={{ background: "#a0c8b4" }}>RS</span>
                <span style={{ background: "#c8a0b4" }}>PN</span>
                <span style={{ background: "#a0b4c8" }}>VS</span>
              </div>
              <p><strong>12 healthcare specializations</strong> in one simple place</p>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-art hero-photo">
              <img src="https://images.unsplash.com/photo-1758691462430-81160850496c?fm=jpg&q=80&w=700&h=790&fit=crop&auto=format" alt="Doctor warmly consulting with a patient and family" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <div className="ticker">
        <div className="ticker-track">
          <span>Find Doctors</span><span>·</span>
          <span>Easy Appointments</span><span>·</span>
          <span>Health Tips</span><span>·</span>
          <span>Health Overview</span><span>·</span>
          <span>Medicine Awareness</span><span>·</span>
          <span>Diet &amp; Nutrition</span><span>·</span>
          <span>Nearby Care</span><span>·</span>
          <span>12 Specializations</span><span>·</span>
          <span>Privacy-first Health Profile</span><span>·</span>
          <span>Find Doctors</span><span>·</span>
          <span>Easy Appointments</span><span>·</span>
          <span>Health Tips</span><span>·</span>
          <span>Health Overview</span><span>·</span>
          <span>Wellness Resources</span><span>·</span>
        </div>
      </div>

      <section className="section" id="features">
        <span className="eyebrow-pill">Six systems, one platform</span>
        <h2 className="section-title">Care that <em>shows up</em><br />before you need it.</h2>
        <p className="section-sub">Every tool is designed to reduce cognitive load — no bureaucratic dashboards, no upsells, just a clear next step.</p>

        <div className="feature-grid">
          <div className="feature-card">
            <span className="feature-icon">💚</span>
            <h3>Health Tips</h3>
            <p>Explore simple wellness, sleep, activity and healthy-living information.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🩺</span>
            <h3>Find the right doctor</h3>
            <p>Explore doctors by specialization and nearby care options.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📅</span>
            <h3>Appointments</h3>
            <p>View and manage your healthcare appointments in one place.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">❤️</span>
            <h3>Health Overview</h3>
            <p>Keep key health information such as BMI, age, height and weight organized.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💊</span>
            <h3>Medicine Awareness</h3>
            <p>Explore general educational information about common medicines.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📍</span>
            <h3>Nearby Care</h3>
            <p>Discover clinics, hospitals and healthcare options close to your location.</p>
          </div>
        </div>
      </section>

      <section className="section" id="specialists">
        <span className="eyebrow-pill">Care networks</span>
        <h2 className="section-title">12 specializations.<br /><em>One trusted list.</em></h2>

        <div className="spec-pills">
          <span>Cardiology</span><span>Dermatology</span><span>Pediatrics</span>
          <span>Neurology</span><span>Gynecology</span><span>Orthopedics</span>
          <span>Psychiatry</span><span>ENT</span><span>Dental</span>
          <span>Endocrinology</span><span>General Physician</span><span>Ophthalmology</span>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="how-inner">
          <div className="how-copy">
            <span className="eyebrow-pill">How it works</span>
            <h2 className="section-title">Three steps.<br /><em>Zero clutter.</em></h2>

            <div className="step-row">
              <span className="step-num">01</span>
              <div><h4>Create your profile</h4><p>Add your basic health information and preferences.</p></div>
            </div>
            <div className="step-row">
              <span className="step-num">02</span>
              <div><h4>Find and book</h4><p>Explore doctors and manage your healthcare appointments.</p></div>
            </div>
            <div className="step-row">
              <span className="step-num">03</span>
              <div><h4>Stay informed</h4><p>Use Health Overview, Health Tips, Diet &amp; Nutrition and Medicine Awareness resources.</p></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-art hero-photo">
              <img src="https://images.unsplash.com/photo-1758691462321-9b6c98c40f7e?fm=jpg&q=80&w=700&h=790&fit=crop&auto=format" alt="Doctor warmly talking with a patient, communication-focused care" loading="lazy" />
            </div>
            <div className="floating-card">
              <p className="fc-rating">★ 4.9/5</p>
              <p className="fc-sub">from 12k+ patients</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="wellness">
        <div className="cta-box">
          <div>
            <h2 className="cta-title">Ready to build a<br /><em>healthier</em> routine?</h2>
            <p>Set up your profile, book your first appointment, and explore a personalized wellness plan — completely free.</p>
          </div>
          <button type="button" className="btn btn-terracotta btn-lg" onClick={goToSignup}>Create your free account →</button>
        </div>
      </section>

      <footer className="site-footer">
        <p>© 2026 SmartCare AI. This platform provides general guidance only and is not a substitute for professional medical advice.</p>
      </footer>
    </div>
  );
}

export default Landing;
