export const SUCCESS_MESSAGES = {
    USER_CREATED: "User created successfully",
    USER_LOGGED_IN: "User logged in successfully",
    TOKEN_REFRESHED: "Token refreshed successfully",
    USER_LOGGED_OUT: "User logged out successfully",
    RESTAURANT_CREATED: "Restaurant created successfully",
    RESTAURANT_UPDATED: "Restaurant updated successfully",
    RESTAURANT_DELETED: "Restaurant deleted successfully",
    RESTAURANTS_FETCHED: "Restaurants fetched successfully",
    USER_RESTAURANTS_FETCHED: "Your restaurants fetched successfully",
} as const;

export const ERROR_MESSAGES = {
    // Auth
    UNAUTHORIZED: "Unauthorized access",
    INVALID_TOKEN: "Invalid or expired token",
    AUTHENTICATION_FAILED: "Authentication failed",
    TOKEN_BLACKLISTED: "Token has been revoked",
    NO_REFRESH_TOKEN: "No refresh token provided",
    NO_TOKEN_PROVIDED: "No token provided",
    INVALID_REFRESH_TOKEN: "Invalid refresh token",

    // User
    USER_NOT_FOUND: "User not found",
    USER_ALREADY_EXISTS: "User already exists",
    INVALID_PASSWORD: "Invalid password",
    USER_CREATION_FAILED: "Failed to create user",
    USER_LOGIN_FAILED: "Failed to login user",
    TOKEN_REFRESH_FAILED: "Failed to refresh token",
    USER_LOGOUT_FAILED: "Failed to logout user",

    // Restaurant
    USER_NOT_AUTHENTICATED: "User not authenticated",
    RESTAURANT_NOT_FOUND: "Restaurant not found",
    RESTAURANT_CREATE_FAILED: "Failed to create restaurant",
    RESTAURANT_UPDATE_FAILED: "Failed to update restaurant",
    RESTAURANT_DELETE_FAILED: "Failed to delete restaurant",
    RESTAURANTS_FETCH_FAILED: "Failed to fetch restaurants",
    USER_RESTAURANTS_FETCH_FAILED: "Failed to fetch your restaurants",

    // Upload
    ONLY_IMAGES_ALLOWED: "Only images are allowed",
    CLOUDINARY_UPLOAD_FAILED: "Cloudinary upload failed",
    CLOUDINARY_DELETE_FAILED: "Failed to delete image from Cloudinary",

    // General
    UNKNOWN_ERROR: "An unknown error occurred",
    INTERNAL_SERVER_ERROR: "Internal server error",
    VALIDATION_FAILED: "Validation failed",
} as const;
