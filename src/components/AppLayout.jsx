import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Sidebar from "./Sidebar";

// Sidebar + page area. If the user is not signed in, go back to the landing page.
function AppLayout() {
  const { loggedIn, user } = useContext(UserContext);

  if (!loggedIn || !user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app-shell active">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
