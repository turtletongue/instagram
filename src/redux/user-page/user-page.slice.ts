import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../feed/feed.slice";
import { RequestOptions } from "../interfaces";
import { IUser } from "../user/user.slice";

export const POSTS: string = "POSTS";

export const SAVED: string = "SAVED";

interface UserPageState {
  category: string;
  hoveredPostsIds: number[];
  user: IUser | null;
  userLoading: string;
  userPosts: IPost[];
  userPostsLoading: string;
  userSaved: IPost[];
  userSavedLoading: string;
  errorMessage: string | null;
}

const initialState: UserPageState = {
  category: POSTS,
  hoveredPostsIds: [],
  user: null,
  userLoading: "idle",
  userPosts: [],
  userPostsLoading: "idle",
  userSaved: [],
  userSavedLoading: "idle",
  errorMessage: null,
};

export const requestUserPosts = createAsyncThunk(
  "userPage/requestUserPostsStatus",
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

export const requestUserData = createAsyncThunk(
  "userPage/requestUserDataStatus",
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

export const requestUserSaved = createAsyncThunk(
  "userPage/requestUserSavedStatus",
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

const userPageSlice = createSlice({
  name: "userPage",
  initialState,
  reducers: {
    showPosts: (state: UserPageState) => {
      state.category = POSTS;
    },
    showSaved: (state: UserPageState) => {
      state.category = SAVED;
    },
    togglePostHoverById: (
      state: UserPageState,
      action: PayloadAction<number>
    ) => {
      const hoveredPostIndex: number = state.hoveredPostsIds.findIndex(
        (hoveredPostId: number) => hoveredPostId === action.payload
      );
      if (hoveredPostIndex !== -1)
        state.hoveredPostsIds.splice(hoveredPostIndex, 1);
      else state.hoveredPostsIds.push(action.payload);
    },
  },
  extraReducers: {
    [requestUserPosts.pending as any]: (state: UserPageState) => {
      state.userPostsLoading = "loading";
      state.errorMessage = null;
    },
    [requestUserPosts.fulfilled as any]: (
      state: UserPageState,
      action: PayloadAction<IPost[]>
    ) => {
      state.userPosts = action.payload;
      state.userPostsLoading = "idle";
    },
    [requestUserPosts.rejected as any]: (
      state: UserPageState,
      action: PayloadAction<string>
    ) => {
      state.userPostsLoading = "idle";
      state.errorMessage = action.payload;
    },
    [requestUserData.pending as any]: (state: UserPageState) => {
      state.userLoading = "loading";
      state.errorMessage = null;
    },
    [requestUserData.fulfilled as any]: (
      state: UserPageState,
      action: PayloadAction<IUser>
    ) => {
      state.user = action.payload;
      state.userLoading = "idle";
    },
    [requestUserData.rejected as any]: (
      state: UserPageState,
      action: PayloadAction<string>
    ) => {
      state.userLoading = "idle";
      state.errorMessage = action.payload;
    },
    [requestUserSaved.pending as any]: (state: UserPageState) => {
      state.userSavedLoading = "loading";
      state.errorMessage = null;
    },
    [requestUserSaved.fulfilled as any]: (
      state: UserPageState,
      action: PayloadAction<IPost[]>
    ) => {
      state.userSaved = action.payload;
      state.userSavedLoading = "idle";
    },
    [requestUserSaved.rejected as any]: (
      state: UserPageState,
      action: PayloadAction<string>
    ) => {
      state.userSavedLoading = "idle";
      state.errorMessage = action.payload;
    },
  },
});

export const {
  showPosts,
  showSaved,
  togglePostHoverById,
} = userPageSlice.actions;

export default userPageSlice.reducer;
