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
