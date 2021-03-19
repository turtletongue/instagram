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
  commentInput: string;
}

interface IPostsResponse {
  posts: IPost[];
  postsSlice: number;
}

interface ICommentInput {
  postId: number;
  commentInput: string;
}

interface ICommentLike {
  postId: number;
  commentId: number;
  likerId: string;
}

export const requestSliceOfPosts = createAsyncThunk(
  "feed/requestSliceOfPostsStatus",
  async (requestOptions: RequestOptions, thunkAPI) => {
    if (requestOptions.testData) {
      return { ...requestOptions.testData, commentInput: "" };
    }
    try {
      const res = await fetch("URL", {
        method: "POST",
        body: requestOptions.query,
      });
      const data = await res.json();
      data.commentInput = "";
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
  reducers: {
    likePost: (state: FeedState, action: PayloadAction<number>) => {
      if (state.entities[action.payload]) {
        postsAdapter.updateOne(state, {
          id: action.payload,
          changes: {
            isLiked: true,
            likesCount: state.entities[action.payload].likesCount + 1,
          },
        });
      }
    },
    unlikePost: (state: FeedState, action: PayloadAction<number>) => {
      if (state.entities[action.payload]) {
        postsAdapter.updateOne(state, {
          id: action.payload,
          changes: {
            isLiked: false,
            likesCount: state.entities[action.payload].likesCount - 1,
          },
        });
      }
    },
    bookmarkPost: (state: FeedState, action: PayloadAction<number>) => {
      postsAdapter.updateOne(state, {
        id: action.payload,
        changes: { isBookmarked: true },
      });
    },
    unbookmarkPost: (state: FeedState, action: PayloadAction<number>) => {
      postsAdapter.updateOne(state, {
        id: action.payload,
        changes: { isBookmarked: false },
      });
    },
    setCommentInput: (
      state: FeedState,
      action: PayloadAction<ICommentInput>
    ) => {
      const { postId, commentInput } = action.payload;
      postsAdapter.updateOne(state, { id: postId, changes: { commentInput } });
    },
    addComment: (state: FeedState, action: PayloadAction<IComment>) => {
      const { postId } = action.payload;
      if (state.entities[postId]) {
        postsAdapter.updateOne(state, {
          id: postId,
          changes: {
            comments: [...state.entities[postId].comments, action.payload],
          },
        });
      }
    },
    likeComment: (state: FeedState, action: PayloadAction<ICommentLike>) => {
      const { postId, commentId } = action.payload;
      if (state.entities[postId]) {
        postsAdapter.updateOne(state, {
          id: postId,
          changes: {
            comments: state.entities[postId].comments.map((comment: IComment) =>
              comment.id === commentId
                ? {
                    ...comment,
                    isLiked: true,
                  }
                : comment
            ),
          },
        });
      }
    },
    unlikeComment: (state: FeedState, action: PayloadAction<ICommentLike>) => {
      const { postId, commentId } = action.payload;
      if (state.entities[postId]) {
        postsAdapter.updateOne(state, {
          id: postId,
          changes: {
            comments: state.entities[postId].comments.map((comment: IComment) =>
              comment.id === commentId
                ? {
                    ...comment,
                    isLiked: false,
                  }
                : comment
            ),
          },
        });
      }
    },
    clearCommentInput: (state: FeedState, action: PayloadAction<number>) => {
      postsAdapter.updateOne(state, {
        id: action.payload,
        changes: { commentInput: "" },
      });
    },
  },
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

export const {
  likePost,
  unlikePost,
  bookmarkPost,
  unbookmarkPost,
  setCommentInput,
  addComment,
  likeComment,
  unlikeComment,
  clearCommentInput,
} = feedSlice.actions;

export default feedSlice.reducer;
