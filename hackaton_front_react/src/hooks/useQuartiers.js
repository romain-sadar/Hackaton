import { useState, useEffect } from 'react';
import api from '../services/api';

const useQuartiers = () => {
    const [quartiers, setQuartiers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuartiers = async () => {
            try {
                const data = await api.quartiers.getAll();
                console.log('Data received in hook:', data);

                if (Array.isArray(data)) {
                    console.log('Data is array, setting quartiers');
                    setQuartiers(data);
                } else if (typeof data === 'object' && data !== null) {
                    const possibleArray = Object.values(data).find(value => Array.isArray(value));
                    if (possibleArray) {
                        console.log('Found array in object, setting quartiers');
                        setQuartiers(possibleArray);
                    } else {
                        const arrayFromObject = Object.entries(data).map(([name, value]) => ({ name, ...value }));
                        console.log('Converted object to array, setting quartiers');
                        setQuartiers(arrayFromObject);
                    }
                } else {
                    throw new Error('Unexpected data format from API');
                }
                setLoading(false);
            } catch (err) {
                console.error('Error in useQuartiers:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchQuartiers();
    }, []);

    return { quartiers, loading, error };
};

export default useQuartiers; 