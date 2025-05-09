import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/logout`, {}, {
      withCredentials: true,
    });
    console.log('Response:', response.data);
    return response.data;
  } 
  catch (error: any) {
    throw error.response?.data?.message || "Login failed!";
  }
};