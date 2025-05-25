import client from './client';

const messagesApi = {
  sendMessage: (messageData) => client.post('/api/messages', messageData),
  getConversation: (conversationId) => client.get(`/api/messages/${conversationId}`),
  getMessagesBetweenUsers: (userId1, userId2) =>
    client.get('/api/messages', { params: { senderId: userId1, receiverId: userId2 } }),
  markAsRead: (conversationId, userId) =>
    client.patch(`/api/messages/${conversationId}/read`, { userId }),
  deleteMessage: (messageId) => client.delete(`/api/messages/${messageId}`),
  getUserConversations: (userId) => client.get(`/api/conversations/${userId}`),
};

export default messagesApi;
