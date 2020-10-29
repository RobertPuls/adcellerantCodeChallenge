interface Props {
  selectedStartDate: string;
  selectedEndDate: string;
  selectedSource: string;
  selectedProduct: string;
  sortBy: string;
}

const queryBuilder = ({
  selectedStartDate,
  selectedEndDate,
  selectedSource,
  selectedProduct,
  sortBy,
}: Props) => (
  `{
    adDataByAll(startDate: "${selectedStartDate}",
    endDate: "${selectedEndDate}",
    sortBy: "${sortBy.toLowerCase()}"
    ${selectedSource !== 'All'
    ? `source: "${selectedSource}"`
    : ''},
    ${selectedProduct !== 'All'
    ? `product: "${selectedProduct}"`
    : ''}) {
      source,
      clicks,
      date,
      product,
      id
    }
  }`
);

export default queryBuilder;
