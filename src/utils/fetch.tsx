// Specific to NPS API
export const fetchAPI = async (endpoint: string, parkId: string) => {
    const sessionData = sessionStorage.getItem(endpoint);
    // Check if session storage has data
    if (sessionData) {
        // If so, return data
        return JSON.parse(sessionData)[parkId];
    }

    // Make fetch call
    const response = await fetch(`https://developer.nps.gov/api/v1/${endpoint}/?parkCode=${parkId}&api_key=${import.meta.env.VITE_NPS_API_KEY}`);
    const { data }= await response.json();

    // Store in session storage
    sessionStorage.setItem(endpoint, JSON.stringify({parkId: data}));

    // Return data
    return data;
}