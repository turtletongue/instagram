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

  input UserInputData {
    name: String
    username: String!
    bio: String
    avatarUrl: String
    password: String!
  }

  input PostInputData {
    imageUrl: String!
    username: String!
  }

  input CommentInputData {
    content: String!
    username: String!
    postId: Int!
  }

  type RootMutation {
    createUser(userInput: UserInputData): User!
    createPost(postInput: PostInputData): Post!
    createComment(commentInput: CommentInputData): Comment!
    follow(followerId: Int!, followingId: Int!): Boolean!
    likePost(postId: Int!, userId: Int!): Like!
    likeComment(commentId: Int!, postId: Int!, userId: Int!): Like!
    unlikePost(postId: Int!, userId: Int!): Boolean!
    unlikeComment(commentId: Int!, postId: Int!, userId: Int!): Boolean!
    bookmarkPost(postId: Int!, userId: Int!): Bookmark!
    unbookmarkPost(postId: Int!, userId: Int!): Boolean!
  }

  type AuthData {
    token: String!
    username: String!
  }

  type RootQuery {
    login(username: String!, password: String!): AuthData!
    getFollowingPosts(username: String!, slice: Int!): [Post!]!
    isUserLikePost(userId: Int!, postId: Int!): Boolean!
    isUserLikeComment(userId: Int!, postId: Int!, commentId: Int!): Boolean!
    getUserBookmarkedPosts(userId: Int!): [Post!]!
    getUserPosts(userId: Int!): [Post!]!
    getPostComments(postId: Int!): [Comment!]!
  }

  schema {
    mutation: RootMutation
    query: RootQuery
  }
`);
