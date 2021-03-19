import { createSlice } from "@reduxjs/toolkit";

interface HeaderState {
  isActivitiesOpen: boolean;
}

const initialState: HeaderState = {
  isActivitiesOpen: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    showActivities: (state: HeaderState) => {
      state.isActivitiesOpen = true;
    },
    hideActivities: (state: HeaderState) => {
      state.isActivitiesOpen = false;
    },
  },
});

export const { showActivities, hideActivities } = headerSlice.actions;

export default headerSlice.reducer;
