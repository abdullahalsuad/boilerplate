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
import { Mail, Lock, User, Sparkles } from "lucide-react";

const RegisterPage = () => {
  const tealPrimary = "#0d9488"; // Teal 600

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#fafafa]">
      <div className="w-full max-w-md space-y-8">
        <header className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white shadow-sm border border-slate-100 mb-4">
            <Sparkles style={{ color: tealPrimary }} className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Create account
          </h1>
          <p className="text-slate-500 font-medium">
            Join MyRizq and start your financial journey
          </p>
        </header>

        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
          <CardHeader className="pb-2 pt-8 px-8">
            <CardTitle className="text-xl font-bold">Sign up</CardTitle>
            <CardDescription>Enter your details below</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-5 p-8">
            <div className="space-y-2">
              <Label 
                htmlFor="name" 
                className="text-sm font-semibold text-slate-700 cursor-pointer"
              >
                Full Name
              </Label>
              <div className="relative group">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#0d9488] transition-colors duration-200" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="pl-11 h-12 border-slate-200 rounded-xl bg-slate-50/50 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#0d9488] focus-visible:border-[#0d9488] transition-all duration-200"
                />
              </div>
            </div>

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
              <Label 
                htmlFor="password" 
                className="text-sm font-semibold text-slate-700 cursor-pointer"
              >
                Password
              </Label>
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

            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="hover:underline font-bold" style={{ color: tealPrimary }}>Terms</Link> and{" "}
              <Link to="/privacy" className="hover:underline font-bold" style={{ color: tealPrimary }}>Privacy Policy</Link>.
            </p>

            <Button 
              className="w-full h-12 text-base font-bold text-white rounded-xl shadow-md hover:opacity-90 active:scale-[0.98] transition-all duration-200 cursor-pointer border-none"
              style={{ backgroundColor: tealPrimary }}
            >
              Get Started
            </Button>
          </CardContent>

          <CardFooter className="bg-slate-50/50 border-t border-slate-100 flex justify-center py-6">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold hover:underline underline-offset-4 cursor-pointer"
                style={{ color: tealPrimary }}
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
