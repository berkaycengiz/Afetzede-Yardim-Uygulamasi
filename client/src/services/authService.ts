import axios from "axios";

export const checkLoginStatus = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/auth/session`, {
      withCredentials: true
    });
    return response.status;
  } 
  catch (error: any) {
    throw error.response?.data?.message;
  }
};