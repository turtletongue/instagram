import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchInputState {
  isFocused: boolean;
  inputValue: string;
}

const initialState: SearchInputState = {
  isFocused: false,
  inputValue: "",
};

const searchInputSlice = createSlice({
  name: "searchInput",
  initialState,
  reducers: {
    focusSearchInput: (state: SearchInputState) => {
      state.isFocused = true;
    },
    blurSearchInput: (state: SearchInputState) => {
      state.isFocused = false;
    },
    changeInputValue: (
      state: SearchInputState,
      action: PayloadAction<string>
    ) => {
      state.inputValue = action.payload;
    },
    clearInput: (state: SearchInputState) => {
      state.inputValue = "";
    },
  },
});

export const {
  focusSearchInput,
  blurSearchInput,
  changeInputValue,
  clearInput,
} = searchInputSlice.actions;

export default searchInputSlice.reducer;
