import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Restaurant {
    id: string;
    name: string;
    description: string;
    phone: string;
    foodType: "VEG" | "NON_VEG" | "BOTH";
    nearestPlace: string;
    userId: string;
    address: {
        locality: string;
        city: string;
        state: string;
        pincode: string;
    };
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
        clearRestaurants(state) {
            state.allRestaurants = [];
            state.myRestaurants = [];
        }
    },
});

export const { setAllRestaurants, setMyRestaurants, clearRestaurants, addRestaurant} = restaurantSlice.actions;
export default restaurantSlice.reducer;
