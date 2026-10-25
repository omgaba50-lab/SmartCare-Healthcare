import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Brand from "./Brand";

const NAV_ITEMS = [
  { to: "/app/dashboard", icon: "▦", label: "Dashboard" },
  { to: "/app/healthtips", icon: "💚", label: "Health Tips" },
  { to: "/app/diet", icon: "🥗", label: "Diet & Nutrition" },
  { to: "/app/doctors", icon: "🩺", label: "Find Doctors" },
  { to: "/app/appointments", icon: "📅", label: "Appointments" },
  { to: "/app/overview", icon: "❤️", label: "Health Overview" },
  { to: "/app/medicine", icon: "💊", label: "Medicine Awareness" },
  { to: "/app/profile", icon: "👤", label: "Profile" }
];

function Sidebar() {
  const { user, signOut, showToast } = useContext(UserContext);
  const navigate = useNavigate();

  const firstName = (user.name || "there").split(" ")[0];

  function handleSignOut() {
    // Sign out only goes back to the landing page. Saved data is not deleted.
    signOut();
    showToast("Signed out of this device session");
    navigate("/");
  }

  return (
    <aside className="sidebar">
      <Brand />

      <nav className="nav-tabs">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => "nav-btn" + (isActive ? " active" : "")}
          >
            <span className="nav-icon">{item.icon}</span> {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-user">
        <div className="user-row">
          <span className="user-avatar">{firstName.charAt(0).toUpperCase()}</span>
          <div>
            <p className="user-name">{user.name || "—"}</p>
            <p className="user-email">{user.email || "No email set"}</p>
          </div>
        </div>
        <button type="button" className="signout-btn" onClick={handleSignOut}>↩ Sign out</button>
      </div>
    </aside>
  );
}

export default Sidebar;
