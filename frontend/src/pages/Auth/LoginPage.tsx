import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { isAxiosError } from "axios";
import { useLogin } from "../../hooks/Auth/AuthHooks";
import { setAuthUser } from "../../store/slice/authSlice";
import { setAccessToken } from "../../store/slice/tokenSlice";
import LoginForm, { type LoginFormData } from "../../components/Auth/LoginForm";

export const LoginPage = () => {
    const { mutate: loginUser, isPending } = useLogin();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (data: LoginFormData) => {
        loginUser(
            { email: data.email, password: data.password },
            {
                onSuccess: (response) => {
                    if (response?.user) {
                        dispatch(setAuthUser(response.user));
                    }
                    if (response?.accessToken) {
                        dispatch(setAccessToken(response.accessToken));
                    }
                    toast.success("Welcome back!");
                    navigate("/home");
                },
                onError: (error: unknown) => {
                    console.error("Login failed:", error);
                    if (isAxiosError(error)) {
                        toast.error(error.response?.data?.message || "Login failed. Please try again.");
                    } else {
                        toast.error("An unexpected error occurred.");
                    }
                },
            }
        );
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

            <div className="absolute inset-y-0 left-130 flex flex-col justify-center px-12 w-full max-w-[500px]">
                <LoginForm
                    onSubmit={handleLogin}
                    isLoading={isPending}
                    onSwitchToSignUp={() => navigate("/signup")}
                />
            </div>
        </div>
    );
};
