const AdDataEntry = require('./models/adDataEntry');

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    adData: async () => await AdDataEntry.find(),
    adDataBySource: async (_, {source}) => await AdDataEntry.find({ source }).exec(),
    adDataByProduct: async (_, {product}) => await AdDataEntry.find({ product }).exec(),
    totalClicksBySource: async (_, {source}) => {
      let totalClicks = 0;
      // TODO: Rename
      const adDataBySource = await AdDataEntry.find({ source }, 'clicks').exec();
      adDataBySource.forEach((adData) => totalClicks += adData.clicks);

      return {
        source,
        clicks: totalClicks,
      };
    },
    adDataByDate: async (_, {date}) => await AdDataEntry.find({date}),
    adDataByDateRange: async (_, {startDate, endDate}) => await AdDataEntry.find({
      "date": {"$gte": new Date(startDate), "$lt": new Date(endDate)}
    })
  },
  Mutation: {
    createAdDataRecord: async (_, {source, product, clicks, date}) => {
      const adDataEntry = new AdDataEntry({source, product, clicks, date});
      return await adDataEntry.save();
    }
  }
};

module.exports = resolvers;
