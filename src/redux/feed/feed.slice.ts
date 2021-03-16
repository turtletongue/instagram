import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RequestOptions } from "../interfaces";
import { RootState } from "../store";
import { IUser } from "../user/user.slice";

export interface IComment {
  id: number;
  authorId: string;
  postId: number;
  writedAt: string;
  isLiked: boolean;
  likersIds: string[];
  content: string;
  replies: IComment[];
}

export interface IPost {
  id: number;
  author: IUser;
  createdAt: string;
  imagesUrls: string[];
  likesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  comments: IComment[];
}

interface IPostsResponse {
  posts: IPost[];
  postsSlice: number;
}

export const requestSliceOfPosts = createAsyncThunk(
  "feed/requestSliceOfPostsStatus",
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

interface FeedState {
  ids: EntityId[];
  entities: any;
  postsLoading: string;
  lastPostsSlice: number;
  errorMessage: string | null;
}

export const postsAdapter = createEntityAdapter();

const initialState: FeedState = postsAdapter.getInitialState({
  postsLoading: "idle",
  lastPostsSlice: -1,
  errorMessage: null,
});

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: {
    [requestSliceOfPosts.pending as any]: (state: FeedState) => {
      state.postsLoading = "loading";
      state.errorMessage = null;
    },
    [requestSliceOfPosts.fulfilled as any]: (
      state: FeedState,
      action: PayloadAction<IPostsResponse>
    ) => {
      const { posts, postsSlice } = action.payload;
      state.lastPostsSlice = postsSlice;
      postsAdapter.upsertMany(state, posts);
      state.postsLoading = "idle";
    },
    [requestSliceOfPosts as any]: (
      state: FeedState,
      action: PayloadAction<string>
    ) => {
      state.errorMessage = action.payload;
      state.postsLoading = "idle";
    },
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
} = postsAdapter.getSelectors((state: RootState) => state.feed);

export default feedSlice.reducer;
