const sortByOrder = (sortBy) => {
  if (sortBy === 'source' || sortBy === 'product') {
    return { [sortBy]: 1 };
  }
  return { [sortBy]: -1 };
};

module.exports = sortByOrder;
