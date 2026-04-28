import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UtensilsCrossed } from "lucide-react";
import * as z from "zod";

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSwitchToSignIn?: () => void;
  onSubmit: (data: SignupFormData) => void;
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

const SignupForm = ({ onSwitchToSignIn, onSubmit, isLoading }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.currentTarget.style.border = "1px solid #86bb3c");
  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.currentTarget.style.border = "1px solid rgba(134,187,60,0.22)");

  const fields: {
    name: keyof SignupFormData;
    placeholder: string;
    type?: string;
    autoComplete: string;
  }[] = [
    { name: "name", placeholder: "Full Name", autoComplete: "name" },
    { name: "email", placeholder: "Email Address", type: "email", autoComplete: "email" },
    { name: "password", placeholder: "Password", type: "password", autoComplete: "new-password" },
    { name: "confirmPassword", placeholder: "Confirm Password", type: "password", autoComplete: "new-password" },
  ];

  return (
    <div
      style={{
        background: "rgba(5,10,5,0.38)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(134,187,60,0.15)",
        borderRadius: "20px",
        padding: "36px 36px 32px",
        boxShadow: "0 20px 80px rgba(0,0,0,0.75), 0 4px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
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
        Create your account
      </h1>
      <p style={{ fontSize: "12px", color: "#7a9060", fontWeight: 500, marginBottom: "22px" }}>
        Start managing your restaurant today
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
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {fields.map((f) => (
          <div key={f.name}>
            <input
              placeholder={f.placeholder}
              type={f.type ?? "text"}
              autoComplete={f.autoComplete}
              style={inputBase}
              onFocus={focusStyle}
              onBlur={blurStyle}
              {...register(f.name)}
            />
            {errors[f.name] && (
              <p style={{ color: "#f87171", fontSize: "10px", marginTop: "4px", marginLeft: "4px" }}>
                {errors[f.name]?.message}
              </p>
            )}
          </div>
        ))}

        {/* Submit Button */}
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
          onMouseDown={e => !isLoading && ((e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)")}
          onMouseUp={e => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
        >
          {isLoading && <Loader2 style={{ width: 15, height: 15, animation: "spin 1s linear infinite" }} />}
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p style={{ fontSize: "10px", color: "#506040", fontWeight: 500, marginBottom: "10px" }}>
          By signing up, you agree to our{" "}
          <a href="#" style={{ color: "#86bb3c", textDecoration: "none" }}>Terms</a> &{" "}
          <a href="#" style={{ color: "#86bb3c", textDecoration: "none" }}>Privacy Policy</a>
        </p>
        <p style={{ fontSize: "12px", color: "#7a9060", fontWeight: 500 }}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignIn}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#f5c518",
              fontWeight: 700,
              fontSize: "12px",
            }}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;