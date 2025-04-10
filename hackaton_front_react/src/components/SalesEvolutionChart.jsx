import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../assets/styles/scss/import/components/_chart.scss';

const SalesEvolutionChart = ({ realEstateData }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (chartRef.current && realEstateData && realEstateData.length > 0) {
            const ctx = chartRef.current.getContext('2d');

            // Sort data by year
            const sortedData = [...realEstateData].sort((a, b) => a.annee - b.annee);

            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: sortedData.map(item => item.annee),
                    datasets: [{
                        label: 'Nombre de ventes',
                        data: sortedData.map(item => parseInt(item.nb_ventes)),
                        borderColor: '#4a90e2',
                        backgroundColor: 'rgba(74, 144, 226, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                color: '#333',
                                font: {
                                    size: 14
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `Nombre de ventes: ${context.parsed.y}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            ticks: {
                                stepSize: 50,
                                callback: function(value) {
                                    return value;
                                }
                            }
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [realEstateData]);

    return (
        <div className="chart-container">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default SalesEvolutionChart; 