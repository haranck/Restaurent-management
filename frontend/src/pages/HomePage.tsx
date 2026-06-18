import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UtensilsCrossed, Plus, ArrowRight, Sparkles } from "lucide-react";
import type { RootState } from "../store/store";
import Navbar from "../layouts/Navbar";
import { Shop } from "../components/Shop/Shop";
import { CreateRestaurantModal } from "../components/modals/CreateRestaurantModal";
import { useFetchMyRestaurants } from "../hooks/Restaurant/RestaurantHooks";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";


export const HomePage: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const restaurants = useSelector((state: RootState) => state.restaurant.myRestaurants);
    const navigate = useNavigate();
    const [createOpen, setCreateOpen] = useState(false);
    const { isLoading, isError } = useFetchMyRestaurants();

    const totalRestaurants: number = restaurants.length;

    useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-green-500/30">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Background Orbs */}
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-green-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
                <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-yellow-600/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
                    <div className="flex-1 space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <Badge variant="outline" className="bg-green-500/10 border-green-500/20 text-green-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest gap-2">
                            <Sparkles size={12} className="animate-pulse" />
                            Welcome Back, {user?.name ?? "Partner"}
                        </Badge>

                        <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-white">
                            Elevate Your <br />
                            <span className="bg-linear-to-r from-green-500 via-green-400 to-yellow-500 bg-clip-text text-transparent">
                                Restaurant Empire
                            </span>
                        </h1>

                        <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            The ultimate control center for modern culinary networks. Manage restaurants, 
                            track performance, and optimize operations from one stunning dashboard.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                            <Button 
                                onClick={() => setCreateOpen(true)}
                                size="lg" 
                                className="h-14 px-8 bg-green-600 hover:bg-green-500 text-white font-black text-base rounded-2xl shadow-2xl shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <Plus className="mr-2" size={20} strokeWidth={3} /> Add Restaurant
                            </Button>
                            <Button 
                                onClick={() => document.getElementById("shop-section")?.scrollIntoView({ behavior: "smooth" })}
                                size="lg" 
                                variant="outline"
                                className="h-14 px-8 border-zinc-800 bg-zinc-900/30 text-zinc-300 hover:bg-zinc-800 rounded-2xl font-bold transition-all"
                            >
                                View Directory <ArrowRight className="ml-2" size={18} />
                            </Button>
                        </div>
                    </div>

                    <div className="relative animate-in fade-in zoom-in duration-1000 delay-200">
                        <div className="absolute inset-0 bg-green-500/20 blur-[60px] rounded-full animate-pulse" />
                        <Card className="relative bg-zinc-950/80 border-zinc-800 border-2 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-[0_32px_80px_rgba(0,0,0,0.8)] overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-40px group-hover:bg-green-500/20 transition-colors" />
                            <div className="flex flex-col items-center text-center gap-6">
                                <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-green-500 to-yellow-500 flex items-center justify-center shadow-xl shadow-green-500/20 ring-1 ring-white/10">
                                    <UtensilsCrossed size={32} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Assets</p>
                                    <h3 className="text-6xl font-black text-white tracking-tighter">{totalRestaurants}</h3>
                                    <p className="text-zinc-400 font-bold mt-1">Live Locations</p>
                                </div>
                                <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Network Synchronized</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Shop Section */}
            <div id="shop-section" className="border-t border-zinc-900 bg-zinc-950/30">
                <Shop 
                    title="My Restaurants"
                    subtitle="Manage and oversee your personal culinary network."
                    restaurants={restaurants}
                    isLoading={isLoading}
                    isError={isError}
                    onOpenCreate={() => setCreateOpen(true)} 
                />
            </div>

            <CreateRestaurantModal isOpen={createOpen} onClose={() => setCreateOpen(false)} />
        </div>
    );
};