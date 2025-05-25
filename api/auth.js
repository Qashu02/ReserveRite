import client from './client'; // axios instance

const endpoint = '/api/auth';

export const register = (userInfo) => client.post(`${endpoint}/register`, userInfo);
export const login = (credentials) => client.post(`${endpoint}/login`, credentials);
export const logout = () => client.post(`${endpoint}/logout`);

export const forgotPassword = (email) =>
  client.post(`${endpoint}/forgot-password`, { email });

export const verifyOTP = (email, otp) =>
  client.post(`${endpoint}/verify-otp`, { email, otp });

export const resetPassword = (email, newPassword, otp) =>
  client.post(`${endpoint}/reset-password`, { email, newPassword, otp })

export default {
  register,
  login,
  logout,
  forgotPassword,
  verifyOTP,
  resetPassword,
};
