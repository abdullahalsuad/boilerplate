import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router";
import { useLogin } from "@/hooks/useAuthQueries";
import { Sprout, Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { mutate: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#e5e7eb] shadow-xl p-8 space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 shadow-lg shadow-teal-600/20 mb-4">
            <Sprout className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-black text-[#111827] tracking-tight">
            Welcome Back
          </h1>
          <p className="text-[#6b7280] ">
            Secure access to your wealth journey
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-[#9ca3af] ml-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-[#9ca3af]" />
              </div>
              <input
                {...register("email")}
                type="email"
                placeholder="abc@gmail.com"
                className="w-full pl-10 pr-4 py-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none  text-[14px]"
              />
            </div>
            {errors.email && (
              <p className="text-rose-500 text-xs  mt-1 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-[11px] font-black uppercase tracking-widest text-[#9ca3af]">
                Password
              </label>
              <Link
                to="/forgot-password"
                px-2
                className="text-[11px] font-bold text-teal-600 hover:text-teal-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-[#9ca3af]" />
              </div>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none  text-[14px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#9ca3af] hover:text-[#111827] transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-rose-500 text-xs font-bold mt-1 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-[#111827] text-white rounded-xl font-black text-[14px] hover:bg-black transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-black/10 disabled:opacity-70"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Sign In
                <Sprout className="h-4 w-4 text-teal-400 group-hover:scale-110 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-[#f3f4f6]">
          <p className="text-[13px] font-bold text-[#6b7280]">
            New to MyRizq?{" "}
            <Link
              to="/register"
              className="text-teal-600 hover:text-teal-700 transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
