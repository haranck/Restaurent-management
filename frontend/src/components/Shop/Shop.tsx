import { useState } from "react";
import { useSelector } from "react-redux";
import { ShoppingBag, Search, MapPin, Phone, UtensilsCrossed, Plus, Pencil, Trash2, ArrowRight, Loader2, Star, Clock, User as UserIcon, ImageOff } from "lucide-react";
import { UpdateRestaurantModal } from "../modals/UpdateRestaurantModal";
import { DeleteRestaurantModal } from "../modals/DeleteRestaurantModal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { cn } from "../../lib/utils";
import type { RootState } from "../../store/store";
import type { Restaurant } from "../../store/slice/restaurantSlice";

interface Props {
    title?: string;
    subtitle?: string;
    restaurants: Restaurant[];
    isLoading: boolean;
    isError: boolean;
    onOpenCreate?: () => void;
    showAddButton?: boolean;
}

const foodTypeColors: Record<string, string> = {
    veg: "bg-green-500/10 text-green-500 border-green-500/20",
    non_veg: "bg-red-500/10 text-red-500 border-red-500/20",
    both: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
};

const foodTypeLabels: Record<string, string> = {
    VEG: "🥦 Veg",
    NON_VEG: "🍗 Non-Veg",
    BOTH: "🍽️ Both",
};

export const Shop = ({
    title = "Restaurant Directory",
    subtitle = "Manage and oversee your entire culinary network.",
    restaurants = [],
    isLoading,
    isError,
    onOpenCreate,
    showAddButton = true,
}: Props) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [filterState, setFilterState] = useState("All");
    const [filterCity, setFilterCity] = useState("All");
    const [filterLocality, setFilterLocality] = useState("All");
    const [updateTarget, setUpdateTarget] = useState<Restaurant | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Restaurant | null>(null);

    const foodTypes = ["All", ...Array.from(new Set(restaurants.map((r) => r.foodType).filter((t): t is "VEG" | "NON_VEG" | "BOTH" => Boolean(t))))];
    
    const states = ["All", ...Array.from(new Set(restaurants.map(r => r.address?.state).filter(Boolean)))];
    const cities = ["All", ...Array.from(new Set(restaurants.filter(r => filterState === "All" || r.address?.state === filterState).map(r => r.address?.city).filter(Boolean)))];
    const localities = ["All", ...Array.from(new Set(restaurants.filter(r => (filterState === "All" || r.address?.state === filterState) && (filterCity === "All" || r.address?.city === filterCity)).map(r => r.address?.locality).filter(Boolean)))];

    const filtered = restaurants.filter((r) => {
        const matchSearch =
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.description?.toLowerCase().includes(search.toLowerCase());
        const matchType = filterType === "All" || r.foodType === filterType;
        const matchState = filterState === "All" || r.address?.state === filterState;
        const matchCity = filterCity === "All" || r.address?.city === filterCity;
        const matchLocality = filterLocality === "All" || r.address?.locality === filterLocality;

        return matchSearch && matchType && matchState && matchCity && matchLocality;
    });

    // Deletion is now handled by DeleteRestaurantModal

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
                <p className="text-zinc-500 font-medium animate-pulse">Loading restaurants...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4 animate-in fade-in duration-500">
                <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6 ring-1 ring-red-500/20">
                    <ShoppingBag size={40} className="opacity-50" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Oops! Something went wrong</h3>
                <p className="text-zinc-500 max-w-sm mx-auto mb-8 font-medium leading-relaxed">
                    We encountered an issue while loading the directory.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={() => window.location.reload()} className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-8">
                        Retry Loading
                    </Button>
                    {!user && (
                        <Button onClick={() => window.location.href = "/login"} variant="outline" className="border-green-500/30 text-green-500 hover:bg-green-500/10 font-bold px-8">
                            Go to Login
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div className="space-y-1">
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">{title}</h2>
                    <p className="text-zinc-500">{subtitle}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-48 min-w-[150px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                        <Input
                            placeholder="Search name..."
                            className="pl-10 bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-green-500/30"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    
                    <Select value={filterState} onValueChange={(val) => { setFilterState(val ?? "All"); setFilterCity("All"); setFilterLocality("All"); }}>
                        <SelectTrigger className="w-[100px] bg-zinc-900/50 border-zinc-800 text-zinc-300">
                            <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                            {states.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                    </Select>

                    <Select value={filterCity} onValueChange={(val) => { setFilterCity(val ?? "All"); setFilterLocality("All"); }}>
                        <SelectTrigger className="w-[100px] bg-zinc-900/50 border-zinc-800 text-zinc-300">
                            <SelectValue placeholder="City" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                            {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                    </Select>

                    <Select value={filterLocality} onValueChange={(val) => setFilterLocality(val ?? "All")}>
                        <SelectTrigger className="w-[110px] bg-zinc-900/50 border-zinc-800 text-zinc-300">
                            <SelectValue placeholder="Locality" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                            {localities.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                        </SelectContent>
                    </Select>

                    <Select value={filterType} onValueChange={(val) => setFilterType(val ?? "All")}>
                        <SelectTrigger className="w-[100px] bg-zinc-900/50 border-zinc-800 text-zinc-300">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                            {foodTypes.map(t => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {showAddButton && onOpenCreate && (
                        <Button onClick={onOpenCreate} className="bg-green-600 hover:bg-green-500 text-white font-bold px-3">
                            <Plus size={18} className="mr-1 sm:mr-2" /> <span className="hidden sm:inline">New</span>
                        </Button>
                    )}
                </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
                    {filtered.map((r) => {
                        const currentUserId = user?.id;
                        const currentUserEmail = user?.email;
                        const restaurantUserId = r.userId || r.user?.id;
                        const restaurantUserEmail = r.user?.email;

                        const isOwner = !!(
                            (currentUserId && restaurantUserId && String(currentUserId) === String(restaurantUserId)) ||
                            (currentUserEmail && restaurantUserEmail && currentUserEmail.toLowerCase() === restaurantUserEmail.toLowerCase())
                        );
                        return (
                            <Card key={r.id} className="group bg-zinc-900/30 border-zinc-800 hover:border-green-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/5 relative overflow-hidden flex flex-col">
                                {/* Image Section */}
                                <div className="relative w-full h-44 overflow-hidden bg-zinc-800/60 shrink-0">
                                    {r.imageUrl ? (
                                        <img
                                            src={r.imageUrl}
                                            alt={r.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-zinc-700">
                                            <ImageOff size={32} />
                                            <span className="text-xs font-medium">No image</span>
                                        </div>
                                    )}
                                    {/* Edit/Delete buttons overlaid on image for owner */}
                                    {isOwner && (
                                        <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-[-10px] group-hover:translate-y-0 z-20">
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="h-8 w-8 bg-zinc-900/90 text-yellow-500 hover:bg-yellow-500 hover:text-black border border-yellow-500/30 shadow-lg backdrop-blur-md"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setUpdateTarget(r);
                                                }}
                                                title="Edit Restaurant"
                                            >
                                                <Pencil size={14} strokeWidth={2.5} />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="h-8 w-8 bg-zinc-900/90 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/30 shadow-lg backdrop-blur-md"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDeleteTarget(r);
                                                }}
                                                title="Delete Restaurant"
                                            >
                                                <Trash2 size={14} strokeWidth={2.5} />
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <CardHeader className="p-4 pb-2">
                                    <div className="flex justify-between items-start gap-2 mb-1.5">
                                        <CardTitle className="text-base font-bold text-white group-hover:text-green-400 transition-colors line-clamp-1">{r.name}</CardTitle>
                                        <Badge className={cn("capitalize font-bold border text-[10px] px-1.5 py-0 min-w-max", foodTypeColors[r.foodType?.toLowerCase()] || "bg-zinc-800 text-zinc-400")}>
                                            {foodTypeLabels[r.foodType] ?? r.foodType}
                                        </Badge>
                                    </div>
                                    <CardDescription className="text-zinc-500 text-xs line-clamp-2 min-h-[32px]">{r.description || "No description provided."}</CardDescription>
                                </CardHeader>

                                <CardContent className="p-4 pt-1 space-y-2 flex-1">
                                    <div className="flex items-start gap-2 text-zinc-400 text-xs">
                                        <MapPin size={13} className="mt-0.5 text-green-500/70 shrink-0" />
                                        <span className="line-clamp-2 leading-tight">
                                            {r.address?.locality}, {r.address?.city}, {r.address?.state} {r.address?.pincode}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-400 text-xs">
                                        <Phone size={13} className="text-green-500/70 shrink-0" />
                                        <span>{r.phone}</span>
                                    </div>
                                    {!isOwner && r.user && (
                                        <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest pt-1 border-t border-zinc-800/30">
                                            <UserIcon size={11} className="text-zinc-600" />
                                            <span>Owner: {r.user.name}</span>
                                        </div>
                                    )}
                                </CardContent>

                                <CardFooter className="p-4 pt-2 border-t border-zinc-800/50 flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">
                                            <Clock size={11} /> Live
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">
                                            <Star size={11} className="text-yellow-500/50" /> 4.8
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {isOwner && (
                                            <>
                                                <Button 
                                                    onClick={() => setUpdateTarget(r)}
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-8 px-2 text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10 font-bold text-[10px] uppercase tracking-wider"
                                                >
                                                    <Pencil size={12} className="mr-1" /> Edit
                                                </Button>
                                                <Button 
                                                    onClick={() => setDeleteTarget(r)}
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-8 px-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 font-bold text-[10px] uppercase tracking-wider"
                                                >
                                                    <Trash2 size={12} className="mr-1" /> Delete
                                                </Button>
                                            </>
                                        )}
                                        <Button variant="link" className="h-auto p-0 text-green-500 hover:text-green-400 text-xs font-bold group/btn">
                                            View Details <ArrowRight size={11} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/10 rounded-3xl border border-dashed border-zinc-800">
                    <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-700 mb-4">
                        <UtensilsCrossed size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-400">No restaurants found</h3>
                    <p className="text-zinc-600 text-sm mb-6">Try adjusting your search or add a new restaurant.</p>
                    {showAddButton && onOpenCreate && (
                        <Button onClick={onOpenCreate} variant="outline" className="border-zinc-800 text-zinc-500 hover:text-zinc-300">
                            Add First Restaurant
                        </Button>
                    )}
                </div>
            )}

            <UpdateRestaurantModal 
                key={updateTarget?.id || "update-modal"} 
                restaurant={updateTarget} 
                onClose={() => setUpdateTarget(null)} 
            />
            <DeleteRestaurantModal
                key={deleteTarget?.id || "delete-modal"}
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                restaurantId={deleteTarget?.id ?? null}
                restaurantName={deleteTarget?.name}
            />
        </div>
    );
};
