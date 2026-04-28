import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { isAxiosError } from "axios";
import { useSignup } from "../../hooks/Auth/AuthHooks";
import SignupForm, { type SignupFormData } from "../../components/Auth/SignupForm";

export const SignupPage = () => {
    const { mutate: signupUser, isPending } = useSignup();
    const navigate = useNavigate();

    const handleSignup = (data: SignupFormData) => {
        const payload = {
            name: data.name.trim(),
            email: data.email,
            password: data.password,
        };

        signupUser(payload, {
            onSuccess: () => {
                toast.success("Account created! Welcome aboard.");
                navigate("/home");
            },
            onError: (error: unknown) => {
                console.error("Signup failed:", error);
                if (isAxiosError(error)) {
                    toast.error(error.response?.data?.message || "Signup failed. Please try again.");
                } else {
                    toast.error("An unexpected error occurred.");
                }
            },
        });
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden">

            <img
                src="/restaurant-bg.png"
                alt="Restaurant"
                className="absolute inset-0 w-full h-full object-cover object-center"
            />

            <div
                className="absolute inset-0"
                style={{ background: "rgba(0,0,0,0.45)" }}
            />

            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to right, rgba(5,12,5,0.82) 0%, rgba(5,12,5,0.55) 40%, rgba(5,12,5,0.1) 100%)",
                }}
            />

            <div className="absolute inset-y-0 left-130 flex flex-col justify-center px-10 w-full max-w-[480px]">
                <SignupForm
                    onSubmit={handleSignup}
                    isLoading={isPending}
                    onSwitchToSignIn={() => navigate("/login")}
                />
            </div>
        </div>
    );
};