import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IComment, IPost } from "../feed/feed.slice";
import { RequestOptions } from "../interfaces";
import { IUser } from "../user/user.slice";

export const POSTS: string = "POSTS";

export const SAVED: string = "SAVED";

interface ICommentLike {
  postId: number;
  commentId: number;
  likerId: string;
}

interface UserPageState {
  category: string;
  hoveredPostsIds: number[];
  user: IUser | null;
  userLoading: string;
  ids: EntityId[];
  entities: any;
  userPagePostsLoading: string;
  errorMessage: string | null;
}

const userPagePostsAdapter = createEntityAdapter();

const initialState: UserPageState = userPagePostsAdapter.getInitialState({
  category: POSTS,
  hoveredPostsIds: [],
  user: null,
  userLoading: "idle",
  userPagePostsLoading: "idle",
  errorMessage: null,
});

export const requestUserPagePosts = createAsyncThunk(
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
    likeUserPagePost: (state: UserPageState, action: PayloadAction<number>) => {
      userPagePostsAdapter.updateOne(state, {
        id: action.payload,
        changes: { isLiked: true },
      });
    },
    unlikeUserPagePost: (
      state: UserPageState,
      action: PayloadAction<number>
    ) => {
      userPagePostsAdapter.updateOne(state, {
        id: action.payload,
        changes: { isLiked: false },
      });
    },
    bookmarkUserPagePost: (
      state: UserPageState,
      action: PayloadAction<number>
    ) => {
      userPagePostsAdapter.updateOne(state, {
        id: action.payload,
        changes: { isBookmarked: true },
      });
    },
    unbookmarkUserPagePost: (
      state: UserPageState,
      action: PayloadAction<number>
    ) => {
      userPagePostsAdapter.updateOne(state, {
        id: action.payload,
        changes: { isBookmarked: false },
      });
    },
    likeUserPageComment: (
      state: UserPageState,
      action: PayloadAction<ICommentLike>
    ) => {
      const { postId, commentId, likerId } = action.payload;
      const post: IPost = state.entities[postId];
      userPagePostsAdapter.updateOne(state, {
        id: postId,
        changes: {
          comments: post
            ? post.comments.map((comment: IComment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      isLiked: true,
                      likersIds: [...comment.likersIds, likerId],
                    }
                  : comment
              )
            : [],
        },
      });
    },
    unlikeUserPageComment: (
      state: UserPageState,
      action: PayloadAction<ICommentLike>
    ) => {
      const { postId, commentId, likerId } = action.payload;
      const post: IPost = state.entities[postId];
      userPagePostsAdapter.updateOne(state, {
        id: postId,
        changes: {
          comments: post
            ? post.comments.map((comment: IComment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      isLiked: false,
                      likersIds: comment.likersIds.filter(
                        (currentLikerId: string) => currentLikerId !== likerId
                      ),
                    }
                  : comment
              )
            : [],
        },
      });
    },
  },
  extraReducers: {
    [requestUserPagePosts.pending as any]: (state: UserPageState) => {
      state.userPagePostsLoading = "loading";
      state.errorMessage = null;
    },
    [requestUserPagePosts.fulfilled as any]: (
      state: UserPageState,
      action: PayloadAction<IPost[]>
    ) => {
      userPagePostsAdapter.upsertMany(state, action.payload);
      state.userPagePostsLoading = "idle";
    },
    [requestUserPagePosts.rejected as any]: (
      state: UserPageState,
      action: PayloadAction<string>
    ) => {
      state.userPagePostsLoading = "idle";
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
  },
});

export const {
  selectById: selectUserPagePostById,
  selectAll: selectAllUserPagePosts,
} = userPagePostsAdapter.getSelectors();

export const {
  showPosts,
  showSaved,
  togglePostHoverById,
  likeUserPagePost,
  unlikeUserPagePost,
  unbookmarkUserPagePost,
  bookmarkUserPagePost,
  likeUserPageComment,
  unlikeUserPageComment,
} = userPageSlice.actions;

export default userPageSlice.reducer;
