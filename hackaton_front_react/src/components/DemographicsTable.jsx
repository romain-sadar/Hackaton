import React, { useEffect, useState } from 'react';

const DemographicsTable = ({ selectedCity, isValidCity }) => {
    const [demographicsData, setDemographicsData] = useState([]);
    const [quartiers, setQuartiers] = useState([]);
    const [selectedQuartier, setSelectedQuartier] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAllDemographics();
        fetchQuartiers();
    }, []);

    const fetchAllDemographics = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8000/api/demographics/');
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

    const fetchQuartiers = async () => {
        try {
            const response = await fetch('http://localhost:8000/list_quartiers/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setQuartiers(data.quartiers);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleQuartierChange = (e) => {
        setSelectedQuartier(e.target.value);
    };

    const filteredData = selectedQuartier
        ? demographicsData.filter((item) => item.quartier === selectedQuartier)
        : demographicsData;

    if (loading) {
        return <div>Chargement des données démographiques...</div>;
    }

    if (error) {
        return <div>Erreur: {error}</div>;
    }

    return (
        <section className="section-3">
            <h2>Données démographiques {selectedCity && isValidCity ? `de ${selectedCity}` : ''}</h2>

            <label htmlFor="quartier-select">Filtrer par quartier: </label>
            <select
                id="quartier-select"
                value={selectedQuartier}
                onChange={handleQuartierChange}
            >
                <option value="">Tous</option>
                {quartiers.map((q) => (
                    <option key={q} value={q}>{q}</option>
                ))}
            </select>

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
                        <td>{row.quartier}</td>
                        <td>{row.annee}</td>
                        <td>{row.population}</td>
                        <td>{row.revenu_median}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
};

export default DemographicsTable;