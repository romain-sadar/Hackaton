import React, { useState } from 'react';
import DemographicsTable from './DemographicsTable';
import QualityOfLifeTable from './QualityOfLifeTable';
import RealEstateTable from './RealEstateTable';
// etc. (ajoute si besoin la suite : RealEstateDatasetTable, etc.)

const DataTabs = () => {
    const [activeTab, setActiveTab] = useState('demography');

    return (
        <div style={{ maxWidth: '1800px', margin: '0 auto', padding: '0' }}>
            <div className="data-tabs">
                {/* Boutons d'onglets */}
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
                        Immobilier
                    </button>
                    <button
                        className={activeTab === 'quality' ? 'active' : ''}
                        onClick={() => setActiveTab('quality')}
                    >
                        Qualité de vie
                    </button>
                    {/* Ajoute d’autres onglets si nécessaire */}
                </div>

                {/* Contenu de l'onglet */}
                <div className="tab-content">
                    {activeTab === 'demography' && <DemographicsTable />}
                    {activeTab === 'prices' && <RealEstateTable />}
                    {activeTab === 'quality' && <QualityOfLifeTable />}
                </div>
            </div>
        </div>
    );
};

export default DataTabs;
