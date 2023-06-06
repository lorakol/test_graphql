const { gql } = require('graphql-tools');

const typeDefs = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    companyName: String!
  }

  input UserInput {
    id: ID
    firstName: String!
    lastName: String!
    email: String!
    companyName: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
    getToken: String
  }

  type Mutation {
    upsertUser(input: UserInput!): User
    deleteUser(id: ID!): ID
  }
`;

module.exports = typeDefs;