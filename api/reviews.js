import client from './client';
import storage from "../Utils/storage"

// Authenticated POST: Add a review
export const addReview = async (reviewData, authToken) => {
  return client.post('/api/reviews', reviewData, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
};


// Public GET: Get all reviews for a hall
export const getReviewsByHall = (hallId) => client.get(`/api/reviews/hall/${hallId}`);

// Public GET: Get a specific review by ID
export const getReviewById = (id) => client.get(`/api/reviews/${id}`);

// Authenticated DELETE: Delete a review
export const deleteReview = async (id) => {
  const token = await storage.getToken();
  return client.delete(`/api/reviews/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
