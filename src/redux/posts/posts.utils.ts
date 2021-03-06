import { IComment, IPost } from "./posts.interfaces"

export const changeIsLiked = (posts: IPost[], postId: string, isLiked: boolean) => {
  return posts.map(post => {
    return post.id === postId ? { ...post, isLiked, likes: post.likes + (isLiked ? 1 : -1) } : post;
  });
}

export const changeIsBookmarked = (posts: IPost[], postId: string, isBookmarked: boolean) => {
  return posts.map(post => {
    return post.id === postId ? { ...post, isBookmarked } : post;
  });
}

export const addComment = (posts: IPost[], postId: string, userId: string, content: string) => {
  const comment: IComment = { id: null, authorId: userId, postId, content, date: new Date() };
  return posts.map(post => {
    return post.id === postId ? { ...post, comments: [...post.comments, comment ] } : post;
  });
}