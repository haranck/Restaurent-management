export const API_PREFIX = {
    AUTH: "/api/auth",
    RESTAURANT: "/api/restaurant",
} as const;

export const AUTH_ROUTES = {
    SIGNUP: "/signup",
    LOGIN: "/login",
    REFRESH_TOKEN: "/refresh-token",
    LOGOUT: "/logout",
} as const;

export const RESTAURANT_ROUTES = {
    CREATE: "/create",
    GET_ALL: "/get-restaurant",
    GET_MINE: "/get-my-restaurant",
    UPDATE: "/update/:id",
    DELETE: "/delete/:id",
} as const;
