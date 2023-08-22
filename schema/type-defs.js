const { gql } = require("apollo-server");

const typeDefs = gql`
  enum Nationality {
    CANADA
    BRAZIL
    USA
    GERMANY
    FRANCE
    CHINA
    CHILE
    INDIA
  }

  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }
`;

module.exports = { typeDefs };
