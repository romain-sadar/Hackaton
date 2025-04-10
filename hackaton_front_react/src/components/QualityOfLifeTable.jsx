import React, { useEffect, useState } from 'react';

const QualityOfLifeTable = () => {
    const [qolData, setQolData] = useState([]);
    const [quartiers, setQuartiers] = useState([]);
    const [selectedQuartier, setSelectedQuartier] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchQolData();
        fetchQuartiers();
    }, []);

    const fetchQolData = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8000/api/quality_of_life/');
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            const data = await response.json();
            setQolData(data);
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
                throw new Error(`Erreur HTTP : ${response.status}`);
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
        ? qolData.filter((item) => item.quartier === selectedQuartier)
        : qolData;

    if (loading) {
        return <div>Chargement des données Qualité de vie...</div>;
    }

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        // On entoure tout dans la class .section-3 pour hériter du style
        <section className="section-3">
            <h2>Tableau - Qualité de vie</h2>

            <label htmlFor="quartier-qol-select">Filtrer par quartier : </label>
            <select
                id="quartier-qol-select"
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
                    <th>Pollution</th>
                    <th>Score Transport</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((item, idx) => (
                    <tr key={idx}>
                        <td>{item.quartier}</td>
                        <td>{item.annee}</td>
                        <td>{item.pollution}</td>
                        <td>{item.score_transport}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
};

export default QualityOfLifeTable;