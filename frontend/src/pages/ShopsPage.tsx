import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import { Shop } from "../components/Shop/Shop";
import { CreateRestaurantModal } from "../components/modals/CreateRestaurantModal";
import { useFetchAllRestaurant } from "../hooks/Restaurant/RestaurantHooks";
import type { RootState } from "../store/store";

export const ShopsPage = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();
    const [createOpen, setCreateOpen] = useState(false);
    const { data, isLoading, isError } = useFetchAllRestaurant();

    const restaurants = Array.isArray(data?.restaurants)
        ? data.restaurants
        : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data)
                ? data
                : [];

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-green-500/30">
            <Navbar />
            
            <div className="pt-20">
                <Shop 
                    title="Global Directory"
                    subtitle="Explore all restaurants in the DineManager network."
                    restaurants={restaurants}
                    isLoading={isLoading}
                    isError={isError}
                    onOpenCreate={() => user ? setCreateOpen(true) : navigate("/login")}
                    showAddButton={!!user} 
                />
            </div>

            <CreateRestaurantModal isOpen={createOpen} onClose={() => setCreateOpen(false)} />
        </div>
    );
};
