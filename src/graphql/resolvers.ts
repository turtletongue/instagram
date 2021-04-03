import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import natural from "natural";
import validator from "validator";
import { AuthRequest } from "../middleware/auth";
import { ActivityInstance } from "../models/Activity";
import Bookmark, { BookmarkInstance } from "../models/Bookmark";
import Comment, { CommentInstance } from "../models/Comment";
import Followers, { FollowersInstance } from "../models/Followers";
import Like, { LikeInstance } from "../models/Like";
import Post, { PostInstance } from "../models/Post";
import SliderImage from "../models/SliderImage";
import User, { UserInstance } from "../models/User";

const metaphone = natural.Metaphone;

const MAX_FOLLOWING_POSTS_COUNT: number = 5;
const MAX_USERS_IF_INPUT_LT_THREE_LETTERS: number = 10;
const MS_IN_MOUNTH: number = 1000 * 60 * 60 * 24 * 7 * 4;

interface IPost {
  id: number;
  imageUrl: string;
  isLiked: boolean;
  isBookmarked: boolean;
  author: UserInstance;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  comments: IComment[];
  userId?: number;
}

interface IComment {
  id: number;
  content: string;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
  authorName: string;
  postId: number;
}

interface IActivity {
  id: number;
  author: UserInstance;
  content: string;
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
  imageUrl: string;
};

type LoginArgs = {
  username: string;
  password: string;
};

type CommentArgs = {
  commentInput: {
    content: string;
    postId: number;
  };
};

type GetFollowingPostsArgs = {
  slice: number;
};

type FollowArgs = {
  followingId: number;
};

type LikePostArgs = {
  postId: number;
};

type LikeCommentArgs = {
  commentId: number;
  postId: number;
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
};

type GetUserPostsArgs = {
  username: string;
};

type GetPostByIdArgs = {
  postId: number;
};

type GetUserByIdArgs = {
  userId: number;
};

type UpdateUserDataArgs = {
  updateUserDataInput: {
    id: number;
    name?: string;
    username: string;
    bio?: string;
    avatarUrl?: string;
  };
};

type UpdatePasswordArgs = {
  userId: number;
  oldPassword: string;
  newPassword: string;
};

type CreateActivityArgs = {
  receiverId: number;
  content: string;
};

type GetUserByUsernameArgs = {
  username: string;
};

type SearchUsersArgs = {
  input: string;
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

class AuthError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default {
  createUser: async ({ userInput }: CreateUserArgs) => {
    const errors: ValidationError[] = [];
    const existingUser: UserInstance = await User.findOne({
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
    const createdUser: UserInstance = await User.create({
      ...userInput,
      password: hashedPassword,
    });
    return createdUser;
  },
  createPost: async ({ imageUrl }: CreatePostArgs, req: AuthRequest) => {
    if (!req.isAuth) {
      throw new AuthError("Not authenticated.");
    }
    const author: UserInstance = await User.findByPk(req.userId);
    if (!author) throw new Error("Author of post didn't exist.");
    const errors: ValidationError[] = [];
    if (!validator.isURL(imageUrl)) {
      errors.push(new ValidationError("Image URL should be URL."));
    }
    if (errors.length > 0) {
      throw new InvalidInputError("Invalid input.", errors);
    }

    const createdPost: { dataValues: PostInstance } = await author.createPost({
      imageUrl: imageUrl,
      likesCount: 0,
    });
    return {
      id: createdPost.dataValues.id,
      imageUrl: createdPost.dataValues.imageUrl,
      likesCount: createdPost.dataValues.likesCount,
      createdAt: createdPost.dataValues.createdAt.toISOString(),
      updatedAt: createdPost.dataValues.updatedAt.toISOString(),
    };
  },
  createComment: async (
    { commentInput: { content, postId } }: CommentArgs,
    req: AuthRequest
  ) => {
    if (!req.isAuth) {
      throw new AuthError("Not authenticated.");
    }
    const post: PostInstance = await Post.findByPk(postId);
    if (!post) {
      throw new Error("Post not found.");
    }
    const user: UserInstance = await User.findByPk(req.userId);
    if (!user) {
      throw new Error("User not found.");
    }
    const errors: ValidationError[] = [];
    if (!validator.isLength(content, { max: 1024 })) {
      errors.push(new ValidationError("Comment content is very big."));
    }
    if (errors.length > 0) {
      throw new InvalidInputError("Invalid input.", errors);
    }
    const createdComment: CommentInstance = await post.createComment({
      authorName: user.username,
      content,
    });
    return { ...createdComment.dataValues, isLiked: false };
  },
  login: async ({ username, password }: LoginArgs) => {
    const userData: UserInstance = await User.findOne({ where: { username } });
    if (!userData) {
      throw new Error("User not found.");
    }
    const isEqual: boolean = await bcrypt.compare(password, userData.password);
    if (!isEqual) {
      throw new Error("Wrong password.");
    }
    const token: string = jwt.sign(
      { userId: userData.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return { token, userId: userData.id };
  },
  follow: async ({ followingId }: FollowArgs, req: AuthRequest) => {
    if (!req.isAuth) {
      throw new Error("Not authenticated.");
    }
    const follower: UserInstance = await User.findByPk(req.userId);
    if (!follower) {
      throw new Error("Follower not found.");
    }
    const followingUser: UserInstance = await User.findByPk(followingId);
    if (!followingUser) {
      throw new Error("Following not found.");
    }
    const following: FollowersInstance = await Followers.findOne({
      where: { followerId: req.userId, followingId },
    });
    if (following) {
      throw new Error("Following is already created.");
    }
    await Followers.create({ followerId: req.userId, followingId });
    await followingUser.createActivity({
      content: `started following you.`,
      authorId: req.userId,
    });
    return true;
  },
  unfollow: async ({ followingId }: FollowArgs, req: AuthRequest) => {
    if (!req.isAuth) {
      throw new Error("Not authenticated.");
    }
    const following = await Followers.findOne({
      where: { followerId: req.userId, followingId },
    });
    if (!following) {
      throw new Error("Following not found.");
    }
    await following.destroy();
    return true;
  },
  getFollowingPosts: async (
    { slice }: GetFollowingPostsArgs,
    req: AuthRequest
  ) => {
    if (!req.isAuth) {
      throw new AuthError("Not authenticated.");
    }
    const followings: UserInstance = await User.findOne({
      where: { id: req.userId },
      include: ["following", "followers"],
    });
    const followingsPosts: IPost[] = [];
    await Promise.all(
      followings.following.map(async (following: UserInstance) => {
        const posts: PostInstance[] = await following.getPosts();
        await Promise.all(
          posts.map(async (post: PostInstance) => {
            const postAuthor: UserInstance = await User.findByPk(post.userId);
            if (!postAuthor) {
              throw new Error("Author of post not found.");
            }
            let isBookmarked: boolean = false;
            const bookmark: BookmarkInstance = await Bookmark.findOne({
              where: {
                postId: post.id,
                userId: req.userId,
              },
            });
            if (bookmark) {
              isBookmarked = true;
            }
            let isPostLiked: boolean = false;
            const like: LikeInstance = await Like.findOne({
              where: {
                postId: post.id,
                commentId: null,
                userId: req.userId,
              },
            });
            if (like) {
              isPostLiked = true;
            }
            const commentsData: CommentInstance[] = await post.getComments();
            const comments: IComment[] = [];
            await Promise.all(
              commentsData.map(async (commentData: CommentInstance) => {
                let isLiked: boolean = false;
                const like: LikeInstance = await Like.findOne({
                  where: {
                    postId: post.id,
                    commentId: commentData.id,
                    userId: req.userId,
                  },
                });
                if (like) {
                  isLiked = true;
                }
                comments.push({
                  id: commentData.id,
                  content: commentData.content,
                  isLiked,
                  postId: post.id,
                  authorName: commentData.authorName,
                  createdAt: commentData.createdAt.toISOString(),
                  updatedAt: commentData.updatedAt.toISOString(),
                });
              })
            );
            followingsPosts.push({
              id: post.id,
              imageUrl: post.imageUrl,
              likesCount: post.likesCount,
              userId: post.userId,
              comments,
              isLiked: isPostLiked,
              isBookmarked,
              author: postAuthor,
              createdAt: post.createdAt.toISOString(),
              updatedAt: post.updatedAt.toISOString(),
            });
          })
        );
      })
    );
    const end: number =
      slice * MAX_FOLLOWING_POSTS_COUNT -
      MAX_FOLLOWING_POSTS_COUNT +
      MAX_FOLLOWING_POSTS_COUNT;
    followingsPosts.sort(
      (a: IPost, b: IPost) =>
        Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
    );
    return followingsPosts.slice(0, end);
  },
  likePost: async ({ postId }: LikePostArgs, req: AuthRequest) => {
    if (!req.isAuth) {
      throw new AuthError("Not authenticated.");
    }
    const post: PostInstance = await Post.findByPk(postId);
    if (!post) {
      throw new Error("Post not found.");
    }
    const like: LikeInstance = await Like.findOne({
      where: { postId, userId: req.userId },
    });
    if (like) {
      throw new Error("Like is exist already.");
    }

    await post.increment("likesCount", { by: 1 });
    const createdLike: LikeInstance = await Like.create({
      postId,
      userId: req.userId,
    });
    return createdLike;
  },
  likeComment: async (
    { commentId, postId }: LikeCommentArgs,
    req: AuthRequest
  ) => {
    if (!req.isAuth) {
      throw new AuthError("Not authenticated.");
    }
    const like: LikeInstance = await Like.findOne({
      where: { commentId, postId, userId: req.userId },
    });
    if (like) {
      throw new Error("Like is exist already.");
    }

    const comment: CommentInstance = await Comment.findByPk(commentId);

    if (!comment) {
      throw new Error("Comment not found.");
    }

    const commentAuthor: UserInstance = await User.findOne({
      where: { username: comment.authorName },
    });

    if (!commentAuthor) {
      throw new Error("Author of comment not found.");
    }

    await commentAuthor.createActivity({
      content: "liked your comment.",
      authorId: req.userId,
    });

    const createdLike: LikeInstance = await Like.create({
      commentId,
      postId,
      userId: req.userId,
    });
    return createdLike;
  },
  unlikePost: async ({ postId }: LikePostArgs, req: AuthRequest) => {
    if (!req.isAuth) {
      throw new AuthError("Not authenticated.");
    }
    const post: PostInstance = await Post.findByPk(postId);
    if (!post) {
      throw new Error("Post not found.");
    }
    const like: LikeInstance = await Like.findOne({
      where: { postId, userId: req.userId },
    });
    if (!like) {
      throw new Error("Like isn't exist.");
    }

    await post.decrement("likesCount", { by: 1 });
    await like.destroy();
    return true;
  },
  unlikeComment: async (
    { commentId, postId }: LikeCommentArgs,
    req: AuthRequest
  ) => {
    if (!req.isAuth) {
      throw new AuthError("Not authenticated.");
    }
    const like: LikeInstance = await Like.findOne({
      where: { commentId, postId, userId: req.userId },
    });
    if (!like) {
      throw new Error("Like isn't exist.");
    }

    await like.destroy();
    return true;
  },
  isUserLikePost: async ({ userId, postId }: IsUserLikedPostArgs) => {
    const like: LikeInstance = await Like.findOne({
      where: { userId, postId },
    });
    if (!like) {
      return false;
    }

    return true;
  },
  isUserBookmarkPost: async ({ userId, postId }: IsUserLikedPostArgs) => {
    const bookmark: BookmarkInstance = await Bookmark.findOne({
      where: { userId, postId },
    });
    if (!bookmark) {
      return false;
    }

    return true;
  },
  isUserLikeComment: async ({
    userId,
    postId,
    commentId,
  }: IsUserLikedCommentArgs) => {
    const like: LikeInstance = await Like.findOne({
      where: { userId, postId, commentId },
    });
    if (!like) {
      return false;
    }

    return true;
  },
  bookmarkPost: async ({ postId }: BookmarkPostArgs, req: AuthRequest) => {
    if (!req.isAuth) {
      throw new AuthError("Not authenticated.");
    }
    const bookmark: BookmarkInstance = await Bookmark.findOne({
      where: { postId, userId: req.userId },
    });
    if (bookmark) {
      throw new Error("Bookmark is exist already.");
    }

    const createdBookmark: BookmarkInstance = await Bookmark.create({
      postId,
      userId: req.userId,
    });
    return createdBookmark;
  },
  unbookmarkPost: async ({ postId }: BookmarkPostArgs, req: AuthRequest) => {
    if (!req.isAuth) {
      throw new AuthError("Not authenticated.");
    }
    const bookmark: BookmarkInstance = await Bookmark.findOne({
      where: { postId, userId: req.userId },
    });
    if (!bookmark) {
      throw new Error("Bookmark isn't exist.");
    }

    await bookmark.destroy();
    return true;
  },
  getUserBookmarkedPosts: async (args: any, req: AuthRequest) => {
    if (!req.isAuth) {
      throw new AuthError("Not authenticated.");
    }
    const user: UserInstance = await User.findOne({
      where: { id: req.userId },
      include: ["bookmarked"],
    });
    if (!user) {
      throw new Error("User not found.");
    }

    const postsBookmarks: BookmarkInstance[] = user.bookmarked;
    const bookmarkedPosts: IPost[] = [];

    await Promise.all(
      postsBookmarks.map(async (postBookmark: BookmarkInstance) => {
        const postData: PostInstance = await Post.findOne({
          where: { id: postBookmark.postId },
        });
        const postAuthor: UserInstance = await User.findByPk(postData.userId);
        if (!postAuthor) {
          throw new Error("Author of post not found.");
        }
        let isLiked: boolean = false;
        const like: LikeInstance = await Like.findOne({
          where: {
            postId: postData.id,
            commentId: null,
            userId: req.userId,
          },
        });
        if (like) {
          isLiked = true;
        }
        const commentsData: CommentInstance[] = await postData.getComments();
        const comments: IComment[] = [];
        await Promise.all(
          commentsData.map(async (commentData: CommentInstance) => {
            let isLiked: boolean = false;
            const like: LikeInstance = await Like.findOne({
              where: {
                postId: postData.id,
                commentId: commentData.id,
                userId: req.userId,
              },
            });
            if (like) {
              isLiked = true;
            }
            comments.push({
              id: commentData.id,
              content: commentData.content,
              isLiked,
              postId: postData.id,
              authorName: commentData.authorName,
              createdAt: commentData.createdAt.toISOString(),
              updatedAt: commentData.updatedAt.toISOString(),
            });
          })
        );
        if (postData) {
          bookmarkedPosts.push({
            id: postData.id,
            imageUrl: postData.imageUrl,
            likesCount: postData.likesCount,
            comments,
            isLiked,
            isBookmarked: true,
            author: postAuthor,
            createdAt: postData.createdAt.toISOString(),
            updatedAt: postData.updatedAt.toISOString(),
          });
        }
      })
    );
    return bookmarkedPosts;
  },
  getUserPosts: async ({ username }: GetUserPostsArgs, req: AuthRequest) => {
    if (!req.isAuth) {
      throw new Error("Not authenticated.");
    }
    const requestedUser = await User.findByPk(req.userId);
    if (!requestedUser) {
      throw new Error("Request sender not found.");
    }
    const user: UserInstance = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error("User not found.");
    }

    const postsData: PostInstance[] = await user.getPosts();
    const posts: IPost[] = [];
    await Promise.all(
      postsData.map(async (postData: PostInstance) => {
        const postAuthor: UserInstance = await User.findByPk(postData.userId);
        if (!postAuthor) {
          throw new Error("Author of post not found.");
        }
        let isLiked: boolean = false;
        const like: LikeInstance = await Like.findOne({
          where: {
            postId: postData.id,
            commentId: null,
            userId: req.userId,
          },
        });
        if (like) {
          isLiked = true;
        }
        let isBookmarked: boolean = false;
        const bookmark: BookmarkInstance = await Bookmark.findOne({
          where: {
            postId: postData.id,
            userId: req.userId,
          },
        });
        if (bookmark) {
          isBookmarked = true;
        }
        const comments: IComment[] = [];
        const commentsData: CommentInstance[] = await postData.getComments();
        await Promise.all(
          commentsData.map(async (commentData: CommentInstance) => {
            let isLiked: boolean = false;
            const like: LikeInstance = await Like.findOne({
              where: {
                postId: postData.id,
                commentId: commentData.id,
                userId: req.userId,
              },
            });
            if (like) {
              isLiked = true;
            }
            comments.push({
              id: commentData.id,
              content: commentData.content,
              isLiked,
              postId: postData.id,
              authorName: commentData.authorName,
              createdAt: commentData.createdAt.toISOString(),
              updatedAt: commentData.updatedAt.toISOString(),
            });
          })
        );
        posts.push({
          id: postData.id,
          imageUrl: postData.imageUrl,
          likesCount: postData.likesCount,
          comments,
          isLiked,
          isBookmarked,
          author: postAuthor,
          createdAt: postData.createdAt.toISOString(),
          updatedAt: postData.updatedAt.toISOString(),
        });
      })
    );
    return posts;
  },
  getPostById: async ({ postId }: GetPostByIdArgs, req: AuthRequest) => {
    if (!req.isAuth) {
      throw new Error("Not authenticated.");
    }
    const postData: PostInstance = await Post.findOne({
      where: { id: postId },
    });
    const postAuthor: UserInstance = await User.findByPk(postData.userId);
    if (!postAuthor) {
      throw new Error("Author of post not found.");
    }
    const like: LikeInstance = await Like.findOne({
      where: {
        postId: postData.id,
        commentId: null,
        userId: req.userId,
      },
    });
    let isPostLiked: boolean = false;
    if (like) {
      isPostLiked = true;
    }
    let isPostBookmarked: boolean = false;
    const bookmark: BookmarkInstance = await Bookmark.findOne({
      where: {
        postId: postData.id,
        userId: req.userId,
      },
    });
    if (bookmark) {
      isPostBookmarked = true;
    }
    const comments: IComment[] = [];
    const commentsData: CommentInstance[] = await postData.getComments();
    await Promise.all(
      commentsData.map(async (commentData: CommentInstance) => {
        let isLiked: boolean = false;
        const like: LikeInstance = await Like.findOne({
          where: {
            postId: postData.id,
            commentId: commentData.id,
            userId: req.userId,
          },
        });
        if (like) {
          isLiked = true;
        }
        comments.push({
          id: commentData.id,
          content: commentData.content,
          isLiked,
          postId: postData.id,
          authorName: commentData.authorName,
          createdAt: commentData.createdAt.toISOString(),
          updatedAt: commentData.updatedAt.toISOString(),
        });
      })
    );
    const post = {
      ...postData.dataValues,
      isLiked: isPostLiked,
      isBookmarked: isPostBookmarked,
      comments,
      author: postAuthor.dataValues,
    };
    return post;
  },
  getUserById: async ({ userId }: GetUserByIdArgs) => {
    const user: UserInstance = await User.findOne({
      where: { id: userId },
      include: ["following", "followers"],
    });
    user.followers = user.followers.map(
      (follower: UserInstance) => follower.dataValues
    );
    user.following = user.following.map(
      (following: UserInstance) => following.dataValues
    );
    user.password = "";
    return user.dataValues;
  },
  getUserByUsername: async ({ username }: GetUserByUsernameArgs) => {
    const user: UserInstance = await User.findOne({
      where: { username },
      include: ["following", "followers"],
    });
    user.followers = user.followers.map(
      (follower: UserInstance) => follower.dataValues
    );
    user.following = user.following.map(
      (following: UserInstance) => following.dataValues
    );
    user.password = "";
    return user.dataValues;
  },
  updateUserData: async (
    {
      updateUserDataInput: { name, username, bio, avatarUrl },
    }: UpdateUserDataArgs,
    req: AuthRequest
  ) => {
    if (!req.isAuth) {
      throw new AuthError("Not authenticated.");
    }
    const existingUser: UserInstance = await User.findByPk(req.userId);
    if (!existingUser) {
      throw new Error("User not found.");
    }
    if (!username) {
      throw new Error("Incorrect username.");
    }
    const userWithSameUsername: UserInstance = await User.findOne({
      where: { username },
    });
    if (userWithSameUsername && userWithSameUsername.id !== existingUser.id) {
      throw new Error("Username already taken.");
    }
    existingUser.name = name ? name : "";
    existingUser.username = username;
    existingUser.bio = bio ? bio : "";
    existingUser.avatarUrl = avatarUrl ? avatarUrl : "";
    await existingUser.save();
    return true;
  },
  updatePassword: async (
    { oldPassword, newPassword }: UpdatePasswordArgs,
    req: AuthRequest
  ) => {
    if (!req.isAuth) {
      throw new AuthError("Not authenticated.");
    }
    const existingUser: UserInstance = await User.findByPk(req.userId);
    if (!existingUser) {
      throw new Error("User not found.");
    }
    const password: string = existingUser.password;
    const isEquel: boolean = await bcrypt.compare(oldPassword, password);
    if (!isEquel) {
      throw new Error("Wrong password.");
    }
    const hashedPassword: string = await bcrypt.hash(newPassword, 12);
    existingUser.password = hashedPassword;
    await existingUser.save();
    return true;
  },
  createActivity: async (
    { receiverId, content }: CreateActivityArgs,
    req: AuthRequest
  ) => {
    if (!req.isAuth) {
      throw new AuthError("Not authenticated.");
    }
    const receiver: UserInstance = await User.findByPk(receiverId);
    if (!receiver) {
      throw new Error("User not found.");
    }
    const createdActivity: ActivityInstance = await receiver.createActivity({
      content,
      authorId: req.userId,
    });

    return createdActivity;
  },
  getUserActivities: async (args: any, req: AuthRequest) => {
    if (!req.isAuth) {
      throw new AuthError("Not authenticated.");
    }
    const user: UserInstance = await User.findByPk(req.userId);
    if (!user) {
      throw new Error("User not found.");
    }
    const activities: ActivityInstance[] = await user.getActivities({
      order: [["createdAt", "DESC"]],
    });
    const filteredActivities: ActivityInstance[] = activities.filter(
      (activity: ActivityInstance) =>
        Number(activity.createdAt) > Number(Date.now()) - MS_IN_MOUNTH
    );

    const resultActivities: IActivity[] = [];
    await Promise.all(
      filteredActivities.map(async (activity: ActivityInstance) => {
        const activityAuthor = await User.findByPk(activity.authorId);
        if (!activityAuthor) {
          throw new Error("Author of activity not found.");
        }
        resultActivities.push({
          ...activity.dataValues,
          author: activityAuthor,
        });
      })
    );

    return resultActivities;
  },
  sliderImages: async () => {
    const sliderImages = await SliderImage.findAll();
    if (!sliderImages) return [];
    return sliderImages;
  },
  searchUsers: async ({ input }: SearchUsersArgs) => {
    const allUsers: UserInstance[] = await User.findAll();
    const searchedUsers: UserInstance[] = allUsers
      .filter((user: UserInstance) => {
        return (
          metaphone.compare(input, user.username) ||
          user.username.includes(input)
        );
      })
      .slice(
        0,
        input.length < 3 ? MAX_USERS_IF_INPUT_LT_THREE_LETTERS : undefined
      );

    return searchedUsers;
  },
};
