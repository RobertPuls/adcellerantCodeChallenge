const { gql } = require('apollo-server-express');

// TODO: update everything to get...
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  scalar Date

  type Query {
    hello: String,
    adData: [AdDataRecord!]!,
    adDataBySource(source: String!): [AdDataRecord!]!,
    adDataByProduct(product: String!): [AdDataRecord!]!,
    totalClicksBySource(source: String!): sourceTotalClicks,
    adDataByDate(date: String!): [AdDataRecord!]!,
    adDataByDateRange(startDate: String!, endDate: String!): [AdDataRecord!]!,
    adDataByAll(
      source: String,
      product: String,
      startDate: String!,
      endDate: String!,
      sortBy: String!,
    ): [AdDataRecord!]!,
    getSourceData: [SourceDataRecord!]!,
    getProductData: [ProductDataRecord!]!
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
    date: Date!
  }

  type SourceDataRecord {
    id: ID!,
    source: String!
  }

  type ProductDataRecord {
    id: ID!,
    product: String!
  }

  type Mutation {
    createAdDataRecord(source: String!, product: String!, clicks: Int!, date: String!): AdDataRecord!
  }
`;

module.exports = typeDefs;
