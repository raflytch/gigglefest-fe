import { api } from "@/lib/api";
import { RegisterFormData } from "@/types/auth";

export const authService = {
  register: async (userData: RegisterFormData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  resendVerification: async (email: string) => {
    try {
      const response = await api.post("/auth/resend-verification", { email });
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },
};
