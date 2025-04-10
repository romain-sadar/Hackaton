// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';

import backgroundDefault from '../assets/images/ville/background_lyon.webp';
import croixRousseImg from '../assets/images/ville/croixrousse.jpeg';
import bellecourImg from '../assets/images/ville/bellecour.jpg';
import partdieuImg from '../assets/images/ville/partdieu.jpg';
import guillotiereImg from '../assets/images/ville/la-guillotiere.webp';
import vieuxlyonImg from '../assets/images/ville/vieux-lyon.jpg';
import gerlandImg from '../assets/images/ville/gerland.jpg';
import confluenceImg from '../assets/images/ville/confluence.jpg';
import monplaisirImg from '../assets/images/ville/monplaisir.webp';
import mermozImg from '../assets/images/ville/mermoz.jpg';
import vaiseImg from '../assets/images/ville/vaise.jpg';
import saintrambertImg from '../assets/images/ville/saint-rambert.jpg';
import champvertImg from '../assets/images/ville/champvert.jpg';
import jeanmaceImg from '../assets/images/ville/jean-mace.jpg';
import grattecielImg from '../assets/images/ville/gratte-ciel.webp';
import charpennesImg from '../assets/images/ville/charpennes.webp';
import perracheImg from '../assets/images/ville/perrache.jpg';
import laduchereImg from '../assets/images/ville/la-duchere.jpg';
import sanssouciImg from '../assets/images/ville/sans-souci.jpg';
import saxegambettaImg from '../assets/images/ville/saxe-gambetta.jpg';
import brotteauxImg from '../assets/images/ville/brotteaux.jpg';


import PriceEvolutionChart from '../components/PriceEvolutionChart';
import SalesEvolutionChart from '../components/SalesEvolutionChart';
import DataTabs from '../components/DataTabs';
import StatsQuartier from '../components/StatsQuartier';
import useQuartiers from '../hooks/useQuartiers';
import useRealEstate from '../hooks/useRealEstate';

// Mapping quartier => image
const heroBackgrounds = {
    "Croix-Rousse": croixRousseImg,
    "Part-Dieu": partdieuImg,
    "La Guillotière": guillotiereImg,
    "Vieux Lyon": vieuxlyonImg,
    "Gerland": gerlandImg,
    "Bellecour": bellecourImg,
    "Confluence": confluenceImg,
    "Monplaisir": monplaisirImg,
    "Mermoz": mermozImg,
    "Vaise": vaiseImg,
    "Saint-Rambert": saintrambertImg,
    "Champvert": champvertImg,
    "Jean Macé": jeanmaceImg,
    "Gratte-Ciel": grattecielImg,
    "Charpennes": charpennesImg,
    "Perrache": perracheImg,
    "La Duchère": laduchereImg,
    "Sans Souci": sanssouciImg,
    "Saxe-Gambetta": saxegambettaImg,
    "Brotteaux": brotteauxImg
};


const Home = () => {
    const { quartiers, loading, error } = useQuartiers();
    const { realEstateData } = useRealEstate();

    const [selectedCity, setSelectedCity] = useState('');   // vide pour laisser "Sélectionnez un quartier"
    const [isValidCity, setIsValidCity] = useState(false);

    // Juste pour observer si vous voulez
    useEffect(() => {
        console.log('Current quartiers:', quartiers);
    }, [quartiers]);

    useEffect(() => {
        console.log('Real estate data:', realEstateData);
    }, [realEstateData]);

    const handleCityChange = (e) => {
        const value = e.target.value;
        setSelectedCity(value);
        setIsValidCity(value !== '');
    };

    const handleSearch = () => {
        if (isValidCity) {
            // Logique de recherche si nécessaire
            console.log('Searching for:', selectedCity);
        }
    };

    // Filtrer les données immo pour le quartier choisi
    const selectedCityRealEstateData = realEstateData?.filter(
        (item) => item.quartier === selectedCity
    ) || [];

    if (loading) return <div>Chargement des quartiers...</div>;
    if (error) return <div>Erreur: {error}</div>;

    // Choix du background du hero selon la ville sélectionnée
    const chosenBackground = heroBackgrounds[selectedCity] || backgroundDefault;

    return (
        <>
            {/* ============================== HERO ============================== */}
            <section
                className="hero"
                style={{
                    backgroundImage: `url(${chosenBackground})`
                }}
            >
                <div className="hero__overlay">
                    <div className="hero__content">
                        <h1>
                            <span>BienSitué</span> — votre guide immobilier à Lyon
                        </h1>
                        <p>
                            Explorez les quartiers qui vous ressemblent, selon vos envies et votre budget.
                        </p>
                        <div className="hero__search-bar">
                            <select
                                value={selectedCity}
                                onChange={handleCityChange}
                                className="city-select"
                            >
                                <option value="">Sélectionnez un quartier</option>
                                {Array.isArray(quartiers) && quartiers.map((quartier, index) => {
                                    // On récupère soit quartier.name, soit quartier si c'est juste une string
                                    const quartierName = quartier.name || quartier;
                                    return (
                                        <option key={index} value={quartierName}>
                                            {quartierName}
                                        </option>
                                    );
                                })}
                            </select>
                            <button
                                onClick={handleSearch}
                                disabled={!isValidCity}
                                className={!isValidCity ? 'disabled' : ''}
                            >
                                Rechercher
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================= STATS QUARTIER ============================ */}
            <section className="Stats-global">
                <StatsQuartier selectedCity={selectedCity} isValidCity={isValidCity} />
            </section>

            {/* ============================= CHARTS SECTION ============================ */}
            <section className="section-2">
                <h2 className="section-title">
                    {selectedCity && isValidCity
                        ? `Évolution des indicateurs clés à ${selectedCity}`
                        : 'Évolution des indicateurs clés'}
                </h2>
                <div className="charts-container">
                    <div className="chart-wrapper">
                        <h3>Évolution des prix</h3>
                        <PriceEvolutionChart realEstateData={selectedCityRealEstateData} />
                    </div>
                    <div className="chart-wrapper">
                        <h3>Évolution du nombre de ventes</h3>
                        <SalesEvolutionChart realEstateData={selectedCityRealEstateData} />
                    </div>
                </div>
            </section>

            <DataTabs selectedCity={selectedCity} isValidCity={isValidCity} />
        </>
    );
};

export default Home;