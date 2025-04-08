import React from 'react'
import backgroundImg from '../assets/images/webp/background_lyon.webp'
import PriceEvolutionChart from '../components/PriceEvolutionChart'
import PopulationEvolutionChart from '../components/PopulationEvolutionChart'
import DemographyTable from '../components/DemographyTable'

const Home = () => {
    return (
        <>
            <section className="hero" style={{ backgroundImage: `url(${backgroundImg})` }}>
                <div className="hero__overlay">
                    <div className="hero__content">
                        <h1><span>BienSitué</span> — votre guide immobilier à Lyon</h1>
                        <p>Explorez les quartiers qui vous ressemblent, selon vos envies et votre budget.</p>
                        <div className="hero__search-bar">
                            <input
                                type="text"
                                placeholder="Recherchez un quartier, une adresse, un besoin..."
                            />
                            <button>Rechercher</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Charts Section */}
            <section className="section-2">
                <h2 className="section-title">Évolution des indicateurs clés</h2>
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

            <DemographyTable />
        </>
    )
}

export default Home