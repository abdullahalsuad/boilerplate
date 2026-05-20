import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Sparkles } from "lucide-react";

const LoginPage = () => {
  const tealPrimary = "#0d9488"; // Teal 600

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#fafafa]">
      <div className="w-full max-w-md space-y-8">
        <header className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white shadow-sm border border-slate-100 mb-4">
            <Sparkles style={{ color: tealPrimary }} className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome back
          </h1>
          <p className="text-slate-500 font-medium">
            Enter your credentials to access your account
          </p>
        </header>

        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
          <CardHeader className="pb-2 pt-8 px-8">
            <CardTitle className="text-xl font-bold">Sign in</CardTitle>
            <CardDescription>Start managing your finances today</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 p-8">
            <div className="space-y-2">
              <Label 
                htmlFor="email" 
                className="text-sm font-semibold text-slate-700 cursor-pointer"
              >
                Email address
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#0d9488] transition-colors duration-200" />
                <Input
                  id="email"
                  placeholder="hello@example.com"
                  className="pl-11 h-12 border-slate-200 rounded-xl bg-slate-50/50 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#0d9488] focus-visible:border-[#0d9488] transition-all duration-200"
                  type="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label 
                  htmlFor="password" 
                  className="text-sm font-semibold text-slate-700 cursor-pointer"
                >
                  Password
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-bold hover:underline underline-offset-4 cursor-pointer"
                  style={{ color: tealPrimary }}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#0d9488] transition-colors duration-200" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 h-12 border-slate-200 rounded-xl bg-slate-50/50 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#0d9488] focus-visible:border-[#0d9488] transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <Checkbox 
                id="remember" 
                className="h-5 w-5 rounded-md border-slate-300 data-[state=checked]:bg-[#0d9488] data-[state=checked]:border-[#0d9488] cursor-pointer" 
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium text-slate-600 cursor-pointer select-none"
              >
                Keep me signed in
              </label>
            </div>

            <Button 
              className="w-full h-12 text-base font-bold text-white rounded-xl shadow-md hover:opacity-90 active:scale-[0.98] transition-all duration-200 cursor-pointer border-none"
              style={{ backgroundColor: tealPrimary }}
            >
              Continue
            </Button>
          </CardContent>

          <CardFooter className="bg-slate-50/50 border-t border-slate-100 flex justify-center py-6">
            <p className="text-sm text-slate-500 font-medium">
              New here?{" "}
              <Link
                to="/register"
                className="font-bold hover:underline underline-offset-4 cursor-pointer"
                style={{ color: tealPrimary }}
              >
                Create an account
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        <footer className="text-center">
          <p className="text-xs text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} MyRizq. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;

