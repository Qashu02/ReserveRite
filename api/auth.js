import client from './client'; // Your API client setup (e.g., axios instance)

const endpoint = '/auth'; // Base path if you have one, adjust accordingly

export const register = (userInfo) => client.post(`${endpoint}/register`, userInfo);

export const login = (credentials) => client.post(`${endpoint}/login`, credentials);

export const logout = () => client.post(`${endpoint}/logout`); // If you have logout endpoint

// Optionally you can add more helper methods
export default {
  register,
  login,
  logout,
};
