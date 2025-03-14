import { api } from "@/lib/api";
import { RegisterFormData } from "@/types/auth";

export const authService = {
  register: async (userData: RegisterFormData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  resendVerification: async (email: string) => {
    const response = await api.post("/auth/resend-verification", { email });
    return response.data;
  },
};
