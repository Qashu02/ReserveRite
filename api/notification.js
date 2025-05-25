import apiClient from './client';

const getNotifications = (token) => {
  return apiClient.get('/api/notifications', {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const markAsRead = (id, token) => {
  return apiClient.put(`/api/notifications/${id}`, {}, {
  headers: { Authorization: `Bearer ${token}` },
  });
};  

export default { getNotifications, markAsRead };
