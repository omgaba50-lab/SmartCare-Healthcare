import { createSlice } from "@reduxjs/toolkit";

const FAV_KEY = "smartcare_favourites";

// Start with whatever favourites were saved in the browser
function loadFavourites() {
  try {
    const list = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
}

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: { items: loadFavourites() },
  reducers: {
    addFavourite(state, action) {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFavourite(state, action) {
      state.items = state.items.filter((id) => id !== action.payload);
    }
  }
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
