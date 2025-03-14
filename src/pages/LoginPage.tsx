import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/slices/appSlice";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    },
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: (data) => {
      Cookies.set("token", data.token, { expires: 7 });
      navigate({ to: "/" });
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const handleForgotPassword = () => {
    navigate({ to: "/forgot-password" });
  };

  const handleRegister = () => {
    navigate({ to: "/register" });
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 hidden md:block bg-black relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Festival"
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-8">
          <h1 className="text-4xl font-bold text-white mb-2">GiggleFest</h1>
          <p className="text-white/90 text-lg">
            Your gateway to unforgettable festival experiences!
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-background min-h-screen">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-10 text-center">
            <h1 className="text-3xl font-bold">GiggleFest</h1>
            <p className="text-muted-foreground">Your festival companion</p>
          </div>

          <Card className="shadow-none border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <div
                        className="text-xs text-primary hover:underline cursor-pointer"
                        onClick={handleForgotPassword}
                      >
                        Forgot password?
                      </div>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="h-11 mt-2 border-0"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-3 border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <span
                  className="text-primary cursor-pointer hover:underline"
                  onClick={handleRegister}
                >
                  Create an account
                </span>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
