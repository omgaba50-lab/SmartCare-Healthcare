import { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import AppLayout from "./components/AppLayout";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import HealthTips from "./pages/HealthTips";
import Diet from "./pages/Diet";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import HealthOverview from "./pages/HealthOverview";
import MedicineAwareness from "./pages/MedicineAwareness";
import Profile from "./pages/Profile";

function App() {
  const { toast } = useContext(UserContext);
  const { pathname } = useLocation();

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="healthtips" element={<HealthTips />} />
          <Route path="diet" element={<Diet />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="overview" element={<HealthOverview />} />
          <Route path="medicine" element={<MedicineAwareness />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <div className={"toast" + (toast.show ? " show" : "")}>{toast.text}</div>
    </>
  );
}

export default App;
