import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment, IPost } from "../feed/feed.slice";
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
  reducers: {
    likePostPagePost: (state: PostPageState) => {
      if (state.post) {
        state.post.isLiked = true;
        state.post.likesCount += 1;
      }
    },
    unlikePostPagePost: (state: PostPageState) => {
      if (state.post) {
        state.post.isLiked = false;
        state.post.likesCount -= 1;
      }
    },
    bookmarkPostPagePost: (state: PostPageState) => {
      if (state.post) {
        state.post.isBookmarked = true;
      }
    },
    unbookmarkPostPagePost: (state: PostPageState) => {
      if (state.post) {
        state.post.isBookmarked = false;
      }
    },
    likePostPageComment: (
      state: PostPageState,
      action: PayloadAction<number>
    ) => {
      if (state.post) {
        state.post.comments = state.post.comments.map((comment: IComment) =>
          comment.id === action.payload
            ? { ...comment, isLiked: true }
            : comment
        );
      }
    },
    unlikePostPageComment: (
      state: PostPageState,
      action: PayloadAction<number>
    ) => {
      if (state.post) {
        state.post.comments = state.post.comments.map((comment: IComment) =>
          comment.id === action.payload
            ? { ...comment, isLiked: false }
            : comment
        );
      }
    },
    setPostPageCommentInput: (
      state: PostPageState,
      action: PayloadAction<string>
    ) => {
      if (state.post) {
        state.post.commentInput = action.payload;
      }
    },
    clearPostPageCommentInput: (state: PostPageState) => {
      if (state.post) {
        state.post.commentInput = "";
      }
    },
    addPostPageComment: (
      state: PostPageState,
      action: PayloadAction<IComment>
    ) => {
      if (state.post) {
        state.post.comments.push(action.payload);
      }
    },
  },
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

export const {
  likePostPageComment,
  likePostPagePost,
  unbookmarkPostPagePost,
  unlikePostPageComment,
  unlikePostPagePost,
  bookmarkPostPagePost,
  setPostPageCommentInput,
  clearPostPageCommentInput,
  addPostPageComment,
} = postPageSlice.actions;

export default postPageSlice.reducer;
