import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestOptions } from "../interfaces";

interface SignInState {
  images: string[];
  currentSlideId: number;
  errorMessage: string | null;
  pageLoading: string;
  login: string;
  password: string;
  isPasswordVisible: boolean;
}

const initialState: SignInState = {
  images: [],
  currentSlideId: 0,
  errorMessage: null,
  pageLoading: "idle",
  login: "",
  password: "",
  isPasswordVisible: false,
};

export const requestSliderImages = createAsyncThunk(
  "signIn/requestImagesStatus",
  async (requestOptions: RequestOptions, thunkAPI) => {
    if (requestOptions.testData) {
      return requestOptions.testData;
    }
    try {
      const res = await fetch("URL", {
        method: "POST",
        body: requestOptions.query,
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    finishPageLoading: (state: SignInState) => {
      state.pageLoading = "idle";
    },
    nextSlide: (state: SignInState) => {
      state.currentSlideId =
        state.currentSlideId >= state.images.length - 1
          ? 0
          : state.currentSlideId + 1;
    },
    changeLoginInput: (state: SignInState, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
    changePasswordInput: (
      state: SignInState,
      action: PayloadAction<string>
    ) => {
      state.password = action.payload;
    },
    hidePassword: (state: SignInState) => {
      state.isPasswordVisible = false;
    },
    showPassword: (state: SignInState) => {
      state.isPasswordVisible = true;
    },
    clearInputs: (state: SignInState) => {
      state.login = "";
      state.password = "";
    },
  },
  extraReducers: {
    [requestSliderImages.pending as any]: (state: SignInState) => {
      state.pageLoading = "loading";
    },
    [requestSliderImages.fulfilled as any]: (
      state: SignInState,
      action: PayloadAction<Array<string>>
    ) => {
      state.images = action.payload;
    },
    [requestSliderImages.rejected as any]: (
      state: SignInState,
      action: PayloadAction<string>
    ) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  finishPageLoading,
  nextSlide,
  changeLoginInput,
  changePasswordInput,
  hidePassword,
  showPassword,
  clearInputs,
} = signInSlice.actions;

export default signInSlice.reducer;
