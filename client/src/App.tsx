// TODO: fix this
// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect, useLayoutEffect } from 'react';
import Header from './components/Header';
import queryBuilder from './util/queryBuilder';
import fetcher from './util/fetcher';
import { sourcesQuery } from './queries';

interface Source {
  source: string;
}

const App = () => {
  const [selectedSource, setSelectedSource] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState('All');
  const [selectedStartDate, setSelectedStartDate] = React.useState('2019-04-01');
  const [selectedEndDate, setSelectedEndDate] = React.useState('2019-04-05');
  const [sources, setSources] = React.useState(['All']);
  const [products] = React.useState(['All', 'A', 'B']);

  const getSources = async () => {
    let allSources = await fetcher(sourcesQuery);
    allSources = allSources.getSourceData.map((source: Source) => source.source);
    allSources.unshift('All');
    setSources(allSources);
  };

  useEffect(() => {
    console.log('here');
    getSources();
  }, []);

  useLayoutEffect(() => {
    console.log('thing', getSources());
    const query = queryBuilder({
      selectedSource,
      selectedProduct,
      selectedEndDate,
      selectedStartDate,
    });
    // fetchClicks(query).adDataByAll;
    fetcher(query);
  }, [
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
      />
    </div>
  );
};

export default App;
