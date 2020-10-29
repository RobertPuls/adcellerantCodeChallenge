const AdDataEntry = require('./models/adDataEntry');
const ProductDataEntry = require('./models/productDataEnrty');
const SourceDataEntry = require('./models/sourceDataEntry');
const sortByOrder = require('./utils/sortByOrder');

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
    adDataByAll: (_, {
      startDate,
      endDate,
      sortBy,
      ...queryParams
    }) => AdDataEntry.find({
      ...queryParams,
      date: {
        $gte: new Date(startDate),
        $lt: new Date(endDate),
      },
    }).sort(sortByOrder(sortBy)).exec(),
    getSourceData: () => SourceDataEntry.find().sort({ source: 1 }),
    // getSourceData: async () => {
    //   const sources = await SourceDataEntry.find();
    //   console.log('sources', sources.map((source) => source.source));
    //   return sources.map((source) => source.source);
    // },
    getProductData: () => ProductDataEntry.find().sort({ product: 1 }),
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
