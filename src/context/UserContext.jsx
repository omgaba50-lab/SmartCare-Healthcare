import { createContext, useState } from "react";

// UserContext shares the user's profile (name, email, age...), the signed-in
// state, appointments and the toast message with every component.

export const UserContext = createContext();

const PROFILE_KEY = "smartcare_profile";
const APPOINTMENTS_KEY = "smartcare_appointments";

function loadProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || "null");
  } catch (e) {
    return null;
  }
}

function loadAppointments() {
  try {
    return JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

export function UserProvider({ children }) {
  const [user, setUserState] = useState(loadProfile);
  const [loggedIn, setLoggedIn] = useState(false);
  const [appointments, setAppointments] = useState(loadAppointments);
  const [toast, setToast] = useState({ text: "", show: false });

  function setUser(profile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    setUserState(profile);
  }

  function signIn() {
    setLoggedIn(true);
  }

  function signOut() {
    setLoggedIn(false);
  }

  function addAppointment(appt) {
    const list = [...appointments, appt];
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(list));
    setAppointments(list);
  }

  function cancelAppointment(id) {
    const list = appointments.filter((a) => a.id !== id);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(list));
    setAppointments(list);
  }

  function showToast(text) {
    setToast({ text, show: true });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 2200);
  }

  const value = {
    user,
    setUser,
    loggedIn,
    signIn,
    signOut,
    appointments,
    addAppointment,
    cancelAppointment,
    toast,
    showToast
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
