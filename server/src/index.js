const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require ('./typeDefs');
const resolvers = require('./resolvers');

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  
  await mongoose.connect('mongodb://localhost/ad-data', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // TODO: Update .catch to try catch
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.log('Not Connected to Database ERROR! ', err);
  });

  server.applyMiddleware({ app });
  
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();


// const { Router } = require('express');

// const AdDataEntry = require('../models/AdDataEntry');

// const router = Router();

// // Get all entires
// router.get('/', async (req, res, next) => {
//   try {
//     const entries = await AdDataEntry.find();
//     res.json(entries);
//   } catch (error) {
//     next(error);
//   }
// });

// // Create one entry
// router.post('/', async (req, res, next) => {
//   try {
//     console.log(req.body);
//     const adDataEntry = new AdDataEntry(req.body);
//     const createdEntry = await adDataEntry.save();
//     res.json(createdEntry);
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       res.status(400);
//     }
//     next(error);
//   }
// });

// module.exports = router;
