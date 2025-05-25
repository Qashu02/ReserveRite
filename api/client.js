import { create } from 'apisauce';
import { getData } from '../Utils/storage'; // adjust path as needed

const api = create({
  baseURL: 'http://192.168.1.6:3000',
  timeout: 10000,
});


api.addAsyncRequestTransform(async (request) => {
  const token = await getData('token'); // use your storage utility
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }
});

export default api;
