interface Props {
  selectedStartDate: string;
  selectedEndDate: string;
  selectedSource: string;
  selectedProduct: string;
}

const queryBuilder = ({
  selectedStartDate,
  selectedEndDate,
  selectedSource,
  selectedProduct,
}: Props) => (
  `{
    adDataByAll(startDate: "${selectedStartDate}",
    endDate: "${selectedEndDate}",
    ${selectedSource !== 'All'
    ? `source: "${selectedSource}"`
    : ''},
    ${selectedProduct !== 'All'
    ? `product: "${selectedProduct}"`
    : ''}) {
      source,
      clicks,
      date,
      product
    }
  }`
);

export default queryBuilder;
