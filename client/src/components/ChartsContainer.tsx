/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-use-before-define
import React, { useState, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BarChart from './BarChart';
import { queryBuilder } from '../util/queryBuilder';
import fetcher from '../util/fetcher';
import {
  buildAdDataByKey,
  getDates,
  isValidDate,
  formatDate,
} from '../util/helpers';
import { AdDataByKey, AdData } from '../interfaces';

interface Props {
  sources: string[];
  products: string[];
  selectedSource: string;
  selectedProduct: string;
  selectedEndDate: string;
  selectedStartDate: string;
}

const useStyles = makeStyles((theme) => ({
  chartWrapper: {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'border-bottom': '1px solid lightgray',
    margin: '1rem 0',
    padding: '1rem 0',
  },
}));

const ChartsContainer = ({
  sources,
  products,
  selectedSource,
  selectedProduct,
  selectedStartDate,
  selectedEndDate,
}: Props) => {
  const classes = useStyles();

  const [adDataBySource, setAdDataBySource] = useState<AdDataByKey>({});
  const [dateRange, setDateRange] = useState(['']);

  const getAdDataBySource = async () => {
    const query = queryBuilder({
      selectedSource,
      selectedProduct,
      selectedEndDate,
      selectedStartDate,
      sortBy: 'Date',
    });
    const rawAdData = await fetcher(query);
    rawAdData.adDataByAll.forEach((adData: AdData) => {
      // eslint-disable-next-line no-param-reassign
      adData.date = formatDate(adData.date);
    });
    setAdDataBySource(
      buildAdDataByKey(sources, rawAdData.adDataByAll, 'source'),
    );
  };

  useLayoutEffect(() => {
    if (isValidDate(selectedStartDate) && isValidDate(selectedEndDate)) {
      getAdDataBySource();
      setDateRange(getDates(new Date(selectedStartDate), new Date(selectedEndDate)));
    }
  }, [selectedEndDate, selectedStartDate, selectedSource, selectedProduct]);

  return (
    <div id="charts-by-source">
      {Object.keys(adDataBySource).length !== 0
      && adDataBySource.constructor === Object
        ? sources.slice(1).map((source: string) => (
          <div className={classes.chartWrapper}>
            <label htmlFor="BarChar">{source}</label>
            <BarChart
              dateRange={dateRange}
              // filter((source) => source !== 'All') is more sure, but .slice(1) avoids nested loop
              products={products.slice(1)}
              adData={adDataBySource[source]}
            />
          </div>
        ))
        : []}
    </div>
  );
};

export default ChartsContainer;
