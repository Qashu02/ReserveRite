import client from './client'; // Your configured Axios instance

const endpoint = '/api/halls';

// Create a hall (manager only)
export const createHall = (hallData, token) =>
  client.post(endpoint, hallData, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Update hall by ID (manager only)
export const updateHall = (id, updatedData, token) =>
  client.put(`${endpoint}/update/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Delete hall by ID (manager only)
export const deleteHall = (id, token) =>
  client.delete(`${endpoint}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Get all halls (public)
export const getAllHalls = () => client.get(endpoint);

// Get hall by ID (public)
export const getHallById = (id) => client.get(`${endpoint}/${id}`);

export default {
  createHall,
  updateHall,
  deleteHall,
  getAllHalls,
  getHallById,
};
