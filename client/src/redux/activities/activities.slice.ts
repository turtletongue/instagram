import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../constants";
import { GraphqlQuery } from "../interfaces";
import { IUser } from "../user/user.slice";

export interface IActivity {
  id: number;
  author: IUser;
  content: string;
}

interface ActivitiesState {
  lastActivities: IActivity[];
  activitiesLoading: string;
  errorMessage: string | null;
}

interface RequestLastActivitiesJSON {
  data: {
    getUserActivities: IActivity[];
  };
}

export const requestLastActivities = createAsyncThunk(
  "activities/requestLastActivitiesStatus",
  async (token: string, thunkAPI) => {
    const graphqlQuery: GraphqlQuery = {
      query: `
        {
          getUserActivities {
            id
            author {
              id
              username
              name
              avatarUrl
              bio
            }
            content
          }
        }
      `,
    };
    try {
      const res = await fetch(SERVER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
      });
      const json: RequestLastActivitiesJSON = await res.json();
      return json.data.getUserActivities;
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
