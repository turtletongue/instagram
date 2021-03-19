import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../feed/feed.slice";
import { RequestOptions } from "../interfaces";

interface PostPageState {
  post: IPost | null;
  postLoading: string;
  errorMessage: string | null;
}

const initialState: PostPageState = {
  post: null,
  postLoading: "idle",
  errorMessage: null,
};

export const requestPostById = createAsyncThunk(
  "postPage/requestPostByIdStatus",
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

const postPageSlice = createSlice({
  name: "postPage",
  initialState,
  reducers: {},
  extraReducers: {
    [requestPostById.pending as any]: (state: PostPageState) => {
      state.postLoading = "loading";
      state.errorMessage = null;
    },
    [requestPostById.fulfilled as any]: (
      state: PostPageState,
      action: PayloadAction<IPost>
    ) => {
      state.post = action.payload;
      state.errorMessage = null;
      state.postLoading = "idle";
    },
    [requestPostById.rejected as any]: (
      state: PostPageState,
      action: PayloadAction<string>
    ) => {
      state.postLoading = "idle";
      state.errorMessage = action.payload;
    },
  },
});

export default postPageSlice.reducer;
