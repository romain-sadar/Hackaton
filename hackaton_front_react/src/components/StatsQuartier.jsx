// src/components/StatsQuartier.jsx
import React, { useEffect, useState } from 'react';

/**
 * Calcule un "score brut" à partir des statistiques d'un quartier.
 * Ajustez librement les formules et coefficients.
 */
function calculerScoreBrut({
                               pollution,
                               score_transport,
                               prix_m2,
                               nb_ventes,
                               population,
                               revenu_median
                           }) {
    // On attribue des poids plus faibles pour éviter d'exploser le score.
    // Exemple arbitraire :
    let score = 0;

    // +3 points par unité de "score_transport" (si c'est sur 10, max = 30)
    score += score_transport * 3;

    // pollution pénalise : -1 point par 20 de pollution
    // => si pollution = 40, ça enlève ~2 points
    score -= pollution / 20;

    // nb_ventes : +1 point par 100 ventes
    score += nb_ventes / 100;

    // population : +1 point par 50 000 habitants
    score += population / 50000;

    // revenu_median : +1 point par 10000 euros
    score += revenu_median / 10000;

    // petit bonus si le prix au m² < 3000
    // => on ajoute entre 0 et 3 points max
    const diff = 3000 - Math.min(prix_m2, 3000); // ex : si prix_m2=2500 => diff=500
    score += diff / 1000;                       // => +0.5

    return score;
}

/**
 * Convertit un score brut en note /100,
 * en "clampant" entre 0 et 100 pour éviter les dépassements.
 */
function convertirScoreEnNote(scoreBrut) {
    // Ajustez ce max. S'il est trop bas, tout le monde sera à 100.
    // S'il est trop haut, tout le monde sera à 20.
    const SCORE_MAX_THEORIQUE = 50;

    let note = (scoreBrut / SCORE_MAX_THEORIQUE) * 100;

    // on borne (clamp) entre 0 et 100
    if (note < 0) note = 0;
    if (note > 100) note = 100;

    return Math.round(note);
}

const StatsQuartier = ({ selectedCity, isValidCity }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!selectedCity || !isValidCity) return;

        const fetchStats = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await fetch(`http://localhost:8000/stats_quartier/${selectedCity}/`);
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                const data = await response.json();
                setStats(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [selectedCity, isValidCity]);

    // Cas : pas de quartier sélectionné
    if (!selectedCity || !isValidCity) {
        return (
            <section className="stats-quartier-container">
                <h3>Statistiques du quartier</h3>
                <p>Veuillez sélectionner un quartier.</p>
            </section>
        );
    }

    // Cas : chargement
    if (loading) {
        return (
            <section className="stats-quartier-container">
                <h3>Statistiques du quartier {selectedCity}</h3>
                <p>Chargement en cours...</p>
            </section>
        );
    }

    // Cas : erreur
    if (error) {
        return (
            <section className="stats-quartier-container">
                <h3>Statistiques du quartier {selectedCity}</h3>
                <p style={{ color: 'red' }}>Erreur : {error}</p>
            </section>
        );
    }

    // Cas : aucune data
    if (!stats) {
        return null;
    }

    // Calcul de la note sur 100
    const scoreBrut = calculerScoreBrut(stats);
    const noteSur100 = convertirScoreEnNote(scoreBrut);

    return (
        <section className="stats-quartier-wrapper">
            {/* Bloc de gauche : stats */}
            <div className="stats-quartier-container">
                <h3>
                    Statistiques {stats.quartier} — 2024
                </h3>

                <div className="stats-grid">
                    <div className="stats-card">
                        <div className="stat-value">{stats.pollution}</div>
                        <div className="stat-label">Pollution</div>
                    </div>
                    <div className="stats-card">
                        <div className="stat-value">{stats.score_transport}</div>
                        <div className="stat-label">Score Transport</div>
                    </div>
                    <div className="stats-card">
                        <div className="stat-value">{stats.prix_m2}</div>
                        <div className="stat-label">Prix au m²</div>
                    </div>
                    <div className="stats-card">
                        <div className="stat-value">{stats.nb_ventes}</div>
                        <div className="stat-label">Nb de ventes</div>
                    </div>
                    <div className="stats-card">
                        <div className="stat-value">{stats.population}</div>
                        <div className="stat-label">Population</div>
                    </div>
                    <div className="stats-card">
                        <div className="stat-value">{stats.revenu_median}</div>
                        <div className="stat-label">Revenu médian</div>
                    </div>
                </div>
            </div>

            {/* Bloc de droite : note globale sur 100 */}
            <aside className="score-global-container">
                <h4>Note sur 100</h4>
                <div className="score-global-value">{noteSur100}</div>

                {/* Brève explication pour l'utilisateur */}
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                    Cette note évalue le quartier à partir de
                    la pollution, des transports, du prix au m²,
                    du nombre de ventes, de la population et du revenu médian.
                    Plus la note est élevée, plus le quartier est jugé favorable.
                </p>
            </aside>
        </section>
    );
};

export default StatsQuartier;