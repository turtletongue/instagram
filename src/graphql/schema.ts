import { buildSchema } from "graphql";

export default buildSchema(`
  type Bookmark {
    id: ID!
    postId: Int!
    userId: Int!
  }

  type Like {
    id: ID!
    postId: Int
    commentId: Int
    userId: Int!
  }

  type Comment {
    id: ID!
    content: String!
    createdAt: String!
  }

  type Post {
    id: ID!
    imageUrl: String!
    createdAt: String!
    likesCount: Int!
  }

  type User {
    id: ID!
    name: String
    username: String!
    bio: String
    avatarUrl: String
    password: String!
    posts: [Post!]!
  }

  type Activity {
    id: ID!
    content: String!
    authorId: String!
    createdAt: String!
  }

  type AuthData {
    token: String!
    userId: Int!
  }

  input UserInputData {
    name: String
    username: String!
    bio: String
    avatarUrl: String
    password: String!
  }

  input CommentInputData {
    content: String!
    postId: Int!
  }

  input UpdateUserData {
    name: String
    username: String!
    bio: String
    avatarUrl: String
  }

  type RootMutation {
    createUser(userInput: UserInputData): User!
    createPost(imageUrl: String!): Post!
    createComment(commentInput: CommentInputData): Comment!
    follow(followingId: Int!): Boolean!
    likePost(postId: Int!): Like!
    likeComment(commentId: Int!, postId: Int!): Like!
    unlikePost(postId: Int!): Boolean!
    unlikeComment(commentId: Int!, postId: Int!): Boolean!
    bookmarkPost(postId: Int!): Bookmark!
    unbookmarkPost(postId: Int!): Boolean!
    updateUserData(updateUserDataInput: UpdateUserData): Boolean!
    updatePassword(oldPassword: String!, newPassword: String!): Boolean!
    createActivity(receiverId: Int!, content: String!): Activity!
  }

  type RootQuery {
    login(username: String!, password: String!): AuthData!
    getFollowingPosts(slice: Int!): [Post!]!
    isUserLikePost(userId: Int!, postId: Int!): Boolean!
    isUserLikeComment(userId: Int!, postId: Int!, commentId: Int!): Boolean!
    getUserBookmarkedPosts: [Post!]!
    getUserPosts(userId: Int!): [Post!]!
    getPostComments(postId: Int!): [Comment!]!
    getPostById(postId: Int!): Post
    getUserById(userId: Int!): User
    getUserActivities: [Activity!]!
  }

  schema {
    mutation: RootMutation
    query: RootQuery
  }
`);
