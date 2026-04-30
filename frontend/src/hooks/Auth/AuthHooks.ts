import { useMutation } from "@tanstack/react-query";
import { signupUser, loginUser, logoutUser } from "../../services/AuthService/authService";

export const useSignup = () => {
    return useMutation({
        mutationFn: signupUser,
    })
}

export const useLogin = () => {
    return useMutation({
        mutationFn: loginUser,
    })
}

export const useLogout = () => {
    return useMutation({
        mutationFn: logoutUser,
    })
}