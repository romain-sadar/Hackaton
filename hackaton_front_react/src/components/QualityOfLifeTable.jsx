import React, { useEffect, useState } from 'react';

const QualityOfLifeTable = ({ selectedCity, isValidCity }) => {
    const [qolData, setQolData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchQolData();
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

    const filteredData = isValidCity
        ? qolData.filter(item => item.quartier === selectedCity)
        : qolData;

    if (loading) {
        return <div>Chargement des données Qualité de vie...</div>;
    }

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <section className="section-3">
            <h2>
                Tableau - Qualité de vie
                {selectedCity && isValidCity ? ` à ${selectedCity}` : ''}
            </h2>

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