import client from './client'

const sendMessage=(messageData)=>client.post('/messages',messageData);

const getConversation=(conversationId)=>client.get(`/messages/${conversationId}`);

export default {
  sendMessage,
  getConversation,
};