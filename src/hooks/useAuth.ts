import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth";
import { RegisterFormData } from "@/types/auth";
import { useDispatch } from "react-redux";
import {
  setRegistrationData,
  clearRegistrationData,
} from "@/store/slices/authSlice";
import Cookies from "js-cookie";

export const useAuth = () => {
  const dispatch = useDispatch();

  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterFormData) => {
      const response = await authService.register(userData);
      return response;
    },
    onSuccess: (data, variables) => {
      // Save user email to use for resend verification
      Cookies.set("registration_email", variables.email, { expires: 1 });
      Cookies.set("token", data.data.token, { expires: 7 });
      dispatch(
        setRegistrationData({
          email: variables.email,
          verificationToken: data.data.user.verificationToken,
        })
      );
    },
  });

  const resendVerificationMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await authService.resendVerification(email);
      return response;
    },
  });

  const clearRegistration = () => {
    Cookies.remove("registration_email");
    dispatch(clearRegistrationData());
  };

  return {
    registerMutation,
    resendVerificationMutation,
    clearRegistration,
  };
};
