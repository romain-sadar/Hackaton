import { useState, useEffect } from 'react';
import api from '../services/api';

const useRealEstate = () => {
    const [realEstateData, setRealEstateData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRealEstate = async () => {
            try {
                const data = await api.realEstate.getAll();
                console.log('Real estate data received:', data);
                
                if (Array.isArray(data)) {
                    setRealEstateData(data);
                } else if (typeof data === 'object' && data !== null) {
                    const possibleArray = Object.values(data).find(value => Array.isArray(value));
                    if (possibleArray) {
                        setRealEstateData(possibleArray);
                    } else {
                        const arrayFromObject = Object.entries(data).map(([name, value]) => ({ name, ...value }));
                        setRealEstateData(arrayFromObject);
                    }
                }
                setLoading(false);
            } catch (err) {
                console.error('Error in useRealEstate:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRealEstate();
    }, []);

    return { realEstateData, loading, error };
};

export default useRealEstate; 