const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const Observer = require('./utils/Observer');
const { fileTypes } = require('./consts/consts');

require('dotenv').config();

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });

  await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // TODO: Update .catch to try catch
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.log('Not Connected to Database ERROR! ', err);
  });

  const observer = new Observer();

  observer.watchFile('./src/data/adData', fileTypes.AD);
  observer.watchFile('./src/data/productData', fileTypes.PRODUCT);
  observer.watchFile('./src/data/sourceData', fileTypes.SOURCE);

  server.applyMiddleware({ app });

  const port = process.env.PORT || 1337;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
};

startServer();
