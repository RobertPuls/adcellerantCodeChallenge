const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String,
    adData: [AdDataRecord!]!,
    adDataBySource(source: String!): [AdDataRecord!]!,
    adDataByProduct(product: String!): [AdDataRecord!]!,
    totalClicksBySource(source: String!): sourceTotalClicks,
    adDataByDate(date: String!): [AdDataRecord!]!,
    adDataByDateRange(startDate: String!, endDate: String!): [AdDataRecord!]!,
  }

  type sourceTotalClicks{
    source: String!,
    clicks: Int!
  }

  type AdDataRecord {
    id: ID!,
    source: String!,
    product: String!,
    clicks: Int!,
    date: String!
  }

  type Mutation {
    createAdDataRecord(source: String!, product: String!, clicks: Int!, date: String!): AdDataRecord!
  }
`;

module.exports = typeDefs;
