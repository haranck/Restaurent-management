import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UtensilsCrossed, MapPin, Phone, Tag, Loader2, CheckCircle2, Pencil, Info } from "lucide-react";
import { useUpdateRestaurant } from "../../hooks/Restaurant/RestaurantHooks";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { cn } from "../../lib/utils";
import toast from "react-hot-toast";

interface Restaurant {
    id: string;
    name?: string;
    description?: string;
    phone?: string;
    foodType?: "VEG" | "NON_VEG" | "BOTH";
    nearestPlace?: string;
    address?: { locality?: string; city?: string; state?: string; pincode?: string };
}

interface Props {
    restaurant: Restaurant | null;
    onClose: () => void;
}

const updateSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    description: z.string().optional(),
    phone: z.string().min(10, "Phone number must be at least 10 digits").optional(),
    foodType: z.enum(["VEG", "NON_VEG", "BOTH"] as const).optional(),
    nearestPlace: z.string().optional(),
    locality: z.string().min(2, "Locality is required").optional(),
    city: z.string().min(2, "City is required").optional(),
    state: z.string().min(2, "State is required").optional(),
    pincode: z.string().length(6, "Pincode must be exactly 6 digits").optional(),
});

type UpdateFormData = z.infer<typeof updateSchema>;

export const UpdateRestaurantModal = ({ restaurant, onClose }: Props) => {
    const { mutate, isPending, isSuccess, reset: resetMutation } = useUpdateRestaurant();

    const {
        register,
        handleSubmit,
        reset: resetForm,
        setValue,
        formState: { errors },
    } = useForm<UpdateFormData>({
        resolver: zodResolver(updateSchema),
    });

    useEffect(() => {
        if (restaurant) {
            resetForm({
                name: restaurant.name,
                description: restaurant.description || "",
                phone: restaurant.phone,
                foodType: restaurant.foodType as "VEG" | "NON_VEG" | "BOTH",
                nearestPlace: restaurant.nearestPlace || "",
                locality: restaurant.address?.locality,
                city: restaurant.address?.city,
                state: restaurant.address?.state,
                pincode: restaurant.address?.pincode,
            });
        }
    }, [restaurant, resetForm]);

    const onSubmit = (data: UpdateFormData) => {
        if (!restaurant) return;

        const payload = {
            id: restaurant.id,
            name: data.name,
            description: data.description,
            phone: data.phone,
            foodType: data.foodType,
            nearestPlace: data.nearestPlace,
            address: (data.city || data.state || data.locality || data.pincode)
                ? {
                    locality: data.locality || "",
                    city: data.city || "",
                    state: data.state || "",
                    pincode: data.pincode || ""
                }
                : undefined,
        };

        mutate(payload, {
            onSuccess: () => {
                setTimeout(() => {
                    handleClose();
                }, 1500);
            },
            onError: (error: unknown) => {
                if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error("An unknown error occurred");
                }
            }
        });
    };

    const handleClose = () => {
        resetMutation();
        onClose();
    };

    return (
        <Dialog open={!!restaurant} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-[600px] bg-zinc-950 border-zinc-800 text-zinc-100 overflow-y-auto max-h-[90vh]">
                <DialogHeader className="flex flex-row items-center gap-4 space-y-0 pb-6 border-b border-zinc-800">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                        <Pencil className="text-white" size={20} />
                    </div>
                    <div className="flex-1 text-left">
                        <DialogTitle className="text-xl font-bold tracking-tight">Edit Restaurant</DialogTitle>
                        <DialogDescription className="text-zinc-500 text-sm">
                            Updating: <span className="text-yellow-500 font-semibold">{restaurant?.name}</span>
                        </DialogDescription>
                    </div>
                </DialogHeader>

                {isSuccess ? (
                    <div className="py-12 flex flex-col items-center justify-center gap-4 text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center ring-8 ring-yellow-500/5">
                            <CheckCircle2 className="text-yellow-500" size={40} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold text-white">Changes Saved!</h3>
                            <p className="text-zinc-500">The restaurant details have been successfully updated.</p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pt-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-widest pb-2 border-b border-zinc-800/50">
                                <UtensilsCrossed size={14} />
                                <span>Basic Details</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Restaurant Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Restaurant name"
                                        className={cn("bg-zinc-900/50 border-zinc-800 text-zinc-100 focus-visible:ring-yellow-500/50", errors.name && "border-red-500/50")}
                                        {...register("name")}
                                    />
                                    {errors.name && <p className="text-[10px] text-red-500 flex items-center gap-1"><Info size={10} /> {errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="foodType" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Food Type</Label>
                                    <Select
                                        onValueChange={(value) => setValue("foodType", value as "VEG" | "NON_VEG" | "BOTH")}
                                        value={restaurant?.foodType}
                                    >
                                        <SelectTrigger className="bg-zinc-900/50 border-zinc-800 text-zinc-100 focus:ring-yellow-500/50">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                                            <SelectItem value="VEG">Pure Veg (VEG)</SelectItem>
                                            <SelectItem value="NON_VEG">Non-Veg (NON_VEG)</SelectItem>
                                            <SelectItem value="BOTH">Both (BOTH)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Brief description..."
                                    className="bg-zinc-900/50 border-zinc-800 text-zinc-100 focus-visible:ring-yellow-500/50 min-h-[80px]"
                                    {...register("description")}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5"><Phone size={12} /> Phone Number</Label>
                                    <Input
                                        id="phone"
                                        placeholder="+91 98765 43210"
                                        className={cn("bg-zinc-900/50 border-zinc-800 text-zinc-100 focus-visible:ring-yellow-500/50", errors.phone && "border-red-500/50")}
                                        {...register("phone")}
                                    />
                                    {errors.phone && <p className="text-[10px] text-red-500 flex items-center gap-1"><Info size={10} /> {errors.phone.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nearestPlace" className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5"><Tag size={12} /> Nearest Place</Label>
                                    <Input
                                        id="nearestPlace"
                                        placeholder="Near City Mall"
                                        className="bg-zinc-900/50 border-zinc-800 text-zinc-100 focus-visible:ring-yellow-500/50"
                                        {...register("nearestPlace")}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold uppercase tracking-widest pb-2 border-b border-zinc-800/50">
                                <MapPin size={14} />
                                <span>Location Details</span>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="locality" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Locality / Landmark</Label>
                                <Input
                                    id="locality"
                                    placeholder="Sector 18"
                                    className={cn("bg-zinc-900/50 border-zinc-800 text-zinc-100 focus-visible:ring-yellow-500/50", errors.locality && "border-red-500/50")}
                                    {...register("locality")}
                                />
                                {errors.locality && <p className="text-[10px] text-red-500 flex items-center gap-1"><Info size={10} /> {errors.locality.message}</p>}
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">City</Label>
                                    <Input
                                        id="city"
                                        placeholder="City"
                                        className={cn("bg-zinc-900/50 border-zinc-800 text-zinc-100 focus-visible:ring-yellow-500/50", errors.city && "border-red-500/50")}
                                        {...register("city")}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">State</Label>
                                    <Input
                                        id="state"
                                        placeholder="State"
                                        className={cn("bg-zinc-900/50 border-zinc-800 text-zinc-100 focus-visible:ring-yellow-500/50", errors.state && "border-red-500/50")}
                                        {...register("state")}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pincode" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Pincode</Label>
                                    <Input
                                        id="pincode"
                                        placeholder="6 Digits"
                                        maxLength={6}
                                        className={cn("bg-zinc-900/50 border-zinc-800 text-zinc-100 focus-visible:ring-yellow-500/50", errors.pincode && "border-red-500/50")}
                                        {...register("pincode")}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end pt-4 border-t border-zinc-800">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={handleClose}
                                className="text-zinc-400 hover:text-white hover:bg-zinc-900"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="bg-linear-to-br from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white font-bold px-8 shadow-lg shadow-yellow-600/20"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};
