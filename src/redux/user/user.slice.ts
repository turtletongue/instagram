import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestOptions } from "../interfaces";

export interface IUser {
  userId: string;
  avatarUrl: string;
  fullname?: string;
  description?: string;
}

interface UserState {
  currentUser: IUser | null;
  isLoggedIn: boolean;
  signInLoading: string;
  errorMessage: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isLoggedIn: false,
  signInLoading: "idle",
  errorMessage: null,
};

export const requestSignIn = createAsyncThunk(
  "user/requestSignInStatus",
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [requestSignIn.pending as any]: (state: UserState) => {
      state.signInLoading = "loading";
    },
    [requestSignIn.fulfilled as any]: (
      state: UserState,
      action: PayloadAction<IUser>
    ) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.signInLoading = "idle";
    },
    [requestSignIn.rejected as any]: (
      state: UserState,
      action: PayloadAction<string>
    ) => {
      state.errorMessage = action.payload;
      state.signInLoading = "idle";
    },
  },
});

export default userSlice.reducer;
