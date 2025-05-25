import client from './client';

const supportApi = {
  // Admin: Get all feedbacks
  getAllRequests: (token) =>
  client.get('/api/support/all', {}, {
  headers: { Authorization: `Bearer ${token}` },
}),


  // Create support request
  createSupportRequest: (data, token) =>
    client.post('/api/support', data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default supportApi;
