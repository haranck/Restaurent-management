import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UtensilsCrossed } from "lucide-react";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSwitchToSignUp?: () => void;
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
}

const inputBase: React.CSSProperties = {
  width: "100%",
  height: "44px",
  padding: "0 14px",
  borderRadius: "12px",
  fontSize: "13px",
  fontWeight: 500,
  color: "#ffffff",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(134,187,60,0.22)",
  outline: "none",
  transition: "border 0.2s",
};

const LoginForm = ({ onSwitchToSignUp, onSubmit, isLoading }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.currentTarget.style.border = "1px solid #86bb3c");
  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.currentTarget.style.border = "1px solid rgba(134,187,60,0.22)");

  return (
    <div
      style={{
        background: "rgba(5,10,5,0.38)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(134,187,60,0.15)",
        borderRadius: "20px",
        padding: "36px 36px 32px",
        boxShadow:
          "0 20px 80px rgba(0,0,0,0.75), 0 4px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "10px",
            background: "linear-gradient(135deg,#86bb3c,#f5c518)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <UtensilsCrossed style={{ width: 18, height: 18, color: "#fff" }} strokeWidth={2.5} />
        </div>
        <div>
          <p
            style={{
              fontSize: "16px",
              fontWeight: 800,
              letterSpacing: "-0.3px",
              background: "linear-gradient(90deg,#86bb3c,#f5c518)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            DineManager
          </p>
          <p style={{ fontSize: "11px", color: "#7a9060", fontWeight: 500, marginTop: "-1px" }}>
            Restaurant Management
          </p>
        </div>
      </div>

      {/* Heading */}
      <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>
        Welcome back
      </h1>
      <p style={{ fontSize: "12px", color: "#7a9060", fontWeight: 500, marginBottom: "22px" }}>
        Sign in to manage your restaurant
      </p>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(90deg,transparent,rgba(134,187,60,0.35),transparent)",
          marginBottom: "20px",
        }}
      />

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        {/* Email */}
        <div>
          <input
            placeholder="Email Address"
            type="email"
            autoComplete="email"
            style={inputBase}
            onFocus={focusStyle}
            onBlur={blurStyle}
            {...register("email")}
          />
          {errors.email && (
            <p style={{ color: "#f87171", fontSize: "10px", marginTop: "4px", marginLeft: "4px" }}>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            style={inputBase}
            onFocus={focusStyle}
            onBlur={blurStyle}
            {...register("password")}
          />
          {errors.password && (
            <p style={{ color: "#f87171", fontSize: "10px", marginTop: "4px", marginLeft: "4px" }}>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot password */}
        <div style={{ textAlign: "right", marginTop: "-4px" }}>
          <a
            href="#"
            style={{ fontSize: "11px", color: "#86bb3c", fontWeight: 600, textDecoration: "none" }}
          >
            Forgot password?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            marginTop: "4px",
            width: "100%",
            height: "44px",
            borderRadius: "12px",
            border: "none",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.65 : 1,
            background: "linear-gradient(135deg,#86bb3c,#f5c518)",
            boxShadow: "0 4px 20px rgba(134,187,60,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontSize: "13px",
            fontWeight: 700,
            color: "#fff",
            transition: "opacity 0.2s, transform 0.1s",
          }}
          onMouseDown={(e) =>
            !isLoading && ((e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)")
          }
          onMouseUp={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")
          }
        >
          {isLoading && (
            <Loader2 style={{ width: 15, height: 15, animation: "spin 1s linear infinite" }} />
          )}
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p style={{ fontSize: "10px", color: "#506040", fontWeight: 500, marginBottom: "10px" }}>
          By signing in, you agree to our{" "}
          <a href="#" style={{ color: "#86bb3c", textDecoration: "none" }}>
            Terms
          </a>{" "}
          &{" "}
          <a href="#" style={{ color: "#86bb3c", textDecoration: "none" }}>
            Privacy Policy
          </a>
        </p>
        <p style={{ fontSize: "12px", color: "#7a9060", fontWeight: 500 }}>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#f5c518",
              fontWeight: 700,
              fontSize: "12px",
            }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
