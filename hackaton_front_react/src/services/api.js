const API_BASE_URL = 'https://hackaton-fqan.onrender.com';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Une erreur est survenue');
    }
    return response.json();
};

const api = {
    quartiers: {
        getAll: async () => {
            try {
                console.log('Fetching quartiers from:', `${API_BASE_URL}/list_quartiers/`);
                const response = await fetch(`${API_BASE_URL}/list_quartiers/`);
                const data = await handleResponse(response);
                console.log('Raw API response:', data);
                return data;
            } catch (error) {
                console.error('Error fetching quartiers:', error);
                throw error;
            }
        },
        getDetails: async (quartierName) => {
            try {
                const response = await fetch(`${API_BASE_URL}/quartier/${quartierName}/`);
                return handleResponse(response);
            } catch (error) {
                console.error(`Error fetching details for ${quartierName}:`, error);
                throw error;
            }
        }
    },
    realEstate: {
        getAll: async () => {
            try {
                console.log('Fetching real estate data from:', `${API_BASE_URL}/api/real_estate/`);
                const response = await fetch(`${API_BASE_URL}/api/real_estate/`);
                const data = await handleResponse(response);
                console.log('Raw real estate API response:', data);
                return data;
            } catch (error) {
                console.error('Error fetching real estate data:', error);
                throw error;
            }
        }
    },
    demographics: {
        getAll: async () => {
            try {
                console.log('Fetching demographics data from:', `${API_BASE_URL}/api/demographics_dataset/`);
                const response = await fetch(`${API_BASE_URL}/api/demographics_dataset/`);
                const data = await handleResponse(response);
                console.log('Raw demographics API response:', data);
                return data;
            } catch (error) {
                console.error('Error fetching demographics data:', error);
                throw error;
            }
        }
    },
};

export default api; 