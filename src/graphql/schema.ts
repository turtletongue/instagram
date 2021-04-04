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
    userId: Int!
    isLiked: Boolean!
    authorName: String!
    postId: Int!
  }

  type Post {
    id: ID!
    imageUrl: String!
    createdAt: String!
    likesCount: Int!
    author: User!
    isLiked: Boolean!
    isBookmarked: Boolean!
    comments: [Comment!]!
  }

  type User {
    id: ID!
    name: String
    username: String!
    bio: String
    avatarUrl: String
    password: String!
    following: [User!]
    followers: [User!]
    posts: [Post!]!
  }

  type Activity {
    id: ID!
    content: String!
    author: User!
    createdAt: String!
  }

  type AuthData {
    token: String!
    userId: Int!
  }

  type SliderImage {
    id: ID!
    imageUrl: String!
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
    unfollow(followingId: Int!): Boolean!
    likePost(postId: Int!): Like!
    likeComment(commentId: Int!, postId: Int!): Like!
    unlikePost(postId: Int!): Boolean!
    unlikeComment(commentId: Int!, postId: Int!): Boolean!
    bookmarkPost(postId: Int!): Bookmark!
    unbookmarkPost(postId: Int!): Boolean!
    updateUserData(updateUserDataInput: UpdateUserData): Boolean!
    updatePassword(oldPassword: String!, newPassword: String!): Boolean!
    createActivity(receiverId: Int!, content: String!): Activity!
    removeCurrentPhoto: Boolean!
  }

  type RootQuery {
    login(username: String!, password: String!): AuthData!
    getFollowingPosts(slice: Int!): [Post!]!
    isUserLikePost(userId: Int!, postId: Int!): Boolean!
    isUserBookmarkPost(userId: Int!, postId: Int!): Boolean!
    isUserLikeComment(userId: Int!, postId: Int!, commentId: Int!): Boolean!
    getUserBookmarkedPosts: [Post!]!
    getUserPosts(username: String!): [Post!]!
    getPostById(postId: Int!): Post
    getUserById(userId: Int!): User
    getUserByUsername(username: String!): User
    getUserActivities: [Activity!]!
    sliderImages: [SliderImage!]!
    searchUsers(input: String!): [User!]!
  }

  schema {
    mutation: RootMutation
    query: RootQuery
  }
`);
