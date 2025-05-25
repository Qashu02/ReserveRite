import client from './client';       // Your axios or fetch client
import { getData } from '../Utils/storage';  // To get saved authToken

const paymentApi = {
  subscribeToPlan: async (planData) => {
    try {
      const token = await getData('authToken');
      if (!token) throw new Error('No auth token found');

      return client.post('/api/payments/subscribe', planData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      return { ok: false, error };
    }
  },

  getSubscriptionDetails: async () => {
    try {
      const token = await getData('authToken');
      if (!token) throw new Error('No auth token found');

      return client.get('/api/payments/my-subscription', {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      return { ok: false, error };
    }
  },

  confirmBookingPayment: async (paymentData) => {
    try {
      const token = await getData('authToken');
      if (!token) throw new Error('No auth token found');

      return client.post('/api/payments/confirm-booking', paymentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      return { ok: false, error };
    }
  },

  confirmSubscriptionPayment: async (paymentData) => {
    try {
      const token = await getData('authToken');
      if (!token) throw new Error('No auth token found');

      return client.post('/api/payments/confirm-subscription', paymentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      return { ok: false, error };
    }
  },
};

export default paymentApi;
