import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./favouritesSlice";

const store = configureStore({
  reducer: {
    favourites: favouritesReducer
  }
});

// Keep favourites saved in the browser (same key as the original project)
store.subscribe(() => {
  localStorage.setItem("smartcare_favourites", JSON.stringify(store.getState().favourites.items));
});

export default store;
