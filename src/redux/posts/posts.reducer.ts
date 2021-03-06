import { ADD_COMMENT_FAILURE, ADD_COMMENT_START, ADD_COMMENT_SUCCESS, CHANGE_COMMENT_INPUT, FETCH_POSTS_FAILURE, FETCH_POSTS_START, FETCH_POSTS_SUCCESS, SET_IS_BOOKMARKED, SET_IS_LIKED } from "./posts.constants";
import { IPost } from "./posts.interfaces";
import { addComment, changeIsBookmarked, changeIsLiked } from "./posts.utils";

export interface PostsState {
  postsData: IPost[];
  isPostsPending: boolean;
  isAddCommentPending: boolean;
  error: string | null;
  commentInput: string;
} 

const initialState: PostsState = {
  postsData: [],
  isPostsPending: true,
  isAddCommentPending: false,
  error: null,
  commentInput: ''
};

const postsReducer = (state: PostsState=initialState, action: any={}) => {
  switch (action.type) {
    case FETCH_POSTS_START:
      return { ...state, isPostsPending: true, error: null };
    case FETCH_POSTS_SUCCESS:
      return { ...state, isPostsPending: false, error: null, postsData: [
        ...state.postsData, ...action.payload
      ] };
    case FETCH_POSTS_FAILURE:
      return { ...state, isPostsPending: false, error: action.payload };
    case SET_IS_LIKED:
      return { ...state, postsData: changeIsLiked(
        state.postsData, action.payload.postId, action.payload.isLiked
      ) };
    case SET_IS_BOOKMARKED:
      return { ...state, postsData: changeIsBookmarked(
        state.postsData, action.payload.postId, action.payload.isBookmarked
      ) };
    case CHANGE_COMMENT_INPUT:
      return { ...state, commentInput: action.payload };
    case ADD_COMMENT_START:
      return { ...state,  isAddCommentPending: true, error: null };
    case ADD_COMMENT_SUCCESS:
      return { ...state, isAddCommentPending: false, error: null, postsData: addComment(
        state.postsData, action.payload.postId, action.payload.userId, action.payload.content
      ) };
    case ADD_COMMENT_FAILURE:
      return { ...state, isAddCommentPending: false, error: action.payload };
    default:
      return state;
  }
}

export default postsReducer;