import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../assets/styles/scss/import/components/_chart.scss';

const AgeDistributionChart = ({ demographicsData }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (chartRef.current && demographicsData) {
            const ctx = chartRef.current.getContext('2d');

            const ageData = [
                { label: '0-14 ans', value: demographicsData.age_0_14 },
                { label: '15-64 ans', value: demographicsData.age_15_64 },
                { label: '65 ans et plus', value: demographicsData.age_65_plus }
            ];

            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ageData.map(item => item.label),
                    datasets: [{
                        label: 'Nombre d\'habitants',
                        data: ageData.map(item => item.value),
                        backgroundColor: 'rgba(200, 146, 79, 0.7)',
                        borderColor: '#c8924f',
                        borderWidth: 1,
                        borderRadius: 4,
                        maxBarThickness: 100
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
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            titleColor: '#333',
                            bodyColor: '#333',
                            borderColor: '#c8924f',
                            borderWidth: 1,
                            padding: 10,
                            displayColors: false,
                            callbacks: {
                                label: function(context) {
                                    return `${context.parsed.y.toLocaleString()} habitants`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            ticks: {
                                color: '#666',
                                font: {
                                    size: 12
                                },
                                callback: function(value) {
                                    return value.toLocaleString();
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#666',
                                font: {
                                    size: 12
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
    }, [demographicsData]);

    return (
        <div className="chart-container">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default AgeDistributionChart; 