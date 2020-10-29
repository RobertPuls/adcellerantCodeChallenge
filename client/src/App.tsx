// TODO: add types to everything
// TODO: fix this
// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect, useLayoutEffect } from 'react';
import Header from './components/Header';
import Table from './components/Table';
import queryBuilder from './util/queryBuilder';
import fetcher from './util/fetcher';
import { sourcesQuery, productsQuery } from './queries';

interface Source {
  source: string;
}

interface Product {
  product: string;
}

// eslint-disable-next-line no-restricted-globals
const isValidDate = (date: string) => !isNaN(Date.parse(date));

const App = () => {
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('2019-04-01');
  const [selectedEndDate, setSelectedEndDate] = useState('2019-04-05');
  const [sources, setSources] = useState([]);
  const [products, setProducts] = useState([]);
  const [clickData, setClickData] = useState([]);
  const [sortBy, setSortBy] = useState('Date');

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
    selectedSource,
    selectedProduct,
    selectedEndDate,
    selectedEndDate,
    sortBy,
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
      />
      <Table
        clickData={clickData}
      />
    </div>
  );
};

export default App;