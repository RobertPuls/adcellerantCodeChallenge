const sortByOrder = (sortBy) => {
  if (sortBy === 'source' || sortBy === 'product') {
    return { [sortBy]: 1 };
  }
  return { [sortBy]: -1 };
};

const getTommorow = (endDate) => {
  const tmpDate = new Date(endDate);
  tmpDate.setDate(tmpDate.getDate() + 1);
  return tmpDate;
};

module.exports = {
  sortByOrder,
  getTommorow,
};
