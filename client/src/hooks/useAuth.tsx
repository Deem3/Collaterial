import { USER, userAtom } from '@/store/auth';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = (): [string | null, string | null, USER | null, boolean] => {
  const [user, setUser] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access-token');
  const refreshToken = localStorage.getItem('refresh-token');
  const getUser = async (token?: string) => {
    try {
      const { data } = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token ?? accessToken}`,
        },
      });
      setUser(data);
    } catch (error) {
      newToken();
    }
  };
  const newToken = async () => {
    try {
      const { data } = await axios.get('/api/auth/refresh', {
        headers: {
          Authorization: `Refresh ${refreshToken}`,
        },
      });
      localStorage.setItem('access-token', data.accessToken);
      localStorage.setItem('refresh-token', data.refreshToken);
      getUser(data.accessToken);
    } catch (error) {
      localStorage.removeItem('access-token');
      localStorage.removeItem('refresh-token');
      navigate('/login');
    }
  };
  useEffect(() => {
    if (accessToken && refreshToken && !user) {
      setIsLoading(true);
      getUser().then(() => setIsLoading(false));
    }
  }, [accessToken, refreshToken, user]);
  return [accessToken, refreshToken, user, isLoading];
};

export default useAuth;
