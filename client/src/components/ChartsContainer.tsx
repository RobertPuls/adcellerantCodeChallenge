/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect, useLayoutEffect } from 'react';
import queryBuilder from '../util/queryBuilder';
import fetcher from '../util/fetcher';
import { isValidDate } from '../util/helpers';

interface AdData {
  date: string;
  source: string;
  product: string;
  clicks: number;
  id: string;
}

interface AdDataBySource {
  [source: string]: AdData[];
}

interface Props {
  sources: string[];
  selectedSource: string;
  selectedProduct: string;
  selectedEndDate: string;
  selectedStartDate: string;
}

const ChartsContainer = (props: Props) => {
  const {
    sources,
    selectedSource,
    selectedProduct,
    selectedStartDate,
    selectedEndDate,
  } = props;

  const [clickDataBySource, setClickDataBySource] = useState({});
  // TODO restructure how data is returned from api so you don't have to do this here
  const buildClickDataBySource = (clickData: AdData[]) => {
    const adDataBySource: AdDataBySource = {};
    sources.forEach((source: string) => {
      adDataBySource[source] = clickData.filter((adData: AdData) => adData.source === source);
    });
    // Data right here
    console.log('adDataBySource', adDataBySource);
    setClickDataBySource(adDataBySource);
  };

  // TODO: Make another endpoint on backend to hanle this better
  const getClickDataBySource = async () => {
    console.log('selectedProduct', selectedProduct);
    const query = queryBuilder({
      selectedSource,
      selectedProduct,
      selectedEndDate,
      selectedStartDate,
      sortBy: 'Date',
    });
    const adData = await fetcher(query);
    buildClickDataBySource(adData.adDataByAll);
    // Data wrong here
    console.log('clickDataBySource', clickDataBySource);
  };

  useEffect(() => {
    if (isValidDate(selectedStartDate) && isValidDate(selectedEndDate)) {
      getClickDataBySource();
    }
  }, [props]);

  return (<div />);
};

export default ChartsContainer;
