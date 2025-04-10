import React, { useState, useEffect } from 'react'
import backgroundImg from '../assets/images/webp/background_lyon.webp'
import PriceEvolutionChart from '../components/PriceEvolutionChart'
import PopulationEvolutionChart from '../components/PopulationEvolutionChart'
import DataTabs from '../components/DataTabs'
import useQuartiers from '../hooks/useQuartiers'

const Home = () => {
    const [selectedCity, setSelectedCity] = useState('')
    const [isValidCity, setIsValidCity] = useState(false)
    const { quartiers, loading, error } = useQuartiers()

    useEffect(() => {
        console.log('Current quartiers:', quartiers);
    }, [quartiers]);

    const handleCityChange = (e) => {
        const value = e.target.value;
        setSelectedCity(value);
        setIsValidCity(value !== '');
    };

    const handleSearch = () => {
        if (isValidCity) {
            // Handle the search with the valid city
            console.log('Searching for:', selectedCity);
        }
    };

    if (loading) return <div>Chargement des quartiers...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <>
            <section className="hero" style={{ backgroundImage: `url(${backgroundImg})` }}>
                <div className="hero__overlay">
                    <div className="hero__content">
                        <h1><span>BienSitué</span> — votre guide immobilier à Lyon</h1>
                        <p>Explorez les quartiers qui vous ressemblent, selon vos envies et votre budget.</p>
                        <div className="hero__search-bar">
                            <select
                                value={selectedCity}
                                onChange={handleCityChange}
                                className="city-select"
                            >
                                <option value="">Sélectionnez un quartier</option>
                                {Array.isArray(quartiers) && quartiers.map((quartier, index) => {
                                    console.log('Rendering quartier:', quartier);
                                    return (
                                        <option key={index} value={quartier.name || quartier}>
                                            {quartier.name || quartier}
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

            {/* Charts Section */}
            <section className="section-2">
                <h2 className="section-title">
                    {selectedCity && isValidCity 
                        ? `Évolution des indicateurs clés à ${selectedCity}`
                        : 'Évolution des indicateurs clés'}
                </h2>
                <div className="charts-container">
                    <div className="chart-wrapper">
                        <h3>Évolution des prix</h3>
                        <PriceEvolutionChart />
                    </div>
                    <div className="chart-wrapper">
                        <h3>Évolution de la population</h3>
                        <PopulationEvolutionChart />
                    </div>
                </div>
            </section>

            <DataTabs selectedCity={selectedCity} isValidCity={isValidCity} />
        </>
    )
}

export default Home