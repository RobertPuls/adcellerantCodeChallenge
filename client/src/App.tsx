// TODO: add types to everything
// TODO: fix this
// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header';
import Table from './components/Table';
import ChartsContainer from './components/ChartsContainer';
import queryBuilder from './util/queryBuilder';
import fetcher from './util/fetcher';
import { sourcesQuery, productsQuery } from './queries';
import { isValidDate } from './util/helpers';

interface Source {
  source: string;
}

interface Product {
  product: string;
}

const useStyles = makeStyles({
  container: {
    padding: '3rem',
  },
});

// TODO: check scoping on all functions
const App = () => {
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('2019-04-01');
  const [selectedEndDate, setSelectedEndDate] = useState('2019-04-05');
  const [sources, setSources] = useState([]);
  const [products, setProducts] = useState([]);
  const [clickData, setClickData] = useState([]);
  // TODO: put strings in const file
  const [sortBy, setSortBy] = useState('Date');
  const [selectedView, setSelectedView] = useState('Logs');

  const classes = useStyles();

  const getSources = async () => {
    let allSources = await fetcher(sourcesQuery);
    allSources = allSources.getSourceData.map((source: Source) => source.source);
    allSources.unshift('All');
    setSelectedSource(allSources[0]);
    setSources(allSources);
  };

  const getProducts = async () => {
    let allProducts = await fetcher(productsQuery);
    allProducts = allProducts.getProductData.map((product: Product) => product.product);
    allProducts.unshift('All');
    setSelectedProduct(allProducts[0]);
    setProducts(allProducts);
  };
  // Make this paginated call
  const getClickData = async () => {
    const query = queryBuilder({
      selectedSource,
      selectedProduct,
      selectedEndDate,
      selectedStartDate,
      sortBy,
    });
    const adData = await fetcher(query);
    setClickData(adData.adDataByAll);
  };

  useEffect(() => {
    getSources();
    getProducts();
  }, []);

  useLayoutEffect(() => {
    if (isValidDate(selectedStartDate) && isValidDate(selectedEndDate)) {
      getClickData();
    }
  }, [
    selectedView,
    selectedSource,
    selectedProduct,
    selectedEndDate,
    selectedEndDate,
  ]);

  return (
    <div className="App">
      <Header
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        selectedStartDate={selectedStartDate}
        setSelectedStartDate={setSelectedStartDate}
        sources={sources}
        products={products}
        selectedEndDate={selectedEndDate}
        setSelectedEndDate={setSelectedEndDate}
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />
      <div className={classes.container}>
        {selectedView === 'Logs'
          ? <Table clickData={clickData} />
          : (
            <ChartsContainer
              sources={sources}
              selectedEndDate={selectedEndDate}
              selectedProduct={selectedProduct}
              selectedSource={selectedSource}
              selectedStartDate={selectedStartDate}
            />
          )}
      </div>
    </div>
  );
};

export default App;
