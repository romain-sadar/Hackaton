import React from 'react';
import BarChart from './BarChart';

const GenderDistributionChart = () => {
    const data = {
        labels: ['Hommes', 'Femmes'],
        values: [48, 52],
        label: 'Pourcentage de la population'
    };

    return (
        <BarChart
            data={data}
            title="Répartition de la population par genre"
            yAxisLabel="Pourcentage (%)"
            color="#a77634"
            stepSize={10}
            min={0}
            max={70}
        />
    );
};

export default GenderDistributionChart; 