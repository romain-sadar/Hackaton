import React, { useEffect, useState } from 'react';

const RealEstateTable = ({ selectedCity, isValidCity }) => {
    const [realEstateData, setRealEstateData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRealEstateData();
    }, []);

    const fetchRealEstateData = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://hackaton-fqan.onrender.com/api/real_estate/');
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

    const filteredData = isValidCity
        ? realEstateData.filter(item => item.quartier === selectedCity)
        : realEstateData;

    if (loading) {
        return <div>Chargement des données immobilières...</div>;
    }
    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <section className="section-table">
            <h2>
                Données Immobilières
                {selectedCity && isValidCity ? ` à ${selectedCity}` : ''}
            </h2>

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
                        <td data-label="Quartier">{item.quartier}</td>
                        <td data-label="Année">{item.annee}</td>
                        <td data-label="Prix au m²">{item.prix_m2}</td>
                        <td data-label="Nb de ventes">{item.nb_ventes}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
};

export default RealEstateTable;
