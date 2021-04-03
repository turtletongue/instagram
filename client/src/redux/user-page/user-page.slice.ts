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

interface UserPageState {
  category: string;
  user: IUser | null;
  userLoading: string;
  hoveredPostId: number | null;
  clickedPostId: number;
  ids: EntityId[];
  entities: any;
  userPagePostsLoading: string;
  followErrorMessage: string | null;
  followLoading: string;
  unfollowErrorMessage: string | null;
  unfollowLoading: string;
  errorMessage: string | null;
  unfollowModalUser: IUser | null;
}

const userPagePostsAdapter = createEntityAdapter();

const initialState: UserPageState = userPagePostsAdapter.getInitialState({
  category: POSTS,
  user: null,
  hoveredPostId: null,
  clickedPostId: -1,
  userLoading: "idle",
  userPagePostsLoading: "idle",
  followErrorMessage: null,
  followLoading: "idle",
  unfollowErrorMessage: null,
  unfollowLoading: "idle",
  errorMessage: null,
  unfollowModalUser: null,
});

interface UnfollowJSON {
  data: {
    unfollow: any;
  };
}

export const unfollow = createAsyncThunk(
  "userPage/unfollowStatus",
  async (requestOptions: RequestOptions, thunkAPI) => {
    if (requestOptions.testData) {
      return requestOptions.testData;
    }

    const graphqlQuery: GraphqlQuery = {
      query: `
        mutation Unfollow($followingId: Int!) {
          unfollow(followingId: $followingId)
        }
      `,
      variables: {
        followingId: requestOptions.input.followingId,
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
      const json: UnfollowJSON = await res.json();
      console.log(json);
      return json.data.unfollow;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface FollowJSON {
  data: {
    follow: any;
  };
}

export const follow = createAsyncThunk(
  "userPage/followStatus",
  async (requestOptions: RequestOptions, thunkAPI) => {
    if (requestOptions.testData) {
      return requestOptions.testData;
    }

    const graphqlQuery: GraphqlQuery = {
      query: `
        mutation Follow($followingId: Int!) {
          follow(followingId: $followingId)
        }
      `,
      variables: {
        followingId: requestOptions.input.followingId,
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
      const json: FollowJSON = await res.json();
      return json.data.follow;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
      return json.data.getUserPosts;
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

interface RequestUserSavedPostsJSON {
  data: {
    getUserBookmarkedPosts: IPost[];
  };
}

export const requestUserPageSavedPosts = createAsyncThunk(
  "userPage/requestUserPageSavedPostsStatus",
  async (requestOptions: RequestOptions, thunkAPI) => {
    if (requestOptions.testData) {
      return requestOptions.testData;
    }

    const graphqlQuery: GraphqlQuery = {
      query: `
        {
          getUserBookmarkedPosts {
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
      const json: RequestUserSavedPostsJSON = await res.json();
      return json.data.getUserBookmarkedPosts;
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

export const likeUserPagePost = createAsyncThunk(
  "userPage/likeUserPagePostStatus",
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

export const unlikeUserPagePost = createAsyncThunk(
  "userPage/unlikeUserPagePostStatus",
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

export const bookmarkUserPagePost = createAsyncThunk(
  "userPage/bookmarkUserPagePostStatus",
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

export const unbookmarkUserPagePost = createAsyncThunk(
  "userPage/unbookmarkUserPagePostStatus",
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

export const addUserPageComment = createAsyncThunk(
  "userPage/addUserPageCommentStatus",
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

export const likeUserPageComment = createAsyncThunk(
  "userPage/likeUserPageCommentStatus",
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

export const unlikeUserPageComment = createAsyncThunk(
  "userPage/unlikeUserPageCommentStatus",
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
    setUnfollowModalUser: (
      state: UserPageState,
      action: PayloadAction<IUser>
    ) => {
      state.unfollowModalUser = action.payload;
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
    [follow.pending as any]: (state: UserPageState) => {
      state.followLoading = "loading";
      state.followErrorMessage = null;
    },
    [follow.fulfilled as any]: (state: UserPageState) => {
      state.followLoading = "idle";
    },
    [follow.rejected as any]: (
      state: UserPageState,
      action: PayloadAction<string>
    ) => {
      state.followErrorMessage = action.payload;
      state.followLoading = "idle";
    },
    [unfollow.pending as any]: (state: UserPageState) => {
      state.unfollowLoading = "loading";
      state.unfollowErrorMessage = null;
    },
    [unfollow.fulfilled as any]: (state: UserPageState) => {
      state.unfollowLoading = "idle";
    },
    [unfollow.rejected as any]: (
      state: UserPageState,
      action: PayloadAction<string>
    ) => {
      state.unfollowErrorMessage = action.payload;
      state.unfollowLoading = "idle";
    },
    [requestUserPageSavedPosts.fulfilled as any]: (
      state: UserPageState,
      action: PayloadAction<IPost[]>
    ) => {
      userPagePostsAdapter.upsertMany(state, action.payload);
    },
    [likeUserPagePost.fulfilled as any]: (
      state: UserPageState,
      action: PayloadAction<string | number>
    ) => {
      if (state.entities[action.payload]) {
        userPagePostsAdapter.updateOne(state, {
          id: +action.payload,
          changes: {
            isLiked: true,
            likesCount: state.entities[action.payload].likesCount + 1,
          },
        });
      }
    },
    [unlikeUserPagePost.fulfilled as any]: (
      state: UserPageState,
      action: PayloadAction<string | number>
    ) => {
      if (state.entities[action.payload]) {
        userPagePostsAdapter.updateOne(state, {
          id: +action.payload,
          changes: {
            isLiked: false,
            likesCount: state.entities[action.payload].likesCount - 1,
          },
        });
      }
    },
    [bookmarkUserPagePost.fulfilled as any]: (
      state: UserPageState,
      action: PayloadAction<string | number>
    ) => {
      if (state.entities[action.payload]) {
        userPagePostsAdapter.updateOne(state, {
          id: +action.payload,
          changes: {
            isBookmarked: true,
          },
        });
      }
    },
    [unbookmarkUserPagePost.fulfilled as any]: (
      state: UserPageState,
      action: PayloadAction<string | number>
    ) => {
      if (state.entities[action.payload]) {
        userPagePostsAdapter.updateOne(state, {
          id: +action.payload,
          changes: {
            isBookmarked: false,
          },
        });
      }
    },
    [addUserPageComment.fulfilled as any]: (
      state: UserPageState,
      action: PayloadAction<IComment>
    ) => {
      if (state.entities[action.payload.postId]) {
        userPagePostsAdapter.updateOne(state, {
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
    [likeUserPageComment.fulfilled as any]: (
      state: UserPageState,
      action: PayloadAction<{ postId: number; commentId: number }>
    ) => {
      if (state.entities[action.payload.postId]) {
        userPagePostsAdapter.updateOne(state, {
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
    [unlikeUserPageComment.fulfilled as any]: (
      state: UserPageState,
      action: PayloadAction<{ postId: number; commentId: number }>
    ) => {
      if (state.entities[action.payload.postId]) {
        userPagePostsAdapter.updateOne(state, {
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
  selectById: selectUserPagePostById,
  selectAll: selectAllUserPagePosts,
} = userPagePostsAdapter.getSelectors((state: RootState) => state.userPage);

export const {
  showPosts,
  showSaved,
  hoverPostById,
  blurPosts,
  setClickedPostId,
  setUnfollowModalUser,
} = userPageSlice.actions;

export default userPageSlice.reducer;
