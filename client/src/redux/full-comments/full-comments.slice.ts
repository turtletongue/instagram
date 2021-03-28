import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RequestOptions } from "../interfaces";
import { RootState } from "../store";

interface FullCommentsState {
  ids: EntityId[];
  entities: any;
  isAuthorsDataLoading: string;
  errorMessage: string | null;
}

export interface IAuthorData {
  id: string;
  avatarUrl: string;
}

const fullCommentsAdapter = createEntityAdapter();

const initialState: FullCommentsState = fullCommentsAdapter.getInitialState({
  isAuthorsDataLoading: "idle",
  errorMessage: null,
});

export const requestAuthorsData = createAsyncThunk(
  "fullComments/requestAuthorsDataStatus",
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

const fullCommentsSlice = createSlice({
  name: "fullComments",
  initialState,
  reducers: {},
  extraReducers: {
    [requestAuthorsData.pending as any]: (state: FullCommentsState) => {
      state.isAuthorsDataLoading = "loading";
      state.errorMessage = null;
    },
    [requestAuthorsData.fulfilled as any]: (
      state: FullCommentsState,
      action: PayloadAction<IAuthorData[]>
    ) => {
      fullCommentsAdapter.upsertMany(state, action.payload);
      state.isAuthorsDataLoading = "idle";
    },
    [requestAuthorsData.rejected as any]: (
      state: FullCommentsState,
      action: PayloadAction<string>
    ) => {
      state.errorMessage = action.payload;
      state.isAuthorsDataLoading = "idle";
    },
  },
});

export const {
  selectAll: selectAllAuthors,
  selectById: selectAuthorById,
} = fullCommentsAdapter.getSelectors((state: RootState) => state.fullComments);

export default fullCommentsSlice.reducer;
