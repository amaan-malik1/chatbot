import { axiosInstance } from "./axios.js";

export const mutateSignup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData, {
    withCredentials: true,
  });
  return res.data;
};

export const mutateLogin = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData, {
    withCredentials: true,
  });
  return res.data;
};

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me", { withCredentials: true });
  return res.data;
};