import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from "@reduxjs/toolkit";
import { SERVER_URL } from "../../constants";
import { GraphqlQuery, RequestOptions } from "../interfaces";
import { RootState } from "../store";
import { IUser } from "../user/user.slice";

export interface IComment {
  id: number;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  isLiked: boolean;
  content: string;
  postId: number;
}

export interface IPost {
  id: number;
  author: IUser;
  createdAt: string;
  imageUrl: string;
  likesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  comments: IComment[];
}

interface FollowingPostsJSON {
  data: {
    getFollowingPosts: IPost[];
  };
}

export const requestSliceOfPosts = createAsyncThunk(
  "feed/requestSliceOfPostsStatus",
  async (requestOptions: RequestOptions, thunkAPI) => {
    if (requestOptions.testData) {
      return { ...requestOptions.testData, commentInput: "" };
    }

    const graphqlQuery: GraphqlQuery = {
      query: `
        query GetFollowingPosts($slice: Int!) {
          getFollowingPosts(slice: $slice) {
            id
            imageUrl
            createdAt
            likesCount
            isLiked
            isBookmarked
            author {
              id
              username
              avatarUrl
            }
            comments {
              id
              content
              isLiked
              authorName
              authorAvatar
              createdAt
              postId
            }
          }
        }
      `,
      variables: {
        slice: requestOptions.input.slice,
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
      const json: FollowingPostsJSON = await res.json();
      return json.data.getFollowingPosts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface LikePostArgs {
  postId: number;
  token: string;
}

interface LikePostJSON {
  data: { likePost: { postId: string } };
}

export const likePost = createAsyncThunk(
  "feed/likePostStatus",
  async ({ postId, token }: LikePostArgs, thunkAPI) => {
    const graphqlQuery: GraphqlQuery = {
      query: `
        mutation LikePost($postId: Int!) {
          likePost(postId: $postId) {
            postId
          }
        }
      `,
      variables: {
        postId,
      },
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
      const json: LikePostJSON = await res.json();
      return json.data.likePost.postId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const unlikePost = createAsyncThunk(
  "feed/unlikePostStatus",
  async ({ postId, token }: LikePostArgs, thunkAPI) => {
    const graphqlQuery: GraphqlQuery = {
      query: `
        mutation UnlikePost($postId: Int!) {
          unlikePost(postId: $postId)
        }
      `,
      variables: {
        postId,
      },
    };
    try {
      await fetch(SERVER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
      });
      return postId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface BookmarkPostArgs {
  postId: number;
  token: string;
}

interface BookmarkPostJSON {
  data: {
    bookmarkPost: {
      postId: number;
    };
  };
}

export const bookmarkPost = createAsyncThunk(
  "feed/bookmarkPostStatus",
  async ({ postId, token }: BookmarkPostArgs, thunkAPI) => {
    const graphqlQuery: GraphqlQuery = {
      query: `
        mutation BookmarkPost($postId: Int!) {
          bookmarkPost(postId: $postId) {
            postId
          }
        }
      `,
      variables: {
        postId,
      },
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
      const json: BookmarkPostJSON = await res.json();
      return json.data.bookmarkPost.postId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const unbookmarkPost = createAsyncThunk(
  "feed/unbookmarkPostStatus",
  async ({ postId, token }: BookmarkPostArgs, thunkAPI) => {
    const graphqlQuery: GraphqlQuery = {
      query: `
        mutation UnbookmarkPost($postId: Int!) {
          unbookmarkPost(postId: $postId)
        }
      `,
      variables: {
        postId,
      },
    };
    try {
      await fetch(SERVER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
      });
      return postId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface AddCommentArgs {
  postId: number;
  content: string;
  token: string;
}

interface AddCommentJSON {
  data: {
    createComment: IComment;
  };
}

export const addComment = createAsyncThunk(
  "feed/addCommentStatus",
  async ({ postId, content, token }: AddCommentArgs, thunkAPI) => {
    const graphqlQuery: GraphqlQuery = {
      query: `
        mutation CreateComment($postId: Int!, $content: String!) {
          createComment(commentInput: { postId: $postId, content: $content }) {
            id
            content
            createdAt
            isLiked
            postId
            authorName
            authorAvatar
          }
        }
      `,
      variables: {
        postId,
        content,
      },
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
      const json: AddCommentJSON = await res.json();
      return json.data.createComment;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface LikeCommentArgs {
  postId: number;
  token: string;
  commentId: number;
}

interface LikeCommentJSON {
  data: {
    likeComment: {
      postId: number;
      commentId: number;
    };
  };
}

export const likeComment = createAsyncThunk(
  "feed/likeCommentStatus",
  async ({ postId, commentId, token }: LikeCommentArgs, thunkAPI) => {
    const graphqlQuery: GraphqlQuery = {
      query: `
        mutation LikeComment($postId: Int!, $commentId: Int!) {
          likeComment(postId: $postId, commentId: $commentId) {
            postId
            commentId
          }
        }
      `,
      variables: {
        postId,
        commentId,
      },
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
      const json: LikeCommentJSON = await res.json();
      return json.data.likeComment;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const unlikeComment = createAsyncThunk(
  "feed/unlikeCommentStatus",
  async ({ postId, commentId, token }: LikeCommentArgs, thunkAPI) => {
    const graphqlQuery: GraphqlQuery = {
      query: `
        mutation UnlikeComment($postId: Int!, $commentId: Int!) {
          unlikeComment(postId: $postId, commentId: $commentId)
        }
      `,
      variables: {
        postId,
        commentId,
      },
    };
    try {
      await fetch(SERVER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
      });
      return { postId, commentId };
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
  lastPostsSlice: 0,
  errorMessage: null,
});

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    incrementPostSlice: (state: FeedState) => {
      state.lastPostsSlice++;
    },
  },
  extraReducers: {
    [requestSliceOfPosts.pending as any]: (state: FeedState) => {
      state.postsLoading = "loading";
      state.errorMessage = null;
    },
    [requestSliceOfPosts.fulfilled as any]: (
      state: FeedState,
      action: PayloadAction<IPost[]>
    ) => {
      const posts = action.payload;
      postsAdapter.removeAll(state);
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
    [likePost.fulfilled as any]: (
      state: FeedState,
      action: PayloadAction<string | number>
    ) => {
      if (state.entities[action.payload]) {
        postsAdapter.updateOne(state, {
          id: +action.payload,
          changes: {
            isLiked: true,
            likesCount: state.entities[action.payload].likesCount + 1,
          },
        });
      }
    },
    [unlikePost.fulfilled as any]: (
      state: FeedState,
      action: PayloadAction<string | number>
    ) => {
      if (state.entities[action.payload]) {
        postsAdapter.updateOne(state, {
          id: +action.payload,
          changes: {
            isLiked: false,
            likesCount: state.entities[action.payload].likesCount - 1,
          },
        });
      }
    },
    [bookmarkPost.fulfilled as any]: (
      state: FeedState,
      action: PayloadAction<string | number>
    ) => {
      if (state.entities[action.payload]) {
        postsAdapter.updateOne(state, {
          id: +action.payload,
          changes: {
            isBookmarked: true,
          },
        });
      }
    },
    [unbookmarkPost.fulfilled as any]: (
      state: FeedState,
      action: PayloadAction<string | number>
    ) => {
      if (state.entities[action.payload]) {
        postsAdapter.updateOne(state, {
          id: +action.payload,
          changes: {
            isBookmarked: false,
          },
        });
      }
    },
    [addComment.fulfilled as any]: (
      state: FeedState,
      action: PayloadAction<IComment>
    ) => {
      if (state.entities[action.payload.postId]) {
        postsAdapter.updateOne(state, {
          id: +action.payload.postId,
          changes: {
            comments: [
              ...state.entities[action.payload.postId].comments,
              action.payload,
            ],
          },
        });
      }
    },
    [likeComment.fulfilled as any]: (
      state: FeedState,
      action: PayloadAction<{ postId: number; commentId: number }>
    ) => {
      if (state.entities[action.payload.postId]) {
        postsAdapter.updateOne(state, {
          id: +action.payload.postId,
          changes: {
            comments: state.entities[
              action.payload.postId
            ].comments.map((comment: IComment) =>
              +comment.id === +action.payload.commentId
                ? { ...comment, isLiked: true }
                : comment
            ),
          },
        });
      }
    },
    [unlikeComment.fulfilled as any]: (
      state: FeedState,
      action: PayloadAction<{ postId: number; commentId: number }>
    ) => {
      if (state.entities[action.payload.postId]) {
        postsAdapter.updateOne(state, {
          id: +action.payload.postId,
          changes: {
            comments: state.entities[
              action.payload.postId
            ].comments.map((comment: IComment) =>
              +comment.id === +action.payload.commentId
                ? { ...comment, isLiked: false }
                : comment
            ),
          },
        });
      }
    },
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
} = postsAdapter.getSelectors((state: RootState) => state.feed);

export const { incrementPostSlice } = feedSlice.actions;

export default feedSlice.reducer;
