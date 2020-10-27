const AdDataEntry = require('./models/adDataEntry');

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    adData: () => AdDataEntry.find(),
    adDataBySource: (_, { source }) => AdDataEntry.find({ source }).exec(),
    adDataByProduct: (_, { product }) => AdDataEntry.find({ product }).exec(),
    totalClicksBySource: async (_, { source }) => {
      let totalClicks = 0;
      // TODO: Rename
      const adDataBySource = await AdDataEntry.find({ source }, 'clicks').exec();
      adDataBySource.forEach((adData) => {
        totalClicks += adData.clicks;
      });

      return {
        source,
        clicks: totalClicks,
      };
    },
    adDataByDate: (_, { date }) => AdDataEntry.find({ date }),
    adDataByDateRange: (_, { startDate, endDate }) => AdDataEntry.find({
      date: {
        $gte: new Date(startDate),
        $lt: new Date(endDate),
      },
    }),
  },
  Mutation: {
    createAdDataRecord: (_, {
      source,
      product,
      clicks,
      date,
    }) => {
      const adDataEntry = new AdDataEntry({
        source,
        product,
        clicks,
        date,
      });
      return adDataEntry.save();
    },
  },
};

module.exports = resolvers;
