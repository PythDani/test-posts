import axios from 'axios';
import type { LoginResponse } from './LoginResponse';
import endpoints from './paths/paths';

export const loginService = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.get<LoginResponse>(
     endpoints.auth.login(username, password),   
  );
  return response.data;
};
