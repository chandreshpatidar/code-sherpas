import axiosInstance from '@/api/axiosConfig';
import handleApiError from '@/api/handleApiError';

export const fetchUsers = async () => {
  try {
    const res = await axiosInstance.get('/users');
    return { data: res.data, error: undefined };
  } catch (error) {
    return { data: [], error: handleApiError(error) };
  }
};
