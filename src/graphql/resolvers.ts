import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import Bookmark from "../models/Bookmark";
import Followers from "../models/Followers";
import Like from "../models/Like";
import Post from "../models/Post";
import User from "../models/User";

const MAX_FOLLOWING_POSTS_COUNT = 5;

interface IUser {
  id: number;
  name?: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  password: string;
}

interface IPost {
  id: number;
  imageUrl: string;
  createdAt: string;
  likesCount: number;
}

interface IComment {
  id: number;
  content: string;
  createdAt: string;
}

interface ILike {
  id: number;
  postId: number;
  commentId?: number;
  userId: number;
}

interface IBookmark {
  id: number;
  postId: number;
  userId: number;
}

type CreateUserArgs = {
  userInput: {
    name?: string;
    username: string;
    bio?: string;
    avatarUrl?: string;
    password: string;
  };
};

type CreatePostArgs = {
  postInput: {
    imageUrl: string;
    username: string;
  };
};

type LoginArgs = {
  username: string;
  password: string;
};

type CommentArgs = {
  commentInput: {
    content: string;
    username: string;
    postId: number;
  };
};

type GetFollowingPostsArgs = {
  username: string;
  slice: number;
};

type FollowArgs = {
  followerId: number;
  followingId: number;
};

type LikePostArgs = {
  postId: number;
  userId: number;
};

type LikeCommentArgs = {
  commentId: number;
  postId: number;
  userId: number;
};

type IsUserLikedPostArgs = {
  userId: number;
  postId: number;
};

type IsUserLikedCommentArgs = {
  userId: number;
  postId: number;
  commentId: number;
};

type BookmarkPostArgs = {
  postId: number;
  userId: number;
};

type GetUserBookmarkedPostsArgs = {
  userId: number;
};

type GetUserPostsArgs = {
  userId: number;
};

type GetPostCommentsArgs = {
  postId: number;
};

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class InvalidInputError extends Error {
  data: ValidationError[] = [];

  constructor(message: string, data: ValidationError[]) {
    super(message);
    this.data = data;
  }
}

export default {
  createUser: async ({ userInput }: CreateUserArgs) => {
    const errors: ValidationError[] = [];
    const existingUser = await User.findOne({
      where: { username: userInput.username },
    });
    if (existingUser) throw new Error("User exist already!");
    if (!validator.isLength(userInput.username, { max: 20 })) {
      errors.push(
        new ValidationError("Username length should be less than 20.")
      );
    }
    if (userInput.avatarUrl && !validator.isURL(userInput.avatarUrl)) {
      errors.push(new ValidationError("Avatar URL should be URL."));
    }
    if (errors.length > 0) {
      throw new InvalidInputError("Invalid input.", errors);
    }
    const hashedPassword: string = await bcrypt.hash(userInput.password, 12);
    const createdUser = await User.create({
      ...userInput,
      password: hashedPassword,
    });
    return createdUser;
  },
  createPost: async ({ postInput }: CreatePostArgs) => {
    const author: any = await User.findOne({
      where: { username: postInput.username },
    });
    if (!author) throw new Error("Author of post didn't exist.");
    const errors: ValidationError[] = [];
    if (!validator.isURL(postInput.imageUrl)) {
      errors.push(new ValidationError("Image URL should be URL."));
    }
    if (errors.length > 0) {
      throw new InvalidInputError("Invalid input.", errors);
    }

    const createdPost = await author.createPost({
      imageUrl: postInput.imageUrl,
      likesCount: 0,
    });
    return {
      ...createdPost.dataValues,
      createdAt: createdPost.dataValues.createdAt.toISOString(),
    };
  },
  createComment: async ({
    commentInput: { content, username, postId },
  }: CommentArgs) => {
    console.log(postId);
    const post: any = await Post.findOne({ where: { id: postId } });
    if (!post) {
      throw new Error("Post not found.");
    }
    const errors: ValidationError[] = [];
    if (!validator.isLength(content, { max: 1024 })) {
      errors.push(new ValidationError("Comment content is very big."));
    }
    if (errors.length > 0) {
      throw new InvalidInputError("Invalid input.", errors);
    }
    const createdComment = post.createComment({
      authorName: username,
      content,
    });
    return createdComment;
  },
  login: async ({ username, password }: LoginArgs) => {
    const userData: any = await User.findOne({ where: { username } });
    const user: IUser = userData.dataValues as IUser;
    if (!user) {
      throw new Error("User not found.");
    }
    const isEqual: boolean = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Wrong password.");
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return { token, username };
  },
  follow: async ({ followerId, followingId }: FollowArgs) => {
    await Followers.create({ followerId, followingId });
    return true;
  },
  getFollowingPosts: async ({
    username,
    slice,
  }: GetFollowingPostsArgs): Promise<any[]> => {
    const followingsData: any = await User.findOne({
      where: { username },
      include: ["following", "followers"],
    });
    const followings: IUser[] = followingsData.dataValues.following as IUser[];
    const followingsPosts: IPost[] = [];
    await Promise.all(
      followings.map(async (following: any) => {
        const posts: any = await following.getPosts();
        followingsPosts.push(
          ...posts.map((post: any) => ({
            ...post.dataValues,
            createdAt: post.dataValues.createdAt.toISOString(),
          }))
        );
      })
    );
    const start: number =
      slice * MAX_FOLLOWING_POSTS_COUNT - MAX_FOLLOWING_POSTS_COUNT;
    const end: number =
      slice * MAX_FOLLOWING_POSTS_COUNT -
      MAX_FOLLOWING_POSTS_COUNT +
      MAX_FOLLOWING_POSTS_COUNT;
    return followingsPosts.slice(start, end);
  },
  likePost: async ({ postId, userId }: LikePostArgs) => {
    const like: any = await Like.findOne({ where: { postId, userId } });
    if (like) {
      throw new Error("Like is exist already.");
    }

    const createdLikeData: any = await Like.create({ postId, userId });
    const createdLike: ILike = createdLikeData.dataValues as ILike;
    return createdLike;
  },
  likeComment: async ({ commentId, postId, userId }: LikeCommentArgs) => {
    const like: any = await Like.findOne({
      where: { commentId, postId, userId },
    });
    if (like) {
      throw new Error("Like is exist already.");
    }

    const createdLikeData: any = await Like.create({
      commentId,
      postId,
      userId,
    });
    const createdLike: ILike = createdLikeData.dataValues as ILike;
    return createdLike;
  },
  unlikePost: async ({ postId, userId }: LikePostArgs) => {
    const like: any = await Like.findOne({ where: { postId, userId } });
    if (!like) {
      throw new Error("Like isn't exist.");
    }

    await like.destroy();
    return true;
  },
  unlikeComment: async ({ commentId, postId, userId }: LikeCommentArgs) => {
    const like: any = await Like.findOne({
      where: { commentId, postId, userId },
    });
    if (!like) {
      throw new Error("Like isn't exist.");
    }

    await like.destroy();
    return true;
  },
  isUserLikePost: async ({ userId, postId }: IsUserLikedPostArgs) => {
    const like: any = await Like.findOne({ where: { userId, postId } });
    if (!like) {
      return false;
    }

    return true;
  },
  isUserLikeComment: async ({
    userId,
    postId,
    commentId,
  }: IsUserLikedCommentArgs) => {
    const like: any = await Like.findOne({
      where: { userId, postId, commentId },
    });
    if (!like) {
      return false;
    }

    return true;
  },
  bookmarkPost: async ({ postId, userId }: BookmarkPostArgs) => {
    const bookmark: any = await Bookmark.findOne({ where: { postId, userId } });
    if (bookmark) {
      throw new Error("Bookmark is exist already.");
    }

    const createdBookmarkData: any = await Bookmark.create({ postId, userId });
    const createdBookmark: IBookmark = createdBookmarkData.dataValues as IBookmark;
    return createdBookmark;
  },
  unbookmarkPost: async ({ postId, userId }: BookmarkPostArgs) => {
    const bookmark: any = await Bookmark.findOne({ where: { postId, userId } });
    if (!bookmark) {
      throw new Error("Bookmark isn't exist.");
    }

    await bookmark.destroy();
    return true;
  },
  getUserBookmarkedPosts: async ({ userId }: GetUserBookmarkedPostsArgs) => {
    const user: any = await User.findOne({
      where: { id: userId },
      include: ["bookmarked"],
    });
    if (!user) {
      throw new Error("User not found.");
    }

    const bookmarkedPostsIds: any[] = user.dataValues.bookmarked;
    const bookmarkedPosts: IPost[] = [];

    await Promise.all(
      bookmarkedPostsIds.map(async (bookmarkedPostId: any) => {
        const postData: any = await Post.findOne({
          where: { id: bookmarkedPostId.dataValues.postId },
        });
        if (postData) {
          bookmarkedPosts.push({
            ...postData.dataValues,
            createdAt: postData.createdAt.toISOString(),
          });
        }
      })
    );
    return bookmarkedPosts;
  },
  getUserPosts: async ({ userId }: GetUserPostsArgs) => {
    const user: any = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found.");
    }

    const postsData: any[] = await user.getPosts();
    const posts: IPost[] = postsData.map((postData: any) => ({
      ...postData.dataValues,
      createdAt: postData.createdAt.toISOString(),
      updatedAt: postData.updatedAt.toISOString(),
    }));

    return posts;
  },
  getPostComments: async ({ postId }: GetPostCommentsArgs) => {
    const post: any = await Post.findOne({ where: { id: postId } });
    if (!post) {
      throw new Error("Post not found.");
    }

    const commentsData: any[] = await post.getComments();
    const comments: IComment[] = commentsData.map((commentData: any) => ({
      ...commentData.dataValues,
      createdAt: commentData.createdAt.toISOString(),
      updatedAt: commentData.updatedAt.toISOString(),
    }));

    return comments;
  },
};
