// eslint-disable-next-line no-use-before-define
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { AdData, AdDataByKey } from '../interfaces';
import { buildAdDataByKey } from '../util/helpers';

interface Props {
  dateRange: string[];
  products: string[];
  adData: AdData[];
}

const BarChart = ({ dateRange, products, adData }: Props) => {
  const [adDataByDate, setAdDataByDate] = useState<AdDataByKey>({});
  const [graphData, setGraphData] = useState({});
  const buildDataSets = () => (
    products.map((product: string) => (
      {
        label: product,
        // dont do this inline
        // TODO: structure data from api so you don't have to do this terrible loop
        // TODO: dont push clicks if it equals 0
        data: dateRange.reduce((acc: number[], date: string) => {
          let clicks = 0;
          adData.forEach((ad: AdData) => {
            if (ad.product === product && ad.date === date) {
              clicks += ad.clicks;
            }
          });
          acc.push(clicks);
          return acc;
        }, []),
      }
    ))
  );

  useEffect(() => {
    setAdDataByDate(
      buildAdDataByKey(dateRange, adData, 'date'),
    );
  }, [adData]);

  useLayoutEffect(() => {
    setGraphData({
      labels: dateRange,
      datasets: buildDataSets(),
    });
  }, [adDataByDate]);

  return (
    <Bar
      data={graphData}
      width={50}
      height={25}
    />
  );
};

export default BarChart;
