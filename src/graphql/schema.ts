import { buildSchema } from "graphql";

export default buildSchema(`
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
  }

  type AuthData {
    token: String!
    username: String!
  }

  type RootQuery {
    login(username: String!, password: String!): AuthData!
    getFollowingPosts(username: String!): [Post!]!
  }

  schema {
    mutation: RootMutation
    query: RootQuery
  }
`);
