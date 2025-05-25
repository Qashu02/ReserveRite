import client from './client';

const updateProfileApi = {
  updateProfile: async (formData, token) => {
    try {
      const response = await client.put('/api/users/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error('API: Update profile error:', error.response?.data || error.message);
      throw error;
    }
  },
};

export default updateProfileApi;
