import React, { useState, useEffect } from 'react';

const useQuartiers = () => {
    const [quartiers, setQuartiers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuartiers = async () => {
            try {
                const response = await fetch('http://localhost:8000/list_quartiers/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Raw API Response:', data);
                
                // Ensure data is an array and has the expected structure
                if (Array.isArray(data)) {
                    console.log('Data is array, first item:', data[0]);
                    setQuartiers(data);
                } else if (typeof data === 'object' && data !== null) {
                    // If data is an object, try to extract an array from it
                    const possibleArray = Object.values(data).find(value => Array.isArray(value));
                    if (possibleArray) {
                        console.log('Found array in object, first item:', possibleArray[0]);
                        setQuartiers(possibleArray);
                    } else {
                        // If no array found, try to convert the object to an array
                        const arrayFromObject = Object.entries(data).map(([name, value]) => ({ name, ...value }));
                        console.log('Converted object to array, first item:', arrayFromObject[0]);
                        setQuartiers(arrayFromObject);
                    }
                } else {
                    throw new Error('Unexpected data format from API');
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching quartiers:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchQuartiers();
    }, []);

    return { quartiers, loading, error };
};

export default useQuartiers; 