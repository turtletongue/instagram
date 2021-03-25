import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import Followers from "../models/Followers";
import Post from "../models/Post";
import User from "../models/User";

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

type getFollowingPosts = {
  username: string;
};

type FollowArgs = {
  followerId: number;
  followingId: number;
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
  }: getFollowingPosts): Promise<any[]> => {
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
    return followingsPosts;
  },
};
