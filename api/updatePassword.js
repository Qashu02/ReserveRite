import client from './client';

const updatePassword = (userId, currentPassword, newPassword, token) => {
  return client.put(
    `/api/users/update-password/`,
    { currentPassword, newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default updatePassword;
