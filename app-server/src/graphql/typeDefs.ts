import { gql } from 'apollo-server-express';

/**
 * This file is only used for lookups
 */

export const typeDefs: any = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input LoginInput {
    username: String
    password: String
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
  }
`;
