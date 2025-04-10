import React, { useState } from 'react';
import DemographicsTable from './DemographicsTable';
import QualityOfLifeTable from './QualityOfLifeTable';
import RealEstateTable from './RealEstateTable';

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
                        Immobilier
                    </button>
                    <button
                        className={activeTab === 'quality' ? 'active' : ''}
                        onClick={() => setActiveTab('quality')}
                    >
                        Qualité de vie
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'demography' && (
                        <DemographicsTable
                            selectedCity={selectedCity}
                            isValidCity={isValidCity}
                        />
                    )}
                    {activeTab === 'prices' && (
                        <RealEstateTable
                            selectedCity={selectedCity}
                            isValidCity={isValidCity}
                        />
                    )}
                    {activeTab === 'quality' && (
                        <QualityOfLifeTable
                            selectedCity={selectedCity}
                            isValidCity={isValidCity}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DataTabs;
