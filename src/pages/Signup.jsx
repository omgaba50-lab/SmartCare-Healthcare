import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// Signup / profile creation form — React form handling with useState,
// onChange, onSubmit and simple validation.
function Signup() {
  const navigate = useNavigate();
  const { setUser, signIn, showToast } = useContext(UserContext);

  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    gender: "Prefer not to say",
    height: "",
    weight: "",
    allergies: "",
    conditions: ""
  });
  const [errors, setErrors] = useState({});

  // onChange: update the value of whichever input changed
  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};

    if (!values.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (values.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (values.email.trim() && !/^\S+@\S+\.\S+$/.test(values.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!values.age) {
      newErrors.age = "Age is required";
    } else if (Number(values.age) < 1 || Number(values.age) > 120) {
      newErrors.age = "Age must be between 1 and 120";
    }

    if (values.height && (Number(values.height) < 50 || Number(values.height) > 250)) {
      newErrors.height = "Height must be between 50 and 250 cm";
    }

    if (values.weight && (Number(values.weight) < 10 || Number(values.weight) > 300)) {
      newErrors.weight = "Weight must be between 10 and 300 kg";
    }

    return newErrors;
  }

  // onSubmit: validate, then save the profile and open the dashboard
  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setUser({
      name: values.name.trim(),
      email: values.email.trim(),
      age: values.age,
      gender: values.gender,
      height: values.height,
      weight: values.weight,
      allergies: values.allergies.trim(),
      conditions: values.conditions.trim(),
      blood: ""
    });
    signIn();
    navigate("/app/dashboard");
    showToast("Profile created — welcome to SmartCare AI!");
  }

  return (
    <section className="screen setup-screen active">
      <div className="setup-card">
        <span className="eyebrow-pill">Your info</span>
        <h2>Tell us about you</h2>
        <p className="setup-sub">This stays on this device only, in your browser. You can edit it anytime.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label>Full name
              <input type="text" name="name" value={values.name} onChange={handleChange} placeholder="e.g. Om Gaba" className={errors.name ? "input-error" : ""} />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </label>
            <label>Email <span className="optional-tag">optional</span>
              <input type="email" name="email" value={values.email} onChange={handleChange} placeholder="you@example.com" className={errors.email ? "input-error" : ""} />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </label>
          </div>
          <div className="form-row">
            <label>Age
              <input type="number" name="age" value={values.age} onChange={handleChange} placeholder="21" className={errors.age ? "input-error" : ""} />
              {errors.age && <span className="error-text">{errors.age}</span>}
            </label>
            <label>Gender
              <select name="gender" value={values.gender} onChange={handleChange}>
                <option value="Prefer not to say">Prefer not to say</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>Height (cm) <span className="optional-tag">optional</span>
              <input type="number" name="height" value={values.height} onChange={handleChange} placeholder="170" className={errors.height ? "input-error" : ""} />
              {errors.height && <span className="error-text">{errors.height}</span>}
            </label>
            <label>Weight (kg) <span className="optional-tag">optional</span>
              <input type="number" name="weight" value={values.weight} onChange={handleChange} placeholder="65" className={errors.weight ? "input-error" : ""} />
              {errors.weight && <span className="error-text">{errors.weight}</span>}
            </label>
          </div>
          <label>Known allergies <span className="optional-tag">optional</span>
            <input type="text" name="allergies" value={values.allergies} onChange={handleChange} placeholder="e.g. Peanuts, Penicillin" />
          </label>
          <label>Existing conditions <span className="optional-tag">optional</span>
            <input type="text" name="conditions" value={values.conditions} onChange={handleChange} placeholder="e.g. Asthma, Diabetes" />
          </label>

          <button type="submit" className="btn btn-terracotta btn-lg">Create dashboard →</button>
        </form>
      </div>
    </section>
  );
}

export default Signup;
