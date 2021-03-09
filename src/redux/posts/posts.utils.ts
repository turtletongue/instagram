import { IComment, IPost } from "./posts.interfaces";

export const changeIsLiked = (
  posts: IPost[],
  postId: string,
  isLiked: boolean
) => {
  return posts.map((post) => {
    return post.id === postId
      ? { ...post, isLiked, likes: post.likes + (isLiked ? 1 : -1) }
      : post;
  });
};

export const changeIsBookmarked = (
  posts: IPost[],
  postId: string,
  isBookmarked: boolean
) => {
  return posts.map((post) => {
    return post.id === postId ? { ...post, isBookmarked } : post;
  });
};

export const changeCommentInput = (
  posts: IPost[],
  postId: string,
  content: string
) => {
  return posts.map((post) => {
    return post.id === postId ? { ...post, commentInput: content } : post;
  });
};

export const clearCommentInput = (posts: IPost[], postId: string) => {
  return posts.map((post) => {
    return post.id === postId ? { ...post, commentInput: "" } : post;
  });
};

export const addComment = (posts: IPost[], comment: IComment) => {
  return posts.map((post) => {
    return post.id === comment.postId
      ? { ...post, comments: [...post.comments, comment] }
      : post;
  });
};

export const toggleCommentLike = (
  posts: IPost[],
  postId: string | null,
  commentId: string | null
) => {
  return posts.map((post) => {
    return post.id === postId
      ? {
          ...post,
          comments: post.comments.map((comment) => {
            return comment.id === commentId
              ? {
                  ...comment,
                  isLiked: !comment.isLiked,
                }
              : comment;
          }),
        }
      : post;
  });
};
