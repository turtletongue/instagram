import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from "@reduxjs/toolkit";
import { SERVER_URL } from "../../constants";
import { IComment, IPost } from "../feed/feed.slice";
import { GraphqlQuery, RequestOptions } from "../interfaces";
import { RootState } from "../store";
import { IUser } from "../user/user.slice";

export const POSTS: string = "POSTS";

export const SAVED: string = "SAVED";

interface ICommentLike {
  postId: number;
  commentId: number;
  likerId: number;
}

interface ICommentInput {
  postId: number;
  commentInput: string;
}

interface UserPageState {
  category: string;
  user: IUser | null;
  userLoading: string;
  hoveredPostId: number | null;
  clickedPostId: number;
  ids: EntityId[];
  entities: any;
  userPagePostsLoading: string;
  errorMessage: string | null;
}

const userPagePostsAdapter = createEntityAdapter();

const initialState: UserPageState = userPagePostsAdapter.getInitialState({
  category: POSTS,
  user: null,
  hoveredPostId: null,
  clickedPostId: -1,
  userLoading: "idle",
  userPagePostsLoading: "idle",
  errorMessage: null,
});

interface RequestUserPostsJSON {
  data: {
    getUserPosts: IPost[];
  };
}

export const requestUserPagePosts = createAsyncThunk(
  "userPage/requestUserPostsStatus",
  async (requestOptions: RequestOptions, thunkAPI) => {
    if (requestOptions.testData) {
      return requestOptions.testData;
    }

    const graphqlQuery: GraphqlQuery = {
      query: `
        query GetUserPosts($username: String!) {
          getUserPosts(username: $username) {
            id
            imageUrl
            createdAt
            likesCount
            isLiked
            isBookmarked
            author {
              id
              avatarUrl
              username
            }
            comments {
              id
              content
              isLiked
              authorName
              createdAt
              postId
            }
          }
        }
      `,
      variables: {
        username: requestOptions.input.username,
      },
    };
    try {
      const res = await fetch(SERVER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${requestOptions.input.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
      });
      const json: RequestUserPostsJSON = await res.json();
      return json.data.getUserPosts.map((post: any) => ({
        ...post,
        commentInput: "",
      }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface RequestUserDataJSON {
  data: {
    getUserByUsername: IUser;
  };
}

export const requestUserData = createAsyncThunk(
  "userPage/requestUserDataStatus",
  async (requestOptions: RequestOptions, thunkAPI) => {
    if (requestOptions.testData) {
      return requestOptions.testData;
    }

    const graphqlQuery: GraphqlQuery = {
      query: `
        query GetUserByUsername($username: String!) {
          getUserByUsername(username: $username) {
            id
            username
            name
            avatarUrl
            bio
            following {
              id
              username
              name
              avatarUrl
              bio
            }
            followers {
              id
              username
              name
              avatarUrl
              bio
            }
          }
        }
      `,
      variables: {
        username: requestOptions.input.username,
      },
    };
    try {
      const res = await fetch(SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
      });
      const json: RequestUserDataJSON = await res.json();
      return json.data.getUserByUsername;
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
    hoverPostById: (state: UserPageState, action: PayloadAction<number>) => {
      state.hoveredPostId = action.payload;
    },
    setClickedPostId: (state: UserPageState, action: PayloadAction<number>) => {
      state.clickedPostId = action.payload;
    },
    blurPosts: (state: UserPageState) => {
      state.hoveredPostId = null;
    },
    likeUserPagePost: (state: UserPageState, action: PayloadAction<number>) => {
      if (state.entities[action.payload]) {
        userPagePostsAdapter.updateOne(state, {
          id: action.payload,
          changes: {
            isLiked: true,
            likesCount: state.entities[action.payload].likesCount + 1,
          },
        });
      }
    },
    unlikeUserPagePost: (
      state: UserPageState,
      action: PayloadAction<number>
    ) => {
      if (state.entities[action.payload]) {
        userPagePostsAdapter.updateOne(state, {
          id: action.payload,
          changes: {
            isLiked: false,
            likesCount: state.entities[action.payload].likesCount - 1,
          },
        });
      }
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
      const { postId, commentId } = action.payload;
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
      const { postId, commentId } = action.payload;
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
                    }
                  : comment
              )
            : [],
        },
      });
    },
    setUserPageCommentInput: (
      state: UserPageState,
      action: PayloadAction<ICommentInput>
    ) => {
      const { postId, commentInput } = action.payload;
      userPagePostsAdapter.updateOne(state, {
        id: postId,
        changes: { commentInput },
      });
    },
    addUserPageComment: (
      state: UserPageState,
      action: PayloadAction<IComment>
    ) => {
      const { postId } = action.payload;
      if (state.entities[postId]) {
        userPagePostsAdapter.updateOne(state, {
          id: postId,
          changes: {
            comments: [...state.entities[postId].comments, action.payload],
          },
        });
      }
    },
    clearUserPageCommentInput: (
      state: UserPageState,
      action: PayloadAction<number>
    ) => {
      userPagePostsAdapter.updateOne(state, {
        id: action.payload,
        changes: { commentInput: "" },
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
} = userPagePostsAdapter.getSelectors((state: RootState) => state.userPage);

export const {
  showPosts,
  showSaved,
  hoverPostById,
  blurPosts,
  likeUserPagePost,
  unlikeUserPagePost,
  unbookmarkUserPagePost,
  bookmarkUserPagePost,
  likeUserPageComment,
  unlikeUserPageComment,
  setUserPageCommentInput,
  addUserPageComment,
  clearUserPageCommentInput,
  setClickedPostId,
} = userPageSlice.actions;

export default userPageSlice.reducer;
