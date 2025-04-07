// src/components/LineChart.jsx

import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register required components for Line chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Prix moyen au m²',
        data: [5500, 5950, 6100, 6600, 6800],
        fill: false,
        borderColor: '#3e95cd',
        backgroundColor: '#3e95cd',
        tension: 0.3, // curved line
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allow custom height
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Évolution du prix moyen au m²',
      },
    },
  };

  return (
    <div style={{ height: '500px', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
