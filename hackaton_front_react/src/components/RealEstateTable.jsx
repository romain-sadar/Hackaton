import React, { useEffect, useState } from 'react';

const RealEstateTable = () => {
    const [realEstateData, setRealEstateData] = useState([]);
    const [quartiers, setQuartiers] = useState([]);
    const [selectedQuartier, setSelectedQuartier] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRealEstateData();
        fetchQuartiers();
    }, []);

    const fetchRealEstateData = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8000/api/real_estate/');
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            const data = await response.json();
            setRealEstateData(data);
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
        ? realEstateData.filter((item) => item.quartier === selectedQuartier)
        : realEstateData;

    if (loading) {
        return <div>Chargement des données immobilières...</div>;
    }

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        // Même principe : on entoure le tout dans .section-3
        <section className="section-3">
            <h2>Tableau - Immobilier</h2>

            <label htmlFor="quartier-realestate-select">Filtrer par quartier : </label>
            <select
                id="quartier-realestate-select"
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
                    <th>Prix au m2</th>
                    <th>Nombre de ventes</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((item, idx) => (
                    <tr key={idx}>
                        <td>{item.quartier}</td>
                        <td>{item.annee}</td>
                        <td>{item.prix_m2}</td>
                        <td>{item.nb_ventes}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
};

export default RealEstateTable;