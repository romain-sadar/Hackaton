import React, { useState } from 'react';
import { useTable } from 'react-table';

const DemographyTable = () => {
    const data = React.useMemo(() => [
        { year: 2020, population: 522969, male: 251000, female: 271969, age_0_14: '15%', age_15_24: '12%', age_25_64: '60%', age_65_plus: '13%' },
        { year: 2021, population: 529000, male: 253500, female: 275500, age_0_14: '14.8%', age_15_24: '12.2%', age_25_64: '59.5%', age_65_plus: '13.5%' },
        { year: 2022, population: 535000, male: 256000, female: 279000, age_0_14: '14.6%', age_15_24: '12.4%', age_25_64: '59%', age_65_plus: '14%' },
    ], []);

    const columns = React.useMemo(() => [
        { Header: 'Année', accessor: 'year' },
        { Header: 'Population Totale', accessor: 'population' },
        { Header: 'Hommes', accessor: 'male' },
        { Header: 'Femmes', accessor: 'female' },
        { Header: '0-14 ans', accessor: 'age_0_14' },
        { Header: '15-24 ans', accessor: 'age_15_24' },
        { Header: '25-64 ans', accessor: 'age_25_64' },
        { Header: '65 ans et +', accessor: 'age_65_plus' },
    ], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <section className="section-3">
            <h2>Données démographiques de Lyon</h2>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </section>
    );
};

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