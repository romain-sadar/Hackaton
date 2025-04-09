import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register required components for Bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ 
  data, 
  title, 
  yAxisLabel,
  color = '#a77634',
  height = '500px',
  maxWidth = '1000px',
  stepSize = 500,
  showEuro = false,
  min = null,
  max = null
}) => {
  const chartRef = useRef(null);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: data.label,
        data: data.values,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 20,
          color: '#333',
          font: {
            size: 14,
            family: "'Nunito', sans-serif"
          },
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
          weight: 'bold',
          family: "'Nunito', sans-serif"
        },
        padding: { top: 0, bottom: 0 },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const formattedValue = context.formattedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return `${context.dataset.label}: ${showEuro ? `${formattedValue} €` : formattedValue}`;
          },
        },
        bodyFont: {
          family: "'Nunito', sans-serif"
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false
        },
        ticks: {
          font: {
            family: "'Nunito', sans-serif"
          }
        }
      },
      y: {
        beginAtZero: min === null ? true : false,
        min: min,
        max: max,
        border: {
          display: false
        },
        grid: {
          display: true,
          drawBorder: false
        },
        ticks: {
          callback: (value) => {
            const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return showEuro ? `${formattedValue} €` : formattedValue;
          },
          stepSize: stepSize,
          font: {
            family: "'Nunito', sans-serif"
          }
        },
        title: {
          display: true,
          text: yAxisLabel,
          font: {
            family: "'Nunito', sans-serif"
          }
        }
      },
    },
  };

  return (
    <div style={{ height, width: '100%', maxWidth: '100%', margin: '0 auto' }}>
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default BarChart; 