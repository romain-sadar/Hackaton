// src/components/LineChart.jsx

import React from 'react';
import Chart from './Chart';

const PriceEvolutionChart = () => {
  const data = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    values: [5500, 5950, 6100, 6600, 7200],
    label: 'Prix moyen au m²'
  };

  return (
    <Chart 
      data={data}
      title="Évolution du prix moyen au m²"
      yAxisLabel="Prix au m² (€)"
      showEuro={true}
    />
  );
};

export default PriceEvolutionChart;
