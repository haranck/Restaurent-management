import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UtensilsCrossed, Plus, TrendingUp, Users, ShoppingBag, Star, ArrowRight, ChefHat, BarChart3, Clock, Sparkles } from "lucide-react";
import type { RootState } from "../store/store";
import Navbar from "../layouts/Navbar";
import { Shop } from "../components/Shop/Shop";
import { CreateRestaurantModal } from "../components/modals/CreateRestaurantModal";
import { useFetchMyRestaurants } from "../hooks/Restaurant/RestaurantHooks";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { cn } from "@/lib/utils";


export const HomePage = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const restaurants = useSelector((state: RootState) => state.restaurant.myRestaurants);
    const navigate = useNavigate();
    const [createOpen, setCreateOpen] = useState(false);
    const { isLoading, isError } = useFetchMyRestaurants();

    const totalRestaurants: number = restaurants.length;

    useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);

    const stats = [
        { icon: <ShoppingBag size={18} />, label: "Restaurants", value: String(totalRestaurants), color: "text-green-500", bg: "bg-green-500/10" },
        { icon: <TrendingUp size={18} />, label: "Active Orders", value: "—", color: "text-yellow-500", bg: "bg-yellow-500/10" },
        { icon: <Users size={18} />, label: "Staff Members", value: "—", color: "text-blue-500", bg: "bg-blue-500/10" },
        { icon: <Star size={18} />, label: "Avg. Rating", value: "—", color: "text-purple-500", bg: "bg-purple-500/10" },
    ];

    const features = [
        { icon: <ChefHat size={20} />, title: "Menu Management", desc: "Craft menus in real-time with intuitive tools.", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
        { icon: <BarChart3 size={20} />, title: "Analytics", desc: "Deep insights into revenue and peak hours.", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
        { icon: <Clock size={20} />, title: "Order Tracking", desc: "Live updates for kitchen and delivery teams.", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
        { icon: <Users size={20} />, title: "Staff Management", desc: "Schedule shifts and manage payroll easily.", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    ];

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

            {/* Stats Overview */}
            <section className="py-12 bg-zinc-900/20 border-y border-zinc-800/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
                        {stats.map((stat, i) => (
                            <div key={stat.label} className="flex items-center gap-5 group animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center border border-zinc-800/50 group-hover:border-zinc-700 transition-colors", stat.bg, stat.color)}>
                                    {stat.icon}
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                                    <p className="text-2xl font-black text-zinc-100">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Preview */}
            <section className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-4 mb-20">
                        <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/20 text-yellow-500 px-4 py-1 rounded-full font-bold">
                            ECOSYSTEM EXPANSION
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            Advanced Suite <span className="text-zinc-600">Coming Soon</span>
                        </h2>
                        <p className="text-zinc-500 max-w-xl mx-auto">
                            We're building the future of restaurant technology. Explore upcoming modules
                            designed to push your business to new heights.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, i) => (
                            <Card key={feature.title} className={cn("bg-zinc-950 border-zinc-900 hover:border-zinc-800 transition-all duration-00 group overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700", feature.border)} style={{ animationDelay: `${i * 100}ms` }}>
                                <CardContent className="p-8 space-y-6 relative">
                                    <div className="absolute top-0 right-0 p-4">
                                        <Badge className="bg-zinc-900 text-zinc-600 text-[8px] font-black border-zinc-800">BETA</Badge>
                                    </div>
                                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center ring-1 ring-white/5", feature.bg, feature.color)}>
                                        {feature.icon}
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-black text-zinc-100 group-hover:text-white transition-colors uppercase tracking-tight">{feature.title}</h3>
                                        <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
                                    </div>
                                    <div className="pt-2">
                                        <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                                            <div className={cn("h-full w-1/3 rounded-full opacity-50", feature.bg.replace('/10', '/100'))} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
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