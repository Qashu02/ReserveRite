
import { useState } from 'react';

export default function useApi(apiFunc) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    setError(false);
    try {
      const response = await apiFunc(...args);
      setData(response.data);
      setLoading(false);
      return response;
    } catch (err) {
      setError(true);
      setLoading(false);
      return err;
    }
  };

  return { data, error, loading, request };
}
