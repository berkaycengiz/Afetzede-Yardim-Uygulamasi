import axios from "axios";

export const sendCode = async (phoneTurkey: string) => {
  const phone = '+90' + phoneTurkey; 
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/auth/send-code`,{ 
      phone 
    });
    return response.status;
  } 
  catch (error: any) {
    throw error.response?.data?.message;
  }
};
