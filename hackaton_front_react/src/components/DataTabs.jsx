import React, { useState } from 'react';
import DemographyTable from './DemographyTable';

const DataTabs = () => {
    const [activeTab, setActiveTab] = useState('demography');

    return (
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
                {activeTab === 'demography' && <DemographyTable />}
                {activeTab === 'prices' && <section className="section-3"><h2>Prix de l'immobilier à Lyon</h2><p>À venir...</p></section>}
                {activeTab === 'age' && <section className="section-3"><h2>Répartition par âge</h2><p>Visualisation à venir...</p></section>}
            </div>
        </div>
    );
};

export default DataTabs; 