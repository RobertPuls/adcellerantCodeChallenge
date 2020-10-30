// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
  console.log('test');
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'test 1',
      data: [12, 19, 3, 5, 2, 3],
    }, {
      label: 'test 2',
      data: [20, 20, 20, 20, 20, 20],
    }],
  };
  return (
    <Bar
      data={data}
      width={100}
      height={50}
    />
  );
};

export default BarChart;
