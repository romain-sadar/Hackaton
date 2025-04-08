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

const Chart = ({ 
  data, 
  title, 
  yAxisLabel,
  color = '#a77634',
  height = '500px',
  maxWidth = '1000px',
  stepSize = 500,
  showEuro = false
}) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: data.label,
        data: data.values,
        fill: true,
        borderColor: color,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
          gradient.addColorStop(0, `${color}4D`); // 30% opacity
          gradient.addColorStop(1, `${color}00`); // 0% opacity
          return gradient;
        },
        tension: 0.3,
        pointRadius: 5,
        pointBackgroundColor: color,
        pointBorderColor: color,
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
        padding: { top: 10, bottom: 10 },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.formattedValue} €`;
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
        ticks: {
          font: {
            family: "'Nunito', sans-serif"
          }
        }
      },
      y: {
        beginAtZero: false,
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
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Chart; 