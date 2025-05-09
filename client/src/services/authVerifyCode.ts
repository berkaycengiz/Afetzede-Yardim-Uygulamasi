import axios from "axios";

export const verifyCode = async (phoneTurkey: string, code: string) => {
  const phone = '+90' + phoneTurkey; 
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/auth/verify-code`,{ 
      phone,
      code
    });
    return response.status;
  } 
  catch (error: any) {
    throw error.response?.data?.message;
  }
};
