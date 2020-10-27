const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const Observer = require('./utils/Observer');

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });

  // TODO: put in .env file
  await mongoose.connect('mongodb://localhost/ad-data', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // TODO: Update .catch to try catch
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.log('Not Connected to Database ERROR! ', err);
  });

  const observer = new Observer();

  // TODO: use enum for AD
  observer.watchFile('./src/data/adData', 'AD');
  observer.watchFile('./src/data/productData', 'PRODUCT');
  observer.watchFile('./src/data/sourceData', 'SOURCE');

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();
