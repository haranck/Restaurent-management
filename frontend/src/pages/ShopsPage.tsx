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
            
            {/* Hero Section */}
            <section className="relative pt-32 pb-12 px-6 overflow-hidden">
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-green-600/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                        Global <span className="bg-linear-to-r from-green-500 to-green-300 bg-clip-text text-transparent">Culinary Network</span>
                    </h1>
                    <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium">
                        Discover and manage restaurants across our entire synchronized ecosystem. 
                        From local favorites to international chains.
                    </p>
                </div>
            </section>

            <div className="border-t border-zinc-900 bg-zinc-950/30">
                <Shop 
                    title="Explore Network"
                    subtitle="Explore all restaurants in the DineMap network."
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
