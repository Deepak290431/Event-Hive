// import axios from "axios";
// import { useAuth } from "../context/AuthContext.jsx";

// export const api = axios.create({
//   baseURL: "/api",
//   withCredentials: false,
// });

// export const useAuthorizedApi = () => {
//   const { token } = useAuth();

//   api.interceptors.request.use(
//     (config) => {
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return api;
// };

import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  withCredentials: false,
});

export const useAuthorizedApi = () => {
  const { token } = useAuth();

  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
};
