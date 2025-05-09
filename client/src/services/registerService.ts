import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const registerUser = async (firstName: string, lastName: string, phone: string, password: string, dateOfBirth: string, address: string, emergencyContact: string, bloodType: string, gender: string, isDisabled: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      firstName,
      lastName,
      phone,
      password,
      dateOfBirth,
      address,
      emergencyContact,
      bloodType,
      gender,
      isDisabled
    },
    {withCredentials: true}
  );
    console.log('Response:', response.data);
    return response.data;
  } 
  catch (error: any) {
    throw error.response?.data?.message || "Registration failed!";
  }
};