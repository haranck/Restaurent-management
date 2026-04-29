import { useState } from "react";
import { useSelector } from "react-redux";
import {ShoppingBag, Search, MapPin, Phone, UtensilsCrossed, Plus, Pencil, Trash2, ArrowRight, Loader2, Star, Clock, User as UserIcon } from "lucide-react";
import { useDeleteRestaurant } from "../../hooks/Restaurant/RestaurantHooks";
import { UpdateRestaurantModal } from "../modals/UpdateRestaurantModal";
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

interface Restaurant {
    id: string;
    name: string;
    description: string;
    phone: string;
    foodType: "VEG" | "NON_VEG" | "BOTH";
    nearestPlace: string;
    userId: string;
    user?: { name: string; email: string };
    address: {
        locality: string;
        city: string;
        state: string;
        pincode: string;
    };
}

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

export const Shop = ({ 
    title = "Restaurant Directory", 
    subtitle = "Manage and oversee your entire culinary network.",
    restaurants = [], 
    isLoading, 
    isError, 
    onOpenCreate,
    showAddButton = true
}: Props) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const { mutate: deleteRest, isPending: isDeleting } = useDeleteRestaurant();
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [updateTarget, setUpdateTarget] = useState<Restaurant | null>(null);

    const foodTypes = ["All", ...Array.from(new Set(restaurants.map((r) => r.foodType).filter((t): t is "VEG" | "NON_VEG" | "BOTH" => Boolean(t))))];

    const filtered = restaurants.filter((r) => {
        const matchSearch =
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.description?.toLowerCase().includes(search.toLowerCase()) ||
            r.address?.city?.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filterType === "All" || r.foodType === filterType;
        return matchSearch && matchFilter;
    });

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this restaurant?")) {
            deleteRest(id);
        }
    };

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
                    We encountered an issue while loading the directory. Your session might have expired or there's a temporary connection problem.
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
                    <div className="relative flex-1 md:w-64 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                        <Input
                            placeholder="Search name, city..."
                            className="pl-10 bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-green-500/30"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-32 bg-zinc-900/50 border-zinc-800 text-zinc-300">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                            {foodTypes.map(t => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {showAddButton && onOpenCreate && (
                        <Button
                            onClick={onOpenCreate}
                            className="bg-green-600 hover:bg-green-500 text-white font-bold"
                        >
                            <Plus size={18} className="mr-2" /> New
                        </Button>
                    )}
                </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
                    {filtered.map((r) => {
                        const isOwner = user?.id === r.userId;
                        return (
                            <Card key={r.id} className="group bg-zinc-900/30 border-zinc-800 hover:border-green-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/5 relative overflow-hidden">
                                <CardHeader className="p-5 pb-3">
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge className={cn("capitalize font-bold border", foodTypeColors[r.foodType?.toLowerCase()] || "bg-zinc-800 text-zinc-400")}>
                                            {r.foodType}
                                        </Badge>
                                        
                                        {isOwner && (
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-zinc-500 hover:text-yellow-500 hover:bg-yellow-500/10"
                                                    onClick={() => setUpdateTarget(r)}
                                                >
                                                    <Pencil size={14} />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-zinc-500 hover:text-red-500 hover:bg-red-500/10"
                                                    onClick={() => handleDelete(r.id)}
                                                    disabled={isDeleting}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                    <CardTitle className="text-lg font-bold text-white group-hover:text-green-500 transition-colors line-clamp-1">{r.name}</CardTitle>
                                    <CardDescription className="text-zinc-500 text-xs line-clamp-2 min-h-[32px]">{r.description || "No description provided."}</CardDescription>
                                </CardHeader>

                                <CardContent className="p-5 pt-0 space-y-3">
                                    <div className="flex items-start gap-2.5 text-zinc-400 text-sm">
                                        <MapPin size={15} className="mt-0.5 text-green-500/70 shrink-0" />
                                        <span className="line-clamp-2 leading-tight">
                                            {r.address?.locality}, {r.address?.city}, {r.address?.state} {r.address?.pincode}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-zinc-400 text-sm">
                                        <Phone size={15} className="text-green-500/70 shrink-0" />
                                        <span>{r.phone}</span>
                                    </div>
                                    
                                    {!isOwner && r.user && (
                                        <div className="flex items-center gap-2.5 text-zinc-500 text-[10px] font-bold uppercase tracking-widest pt-2 border-t border-zinc-800/30">
                                            <UserIcon size={12} className="text-zinc-600" />
                                            <span>Owner: {r.user.name}</span>
                                        </div>
                                    )}
                                </CardContent>

                                <CardFooter className="p-5 pt-2 border-t border-zinc-800/50 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">
                                            <Clock size={12} /> Live
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">
                                            <Star size={12} className="text-yellow-500/50" /> 4.8
                                        </div>
                                    </div>
                                    <Button variant="link" className="h-auto p-0 text-green-500 hover:text-green-400 text-xs font-bold group">
                                        View Details <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                    </Button>
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
                restaurant={updateTarget}
                onClose={() => setUpdateTarget(null)}
            />
        </div>
    );
};
