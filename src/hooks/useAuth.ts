import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth";
import { RegisterFormData } from "@/types/auth";
import { useDispatch } from "react-redux";
import {
  setRegistrationData,
  clearRegistrationData,
} from "@/store/slices/authSlice";
import Cookies from "js-cookie";
import { useState } from "react";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [verificationErrorMessage, setVerificationErrorMessage] = useState<
    string | null
  >(null);
  const [isVerificationErrorModalOpen, setIsVerificationErrorModalOpen] =
    useState(false);

  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterFormData) => {
      const response = await authService.register(userData);
      return response;
    },
    onSuccess: (data, variables) => {
      Cookies.set("registration_email", variables.email, { expires: 1 });
      Cookies.set("token", data.data.token, { expires: 7 });
      dispatch(
        setRegistrationData({
          email: variables.email,
          verificationToken: data.data.user.verificationToken,
        })
      );
    },
    onError: (error: any) => {
      if (error.status === "error") {
        setErrorMessage(error.message);
        setIsErrorModalOpen(true);
      } else {
        setErrorMessage("Registration failed. Please try again later.");
        setIsErrorModalOpen(true);
      }
    },
  });

  const resendVerificationMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await authService.resendVerification(email);
      return response;
    },
    onError: (error: any) => {
      if (error.status === "error") {
        setVerificationErrorMessage(error.message);
        setIsVerificationErrorModalOpen(true);
      } else {
        setVerificationErrorMessage(
          "Failed to resend verification email. Please try again later."
        );
        setIsVerificationErrorModalOpen(true);
      }
    },
  });

  const clearRegistration = () => {
    Cookies.remove("registration_email");
    dispatch(clearRegistrationData());
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setErrorMessage(null);
  };

  const closeVerificationErrorModal = () => {
    setIsVerificationErrorModalOpen(false);
    setVerificationErrorMessage(null);
  };

  return {
    registerMutation,
    resendVerificationMutation,
    clearRegistration,
    errorMessage,
    isErrorModalOpen,
    closeErrorModal,
    verificationErrorMessage,
    isVerificationErrorModalOpen,
    closeVerificationErrorModal,
  };
};
