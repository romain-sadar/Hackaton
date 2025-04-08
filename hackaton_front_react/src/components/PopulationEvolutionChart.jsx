import React from 'react';
import Chart from './Chart';

const PopulationEvolutionChart = () => {
  const data = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    values: [506615, 513275, 518348, 522969, 527741, 522228, 522250, 522969, 527741],
    label: 'Population totale'
  };

  return (
    <Chart 
      data={data}
      title="Évolution de la population"
      yAxisLabel="Nombre d'habitants"
      color="#4a90e2"
      stepSize={5000}
    />
  );
};

export default PopulationEvolutionChart; 