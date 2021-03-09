import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_START,
  ADD_COMMENT_SUCCESS,
  CHANGE_COMMENT_INPUT,
  CLEAR_COMMENT_INPUT,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  SET_IS_BOOKMARKED,
  SET_IS_LIKED,
  TOGGLE_LIKE_COMMENT,
} from "./posts.constants";
import { IComment, IPost } from "./posts.interfaces";

export const fetchPosts = () => async (dispatch: any) => {
  dispatch(fetchPostsStart());
  try {
    const data = [
      {
        id: "32323",
        author: {
          id: "alternative.disney",
          avatar:
            "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s320x320/37180174_2128883647392391_2180509584274227200_n.jpg?tp=1&_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=p-XguE5bCK8AX9v4QS1&oh=80bd6ca7e744d819747cd5253d77a6fb&oe=606DB111",
        },
        imageUrl:
          "https://scontent-arn2-1.cdninstagram.com/v/t51.2885-15/fr/e15/s1080x1080/155789273_770007063608934_120234005437861096_n.jpg?tp=1&_nc_ht=scontent-arn2-1.cdninstagram.com&_nc_cat=1&_nc_ohc=hSW3tHEk1GYAX8xMnU2&oh=10f1ad2d881737396eacbbc8362bc0d4&oe=606D1DB9",
        likes: 2454,
        isLiked: false,
        isBookmarked: false,
        date: new Date(),
        comments: [
          {
            id: "1",
            postId: "32323",
            authorId: "alternative.disney",
            content: "Wrong lever!",
            date: new Date(2021, 2, 5),
            likers: [],
          },
          {
            id: "2",
            postId: "32323",
            authorId: "k8lin.marie",
            content: "@lindsayjmarie",
            date: new Date(2021, 2, 5),
            likers: [],
          },
        ],
      },
    ];
    dispatch(
      fetchPostsSuccess(
        data.map((post: any) => ({ ...post, commentInput: "" }))
      )
    );
  } catch (error) {
    dispatch(fetchPostsFailure(error));
  }
};

export const fetchPostsStart = () => ({
  type: FETCH_POSTS_START,
});

export const fetchPostsSuccess = (posts: IPost[]) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (error: Error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error.message,
});

export const changeCommentInput = (postId: string, content: string) => ({
  type: CHANGE_COMMENT_INPUT,
  payload: { postId, content },
});

export const clearCommentInput = (postId: string) => ({
  type: CLEAR_COMMENT_INPUT,
  payload: postId,
});

export const setIsLiked = (postId: string, isLiked: boolean) => ({
  type: SET_IS_LIKED,
  payload: { postId, isLiked },
});

export const setIsBookmarked = (postId: string, isBookmarked: boolean) => ({
  type: SET_IS_BOOKMARKED,
  payload: { postId, isBookmarked },
});

export const addComment = (
  postId: string,
  userId: string,
  content: string
) => async (dispatch: any) => {
  dispatch(addCommentStart());
  try {
    const data = {
      id: Math.random().toString(),
      postId,
      content,
      authorId: userId,
      date: new Date(),
    };
    dispatch(addCommentSuccess({ ...data, isLiked: false }));
  } catch (error) {
    dispatch(addCommentFailure(error));
  }
};

export const addCommentStart = () => ({
  type: ADD_COMMENT_START,
});

export const addCommentSuccess = (comment: IComment) => ({
  type: ADD_COMMENT_SUCCESS,
  payload: comment,
});

export const addCommentFailure = (error: Error) => ({
  type: ADD_COMMENT_FAILURE,
  payload: error.message,
});

export const toggleCommentLike = (postId: string, commentId: string) => ({
  type: TOGGLE_LIKE_COMMENT,
  payload: { postId, commentId },
});
