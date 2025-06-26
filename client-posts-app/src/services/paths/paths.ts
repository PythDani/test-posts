const API_MCSV_USER = "http://localhost:3000";
const API_MCSV_POSTS = "http://localhost:3001";

const endpoints = {
  auth: {
    register: `${API_MCSV_USER}/auth/register`,
    login: (username: string, password: string) =>
      `${API_MCSV_USER}/auth/login?username=${username}&password=${password}`,
  },
  users: {   
    getOne: (id: number) => `${API_MCSV_USER}/users/${id}`,
  },
  posts: {
    getAll: `${API_MCSV_POSTS}/posts/all`,
    create: `${API_MCSV_POSTS}/posts/create`,
    like: (id: number) => `${API_MCSV_POSTS}/posts/${id}/like`,
  },
};
export default endpoints;
