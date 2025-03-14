import { useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "./RegisterForm";
import { RegisterFormData } from "@/types/auth";

export const RegisterPageContent = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: RegisterFormData) => {
    console.log("Form submitted:", data);
    // Registration logic will be implemented later
  };

  const handleLogin = () => {
    navigate({ to: "/login" });
  };

  return (
    <div className="w-full max-w-md">
      <div className="md:hidden mb-10 text-center">
        <h1 className="text-3xl font-bold">GiggleFest</h1>
        <p className="text-muted-foreground">Your festival companion</p>
      </div>

      <Card className="shadow-none border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Register to start your festival journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm onSubmit={handleSubmit} />
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-3 border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer hover:underline"
              onClick={handleLogin}
            >
              Sign in
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
