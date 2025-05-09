import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const loginUser = async (email: string, password: string, rememberMe: boolean) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
      rememberMe
    },
      {withCredentials: true}
    );
    console.log('Response:', response.data);
    return response.data;
  } 
  catch (error: any) {
    throw error.response?.data?.message || "Login failed!";
  }
};