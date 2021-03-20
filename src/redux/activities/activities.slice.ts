import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestOptions } from "../interfaces";
import { IUser } from "../user/user.slice";

export interface IActivity {
  author: IUser;
  type: string;
  activityReceiverContent?: string;
  postId?: number;
}

interface ActivitiesState {
  lastActivities: IActivity[];
  activitiesLoading: string;
  errorMessage: string | null;
}

export const requestLastActivities = createAsyncThunk(
  "activities/requestLastActivitiesStatus",
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

const initialState: ActivitiesState = {
  lastActivities: [],
  activitiesLoading: "idle",
  errorMessage: null,
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {},
  extraReducers: {
    [requestLastActivities.pending as any]: (state: ActivitiesState) => {
      state.activitiesLoading = "loading";
      state.errorMessage = null;
    },
    [requestLastActivities.fulfilled as any]: (
      state: ActivitiesState,
      action: PayloadAction<IActivity[]>
    ) => {
      state.lastActivities = action.payload;
      state.activitiesLoading = "idle";
    },
    [requestLastActivities.rejected as any]: (
      state: ActivitiesState,
      action: PayloadAction<string>
    ) => {
      state.errorMessage = action.payload;
      state.activitiesLoading = "idle";
    },
  },
});

export default activitiesSlice.reducer;
