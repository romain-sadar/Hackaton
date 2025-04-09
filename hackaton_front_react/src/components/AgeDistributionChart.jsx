import React from 'react';
import BarChart from './BarChart';

const AgeDistributionChart = () => {
    const data = {
        labels: ['0-14 ans', '15-24 ans', '25-64 ans', '65 ans et +'],
        values: [15, 22, 40, 25],
        label: 'Pourcentage de la population'
    };

    return (
        <BarChart
            data={data}
            title="Répartition de la population par tranche d'âge"
            yAxisLabel="Pourcentage (%)"
            color="#a77634"
            stepSize={10}
            min={0}
            max={50}
        />
    );
};

export default AgeDistributionChart; 