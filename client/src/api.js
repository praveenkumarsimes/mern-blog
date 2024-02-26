// src/api.js

const BASE_URL = 'https://gorgeous-yak-leg-warmers.cyclic.app'; // Your base URL from the Vite proxy configuration

const customFetch = (endpoint, options = {}) => {
  // Prepend the BASE_URL to the endpoint
  const url = `${BASE_URL}${endpoint}`;

  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        // You can handle HTTP error responses here
        throw new Error('Network response was not ok');
      }
      return response; // Assuming the server responds with JSON
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Fetch error:', error);
      throw error;
    });
};

export default customFetch;
