import React, { useState, useEffect } from 'react'
import backgroundImg from '../assets/images/webp/background_lyon.webp'
import PriceEvolutionChart from '../components/PriceEvolutionChart'
import SalesEvolutionChart from '../components/SalesEvolutionChart'
import AgeDistributionChart from '../components/AgeDistributionChart'
import DataTabs from '../components/DataTabs'
import useQuartiers from '../hooks/useQuartiers'
import useRealEstate from '../hooks/useRealEstate'
import useDemographics from '../hooks/useDemographics'

const Home = () => {
    const { quartiers, loading: quartiersLoading, error: quartiersError } = useQuartiers()
    const { realEstateData } = useRealEstate()
    const { demographicsData, loading: demographicsLoading, error: demographicsError } = useDemographics()
    const [selectedCity, setSelectedCity] = useState('')
    const [isValidCity, setIsValidCity] = useState(false)

    // Set the first city as default when quartiers are loaded
    useEffect(() => {
        if (Array.isArray(quartiers) && quartiers.length > 0 && !selectedCity) {
            const firstCity = quartiers[0].name || quartiers[0]
            setSelectedCity(firstCity)
            setIsValidCity(true)
        }
    }, [quartiers, selectedCity])

    useEffect(() => {
        console.log('Current quartiers:', quartiers);
    }, [quartiers]);

    useEffect(() => {
        console.log('Real estate data:', realEstateData);
    }, [realEstateData]);

    useEffect(() => {
        console.log('Demographics data:', demographicsData);
    }, [demographicsData]);

    const handleCityChange = (e) => {
        const value = e.target.value;
        setSelectedCity(value);
        setIsValidCity(value !== '');
    };

    const handleSearch = () => {
        if (isValidCity) {
            console.log('Searching for:', selectedCity);
        }
    };

    // Filter data for the selected city
    const selectedCityRealEstateData = realEstateData?.filter(item => item.quartier === selectedCity) || []
    const selectedCityDemographicsData = demographicsData?.find(item => item.quartier === selectedCity)

    if (quartiersLoading || demographicsLoading) return <div>Chargement des données...</div>;
    if (quartiersError || demographicsError) return <div>Erreur: {quartiersError || demographicsError}</div>;

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
                                {Array.isArray(quartiers) && quartiers.map((quartier, index) => (
                                    <option key={index} value={quartier.name || quartier}>
                                        {quartier.name || quartier}
                                    </option>
                                ))}
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
                        <PriceEvolutionChart realEstateData={selectedCityRealEstateData} />
                    </div>
                    <div className="chart-wrapper">
                        <h3>Évolution du nombre de ventes</h3>
                        <SalesEvolutionChart realEstateData={selectedCityRealEstateData} />
                    </div>
                </div>
                <div className="charts-container">
                    <div className="chart-wrapper">
                        <h3>Répartition de la population par âge</h3>
                        {selectedCityDemographicsData && (
                            <AgeDistributionChart demographicsData={selectedCityDemographicsData} />
                        )}
                    </div>
                </div>
            </section>



            <DataTabs selectedCity={selectedCity} isValidCity={isValidCity} />
        </>
    )
}

export default Home