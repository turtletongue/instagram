import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../constants";
import { IComment, IPost } from "../feed/feed.slice";
import { GraphqlQuery, RequestOptions } from "../interfaces";

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

interface RequestPostByIdJSON {
  data: {
    getPostById: IPost;
  };
}

export const requestPostById = createAsyncThunk(
  "postPage/requestPostByIdStatus",
  async (requestOptions: RequestOptions, thunkAPI) => {
    if (requestOptions.testData) {
      return requestOptions.testData;
    }

    const graphqlQuery: GraphqlQuery = {
      query: `
        query GetPostById($postId: Int!) {
          getPostById(postId: $postId) {
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
      variables: { postId: requestOptions.input.postId },
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
      const json: RequestPostByIdJSON = await res.json();
      console.log(json);
      return json.data.getPostById;
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

export const likePostPagePost = createAsyncThunk(
  "postPage/likePostPagePostStatus",
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

export const unlikePostPagePost = createAsyncThunk(
  "postPage/unlikePostPagePostStatus",
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

export const bookmarkPostPagePost = createAsyncThunk(
  "postPage/bookmarkPostPagePostStatus",
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

export const unbookmarkPostPagePost = createAsyncThunk(
  "postPage/unbookmarkPostPagePostStatus",
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

export const addPostPageComment = createAsyncThunk(
  "postPage/addPostPageCommentStatus",
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

export const likePostPageComment = createAsyncThunk(
  "postPage/likePostPageCommentStatus",
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

export const unlikePostPageComment = createAsyncThunk(
  "postPage/unlikePostPageCommentStatus",
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
    [likePostPagePost.fulfilled as any]: (
      state: PostPageState,
      action: PayloadAction<number | string>
    ) => {
      if (state.post && +action.payload === +state.post?.id) {
        state.post.isLiked = true;
        state.post.likesCount++;
      }
    },
    [unlikePostPagePost.fulfilled as any]: (
      state: PostPageState,
      action: PayloadAction<number | string>
    ) => {
      if (state.post && +action.payload === +state.post?.id) {
        state.post.isLiked = false;
        state.post.likesCount--;
      }
    },
    [bookmarkPostPagePost.fulfilled as any]: (
      state: PostPageState,
      action: PayloadAction<number | string>
    ) => {
      if (state.post && +action.payload === +state.post?.id) {
        state.post.isBookmarked = true;
      }
    },
    [unbookmarkPostPagePost.fulfilled as any]: (
      state: PostPageState,
      action: PayloadAction<number | string>
    ) => {
      if (state.post && +action.payload === +state.post?.id) {
        state.post.isBookmarked = false;
      }
    },
    [addPostPageComment.fulfilled as any]: (
      state: PostPageState,
      action: PayloadAction<IComment>
    ) => {
      if (state.post && +action.payload.postId === +state.post?.id) {
        state.post.comments.push(action.payload);
      }
    },
    [likePostPageComment.fulfilled as any]: (
      state: PostPageState,
      action: PayloadAction<{ postId: number; commentId: number }>
    ) => {
      if (state.post && +action.payload.postId === +state.post?.id) {
        state.post.comments = state.post.comments.map((comment: IComment) =>
          +comment.id === +action.payload.commentId
            ? { ...comment, isLiked: true }
            : comment
        );
      }
    },
    [unlikePostPageComment.fulfilled as any]: (
      state: PostPageState,
      action: PayloadAction<{ postId: number; commentId: number }>
    ) => {
      if (state.post && +action.payload.postId === +state.post?.id) {
        state.post.comments = state.post.comments.map((comment: IComment) =>
          +comment.id === +action.payload.commentId
            ? { ...comment, isLiked: false }
            : comment
        );
      }
    },
  },
});

export default postPageSlice.reducer;
