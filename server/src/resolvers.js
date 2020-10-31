const AdDataEntry = require('./models/adDataEntry');
const ProductDataEntry = require('./models/productDataEnrty');
const SourceDataEntry = require('./models/sourceDataEntry');
const { sortByOrder, getTommorow } = require('./utils/utils');

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    adData: () => AdDataEntry.find(),
    adDataBySource: (_, { source }) => AdDataEntry.find({ source }).exec(),
    adDataByProduct: (_, { product }) => AdDataEntry.find({ product }).exec(),
    totalClicksBySource: async (_, { source }) => {
      let totalClicks = 0;
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
    adDataByAllPag: (_, {
      startDate,
      endDate,
      sortBy,
      offset,
      limit,
      ...queryParams
    }) => AdDataEntry.find({
      ...queryParams,
      date: {
        $gte: new Date(startDate),
        $lt: getTommorow(endDate),
      },
    }).skip(offset).limit(limit)
      .sort(sortByOrder(sortBy))
      .exec(),
    adDataByAll: (_, {
      startDate,
      endDate,
      sortBy,
      ...queryParams
    }) => AdDataEntry.find({
      ...queryParams,
      date: {
        $gte: new Date(startDate),
        $lt: getTommorow(endDate),
      },
    }).sort(sortByOrder(sortBy))
      .exec(),
    getSourceData: () => SourceDataEntry.find().sort({ source: 1 }),
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
