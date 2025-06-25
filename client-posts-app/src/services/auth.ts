import axios from 'axios';
import type { LoginResponse } from './LoginResponse';

export const loginService = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.get<LoginResponse>(
    `http://localhost:3000/auth/login`,
    { params: { username, password } }
  );
  console.log('response:',response.data);
  return response.data;
};
