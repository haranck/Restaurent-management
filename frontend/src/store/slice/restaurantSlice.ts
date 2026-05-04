import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Restaurant {
    id: string;
    name: string;
    description: string;
    phone: string;
    foodType: "VEG" | "NON_VEG" | "BOTH";
    nearestPlace: string;
    userId: string;
    imageUrl?: string | null;
    imageId?: string | null;
    address: {
        locality: string;
        city: string;
        state: string;
        pincode: string;
    };
    user?: { id: string; name: string; email: string };
}

interface RestaurantState {
    allRestaurants: Restaurant[];
    myRestaurants: Restaurant[];
}

const initialState: RestaurantState = {
    allRestaurants: [],
    myRestaurants: [],
};

const restaurantSlice = createSlice({
    name: "restaurant",
    initialState,
    reducers: {
        setAllRestaurants(state, action: PayloadAction<Restaurant[]>) {
            state.allRestaurants = action.payload;
        },
        setMyRestaurants(state, action: PayloadAction<Restaurant[]>) {
            state.myRestaurants = action.payload;
        },
        addRestaurant(state, action: PayloadAction<Restaurant>) {
            state.myRestaurants.unshift(action.payload);
            state.allRestaurants.unshift(action.payload);
        },
        updateRestaurantInStore(state, action: PayloadAction<Restaurant>) {
            const update = (list: Restaurant[]) => {
                const idx = list.findIndex(r => r.id === action.payload.id);
                if (idx !== -1) list[idx] = action.payload;
            };
            update(state.allRestaurants);
            update(state.myRestaurants);
        },
        removeRestaurant(state, action: PayloadAction<string>) {
            state.allRestaurants = state.allRestaurants.filter(r => r.id !== action.payload);
            state.myRestaurants = state.myRestaurants.filter(r => r.id !== action.payload);
        },
        clearRestaurants(state) {
            state.allRestaurants = [];
            state.myRestaurants = [];
        }
    },
});

export const { setAllRestaurants, setMyRestaurants, clearRestaurants, addRestaurant, updateRestaurantInStore, removeRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
