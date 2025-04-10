import React, { useState } from 'react';
import DemographyTable from './DemographyTable';
import AgeDistributionChart from './AgeDistributionChart';
import GenderDistributionChart from './GenderDistributionChart';

const DataTabs = ({ selectedCity, isValidCity }) => {
    const [activeTab, setActiveTab] = useState('demography');

    return (
        <div style={{ maxWidth: '1800px', margin: '0 auto', padding: '0' }}>
            <div className="data-tabs">
                <div className="tab-buttons">
                    <button
                        className={activeTab === 'demography' ? 'active' : ''}
                        onClick={() => setActiveTab('demography')}
                    >
                        Démographie
                    </button>
                    <button
                        className={activeTab === 'prices' ? 'active' : ''}
                        onClick={() => setActiveTab('prices')}
                    >
                        Prix
                    </button>
                    <button
                        className={activeTab === 'age' ? 'active' : ''}
                        onClick={() => setActiveTab('age')}
                    >
                        Répartition par âge
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'demography' && <DemographyTable selectedCity={selectedCity} isValidCity={isValidCity} />}
                    {activeTab === 'prices' && <section className="section-3"><h2>Prix de l'immobilier {selectedCity && isValidCity ? `à ${selectedCity}` : 'à Lyon'}</h2><p>À venir...</p></section>}
                    {activeTab === 'age' && (
                        <section className="section-3">
                            <h2>Répartition de la population {selectedCity && isValidCity ? `à ${selectedCity}` : 'à Lyon'}</h2>
                            <div className="charts-container" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div className="chart-wrapper">
                                    <AgeDistributionChart />
                                </div>
                                <div className="chart-wrapper">
                                    <GenderDistributionChart />
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DataTabs; 