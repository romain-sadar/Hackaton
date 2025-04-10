import React, { useEffect, useState } from 'react';

const DemographicsTable = () => {
    // État local pour les données, la liste des quartiers, le quartier sélectionné,
    // ainsi que les états de chargement et d'erreur
    const [demographicsData, setDemographicsData] = useState([]);
    const [quartiers, setQuartiers] = useState([]);
    const [selectedQuartier, setSelectedQuartier] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // useEffect principal : on lance le fetch initial des données + la liste des quartiers
    useEffect(() => {
        fetchAllDemographics();
        fetchQuartiers();
    }, []);

    // Fonction pour récupérer toutes les données de la démographie
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

    // Fonction pour récupérer la liste des quartiers
    const fetchQuartiers = async () => {
        try {
            const response = await fetch('/api/list_quartiers/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // data.quartiers contient ["Bellecour","Brotteaux", etc.]
            setQuartiers(data.quartiers);
        } catch (err) {
            setError(err.message);
        }
    };

    // Fonction qui change le quartier sélectionné et filtre soit localement,
    // soit relance un fetch si tu préfères (ici on filtre localement)
    const handleQuartierChange = (e) => {
        const chosen = e.target.value;
        setSelectedQuartier(chosen);
    };

    // Filtre local : si selectedQuartier est renseigné, on ne garde que les entrées correspondantes
    const filteredData = selectedQuartier
        ? demographicsData.filter((item) => item.quartier === selectedQuartier)
        : demographicsData;

    // Gestion des states de chargement / erreur
    if (loading) {
        return <div>Chargement des données démographiques...</div>;
    }

    if (error) {
        return <div>Erreur: {error}</div>;
    }

    // Affichage du tableau
    return (
        <section className="section-3">
            <h2>Données démographiques</h2>

            {/* Sélecteur de quartier */}
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

            {/* Tableau */}
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