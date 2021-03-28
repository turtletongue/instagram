import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestOptions } from "../interfaces";
import { IUser } from "../user/user.slice";

interface SearchInputState {
  isFocused: boolean;
  inputValue: string;
  searchResult: IUser[];
  searchLoading: string;
  isPopoverOpen: boolean;
  errorMessage: string | null;
}

export const requestUsersSearch = createAsyncThunk(
  "searchInput/requestUsersSearchStatus",
  async (requestOptions: RequestOptions, thunkAPI) => {
    if (requestOptions.testData) {
      return requestOptions.testData;
    }
    try {
      const res = await fetch("URL", {
        method: "POST",
        body: JSON.stringify(requestOptions.query),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState: SearchInputState = {
  isFocused: false,
  inputValue: "",
  searchResult: [],
  searchLoading: "idle",
  isPopoverOpen: false,
  errorMessage: null,
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
    openPopover: (state: SearchInputState) => {
      state.isPopoverOpen = true;
    },
    closePopover: (state: SearchInputState) => {
      state.isPopoverOpen = false;
    },
  },
  extraReducers: {
    [requestUsersSearch.pending as any]: (state: SearchInputState) => {
      state.searchLoading = "loading";
      state.errorMessage = null;
    },
    [requestUsersSearch.fulfilled as any]: (
      state: SearchInputState,
      action: PayloadAction<IUser[]>
    ) => {
      state.searchResult = action.payload;
      state.searchLoading = "idle";
    },
    [requestUsersSearch.rejected as any]: (
      state: SearchInputState,
      action: PayloadAction<string>
    ) => {
      state.errorMessage = action.payload;
      state.searchLoading = "idle";
    },
  },
});

export const {
  focusSearchInput,
  blurSearchInput,
  changeInputValue,
  clearInput,
  openPopover,
  closePopover,
} = searchInputSlice.actions;

export default searchInputSlice.reducer;
