import React, { useEffect, useState } from 'react';

const DemographicsTable = ({ selectedCity, isValidCity }) => {
    const [demographicsData, setDemographicsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');



    useEffect(() => {
        fetchAllDemographics();
    }, []);

    const fetchAllDemographics = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://hackaton-fqan.onrender.com/api/demographics/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDemographicsData(data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    const filteredData = isValidCity
        ? demographicsData.filter(item => item.quartier === selectedCity)
        : demographicsData;

    if (loading) {
        return <div>Chargement des données démographiques...</div>;
    }
    if (error) {
        return <div>Erreur: {error}</div>;
    }

    return (
        <section className="section-table">
            <h2>
                Données Démographiques
                {selectedCity && isValidCity ? ` de ${selectedCity}` : ''}
            </h2>

            <table>
                <thead>
                <tr>
                    <th>Quartier</th>
                    <th>Année</th>
                    <th>Population</th>
                    <th>Revenu médian</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((row, index) => (
                    <tr key={index}>
                        <td data-label="Quartier">{row.quartier}</td>
                        <td data-label="Année">{row.annee}</td>
                        <td data-label="Population">{row.population}</td>
                        <td data-label="Revenu médian">{row.revenu_median}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </section>

    );
};

export default DemographicsTable;
