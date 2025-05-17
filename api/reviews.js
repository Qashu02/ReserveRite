import apiClient from '../apiClient'; // Make sure this is set up correctly with your baseURL

// Add a review
export const addReview = async (reviewData, token) => {
  return apiClient.post('/reviews', reviewData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get all reviews for a specific hall
export const getReviewsByHall = async (hallId) => {
  return apiClient.get(`/reviews/hall/${hallId}`);
};

// Get a single review by ID
export const getReviewById = async (id) => {
  return apiClient.get(`/reviews/${id}`);
};

// Delete a review by ID
export const deleteReview = async (id, token) => {
  return apiClient.delete(`/reviews/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
