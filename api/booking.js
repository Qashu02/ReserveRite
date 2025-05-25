import client from './client';

const endpoint = '/api/support';

const supportApi = {
  getAllRequests: async (token) =>
    client.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  createSupportRequest: async (data, token) =>
    client.post(endpoint, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default supportApi;
