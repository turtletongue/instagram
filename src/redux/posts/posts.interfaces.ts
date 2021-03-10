import { IUser } from "../users/users.interfaces";

export interface IComment {
  id: string | null;
  authorId: string;
  postId: string;
  content: string;
  date: Date;
  isLiked: boolean;
}

export interface IPost {
  id: string;
  author: IUser;
  imageUrl: string;
  likes: number;
  comments: IComment[];
  isLiked: boolean;
  isBookmarked: boolean;
  date: Date;
  commentInput: string;
}
