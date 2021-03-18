import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestOptions } from "../interfaces";

export interface IEmoji {
  id: number;
  content: string;
}

interface EmojiesState {
  emojiesData: IEmoji[];
  emojiesLoading: string;
  errorMessage: string | null;
}

export const requestEmojies = createAsyncThunk(
  "emojies/requestEmojiesStatus",
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

const initialState: EmojiesState = {
  emojiesData: [],
  emojiesLoading: "idle",
  errorMessage: null,
};

const emojiesSlice = createSlice({
  name: "emojies",
  initialState,
  reducers: {},
  extraReducers: {
    [requestEmojies.pending as any]: (state: EmojiesState) => {
      state.emojiesLoading = "loading";
      state.errorMessage = null;
    },
    [requestEmojies.fulfilled as any]: (
      state: EmojiesState,
      action: PayloadAction<IEmoji[]>
    ) => {
      state.emojiesLoading = "idle";
      state.emojiesData = action.payload;
    },
    [requestEmojies.rejected as any]: (
      state: EmojiesState,
      action: PayloadAction<string>
    ) => {
      state.emojiesLoading = "idle";
      state.errorMessage = action.payload;
    },
  },
});

export default emojiesSlice.reducer;
