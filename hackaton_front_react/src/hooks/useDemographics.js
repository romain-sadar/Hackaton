import { useState, useEffect } from 'react';
import api from '../services/api';

const useDemographics = () => {
    const [demographicsData, setDemographicsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDemographics = async () => {
            try {
                const data = await api.demographics.getAll();
                console.log('Demographics data received:', data);
                setDemographicsData(data);
                setLoading(false);
            } catch (err) {
                console.error('Error in useDemographics:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDemographics();
    }, []);

    return { demographicsData, loading, error };
};

export default useDemographics; 