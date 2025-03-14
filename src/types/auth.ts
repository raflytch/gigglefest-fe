export interface RegisterFormData {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  age: number;
}

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isPending?: boolean;
}

export interface RegisterResponse {
  status: string;
  message: string;
  data: {
    user: {
      id: number;
      email: string;
      name: string;
      age: number;
      phoneNumber: string;
      role: string;
      isVerified: boolean;
      verificationToken: string;
      resetToken: string | null;
      resetOTP: string | null;
      resetOTPExpires: string | null;
      createdAt: string;
      updatedAt: string;
      authId: number;
    };
    token: string;
  };
}

export interface ResendVerificationResponse {
  status: string;
  message: string;
  data: {
    message: string;
  };
}
