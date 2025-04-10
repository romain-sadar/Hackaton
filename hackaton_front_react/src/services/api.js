const API_BASE_URL = 'http://localhost:8000';

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
    // Add more API endpoints here as needed
};

export default api; 