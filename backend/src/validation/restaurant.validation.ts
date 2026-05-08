import { z } from "zod";

const FOOD_TYPE_VALUES = ["VEG", "NON_VEG", "BOTH"] as const;

const addressSchema = z.object({
    locality: z.string().min(1, "Locality is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().min(1, "Pincode is required"),
});

const addressPreprocess = z.preprocess((val) => {
    if (typeof val === "string") {
        try {
            return JSON.parse(val);
        } catch {
            return val;
        }
    }
    return val;
}, addressSchema);

export const createRestaurantBodySchema = z.object({
    name: z.string().min(1, "Restaurant name is required"),
    description: z.string().optional(),
    phone: z.string().min(1, "Phone number is required"),
    foodType: z.enum(FOOD_TYPE_VALUES, { message: "foodType must be VEG, NON_VEG or BOTH" }),
    nearestPlace: z.string().optional(),
    address: addressPreprocess,
});

export const updateRestaurantBodySchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    phone: z.string().min(1).optional(),
    foodType: z.enum(FOOD_TYPE_VALUES).optional(),
    nearestPlace: z.string().optional(),
    address: addressPreprocess.optional(),
});

export const restaurantIdParamSchema = z.object({
    id: z.string().min(1, "Restaurant ID is required"),
});

export type CreateRestaurantInput = z.infer<typeof createRestaurantBodySchema>;
export type UpdateRestaurantInput = z.infer<typeof updateRestaurantBodySchema>;
export type RestaurantIdParam = z.infer<typeof restaurantIdParamSchema>;
