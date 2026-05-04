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
                
                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-black text-green-500 uppercase tracking-[0.2em]">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                        Network Active
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-none">
                        Global <br />
                        <span className="bg-linear-to-r from-green-500 via-green-400 to-green-200 bg-clip-text text-transparent">
                            Culinary Network
                        </span>
                    </h1>
                    <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        Discover and manage restaurants across our entire synchronized ecosystem. 
                        Join thousands of partners scaling their business with DineMap.
                    </p>

                    <div className="flex items-center justify-center gap-12 pt-4">
                        <div className="text-center">
                            <p className="text-2xl font-black text-white">{restaurants.length}</p>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Venues</p>
                        </div>
                        <div className="w-px h-8 bg-zinc-800" />
                        <div className="text-center">
                            <p className="text-2xl font-black text-white">4.9/5</p>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Avg Rating</p>
                        </div>
                        <div className="w-px h-8 bg-zinc-800" />
                        <div className="text-center">
                            <p className="text-2xl font-black text-white">24/7</p>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Support</p>
                        </div>
                    </div>
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
