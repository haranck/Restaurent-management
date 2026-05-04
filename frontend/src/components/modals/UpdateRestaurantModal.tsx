import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UtensilsCrossed, MapPin, Phone, Tag, Loader2, CheckCircle2, Pencil, Info, ImagePlus, X } from "lucide-react";
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
    imageUrl?: string | null;
    imageId?: string | null;
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
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        reset: resetForm,
        setValue,
        formState: { errors },
    } = useForm<UpdateFormData>({ resolver: zodResolver(updateSchema) });

    const [prevRestaurantId, setPrevRestaurantId] = useState<string | null>(null);

    // Adjust state during render when the restaurant changes to avoid cascading renders
    if (restaurant && restaurant.id !== prevRestaurantId) {
        setPrevRestaurantId(restaurant.id);
        setImageFile(null);
        setImagePreview(null);
        resetForm({
            name: restaurant.name,
            description: restaurant.description || "",
            phone: restaurant.phone,
            foodType: restaurant.foodType,
            nearestPlace: restaurant.nearestPlace || "",
            locality: restaurant.address?.locality,
            city: restaurant.address?.city,
            state: restaurant.address?.state,
            pincode: restaurant.address?.pincode,
        });
    }

    const handleImageChange = (file: File | null) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Only image files are allowed.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be smaller than 5MB.");
            return;
        }
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const onSubmit = (data: UpdateFormData) => {
        if (!restaurant) return;
        const payload = {
            id: restaurant.id,
            name: data.name,
            description: data.description,
            phone: data.phone,
            foodType: data.foodType,
            nearestPlace: data.nearestPlace,
            image: imageFile ?? undefined,
            address: (data.city || data.state || data.locality || data.pincode)
                ? {
                    locality: data.locality || "",
                    city: data.city || "",
                    state: data.state || "",
                    pincode: data.pincode || "",
                }
                : undefined,
        };

        mutate(payload, {
            onSuccess: () => {
                toast.success("Restaurant updated successfully!");
                setTimeout(() => handleClose(), 1500);
            },
            onError: (error: unknown) => {
                const err = error as { response?: { data?: { message?: string } } };
                if (err?.response?.data?.message) {
                    toast.error(err.response.data.message);
                } else if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error("An unknown error occurred");
                }
            },
        });
    };

    const handleClose = () => {
        resetMutation();
        removeImage();
        onClose();
    };

    // Decide which image to show: new preview > existing cloudinary url
    const displayImage = imagePreview ?? restaurant?.imageUrl ?? null;

    return (
        <Dialog open={!!restaurant} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="w-[95vw] sm:w-full mt-10 sm:max-w-[650px] bg-zinc-950/80 backdrop-blur-3xl border-zinc-800/50 shadow-[0_0_100px_rgba(234,179,8,0.15)] text-zinc-100 overflow-x-hidden overflow-y-auto max-h-[90vh] p-0">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-500/10 blur-[100px] pointer-events-none rounded-full" />
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-orange-500/10 blur-[100px] pointer-events-none rounded-full" />
                
                <div className="p-5 sm:p-8 relative z-10">
                <DialogHeader className="flex flex-row items-center gap-5 space-y-0 pb-6 border-b border-zinc-800/50">
                    <div className="relative">
                        <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full" />
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg ring-1 ring-white/20 relative z-10">
                            <Pencil className="text-black" size={24} strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="flex-1 text-left">
                        <DialogTitle className="text-2xl font-black tracking-tight text-white">Edit Restaurant</DialogTitle>
                        <DialogDescription className="text-zinc-400 text-sm font-medium mt-1">
                            Updating: <span className="text-yellow-500 font-bold">{restaurant?.name}</span>
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
                    <form onSubmit={(e) => handleSubmit(onSubmit)(e)} className="space-y-8 pt-6">
                        {/* Basic Details */}
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
                                        className={cn("bg-black/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-yellow-500 focus-visible:border-yellow-500 transition-all shadow-inner rounded-xl", errors.name && "border-red-500/50")}
                                        {...register("name")}
                                    />
                                    {errors.name && <p className="text-[10px] text-red-500 flex items-center gap-1"><Info size={10} /> {errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="foodType" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Food Type</Label>
                                    <Select onValueChange={(value) => setValue("foodType", value as "VEG" | "NON_VEG" | "BOTH")} defaultValue={restaurant?.foodType}>
                                        <SelectTrigger className="bg-black/40 border-zinc-800 text-zinc-100 focus:ring-yellow-500 focus:border-yellow-500 transition-all shadow-inner rounded-xl">
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
                                    className="bg-black/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-yellow-500 focus-visible:border-yellow-500 transition-all shadow-inner rounded-xl min-h-[70px]"
                                    {...register("description")}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5"><Phone size={12} /> Phone Number</Label>
                                    <Input
                                        id="phone"
                                        placeholder="+91 98765 43210"
                                        className={cn("bg-black/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-yellow-500 focus-visible:border-yellow-500 transition-all shadow-inner rounded-xl", errors.phone && "border-red-500/50")}
                                        {...register("phone")}
                                    />
                                    {errors.phone && <p className="text-[10px] text-red-500 flex items-center gap-1"><Info size={10} /> {errors.phone.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nearestPlace" className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5"><Tag size={12} /> Nearest Place</Label>
                                    <Input
                                        id="nearestPlace"
                                        placeholder="Near City Mall"
                                        className="bg-black/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-yellow-500 focus-visible:border-yellow-500 transition-all shadow-inner rounded-xl"
                                        {...register("nearestPlace")}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest pb-2 border-b border-zinc-800/50">
                                <ImagePlus size={14} />
                                <span>Restaurant Image <span className="text-zinc-600 normal-case font-normal">(upload new to replace current)</span></span>
                            </div>

                            {displayImage ? (
                                <div className="relative rounded-xl overflow-hidden border border-zinc-700 group">
                                    <img
                                        src={displayImage}
                                        alt="Restaurant"
                                        className="w-full h-44 object-cover"
                                    />
                                    {/* Badge to show if it's existing or new */}
                                    <div className="absolute top-2 left-2">
                                        <span className={cn(
                                            "text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider",
                                            imagePreview
                                                ? "bg-green-500/80 text-white"
                                                : "bg-zinc-800/80 text-zinc-400"
                                        )}>
                                            {imagePreview ? "New Image" : "Current Image"}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <Button
                                            type="button"
                                            size="sm"
                                            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold gap-1.5"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <ImagePlus size={14} /> Replace
                                        </Button>
                                        {imagePreview && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="gap-1.5 font-bold"
                                                onClick={removeImage}
                                            >
                                                <X size={14} /> Remove New
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full h-36 rounded-2xl border-2 border-dashed border-zinc-700 bg-black/20 hover:border-yellow-500 hover:bg-yellow-500/10 transition-all flex flex-col items-center justify-center gap-3 group cursor-pointer"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-zinc-800 group-hover:bg-yellow-500/10 flex items-center justify-center transition-colors">
                                        <ImagePlus size={22} className="text-zinc-500 group-hover:text-yellow-500 transition-colors" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-zinc-400 group-hover:text-zinc-300">Click to upload image</p>
                                        <p className="text-xs text-zinc-600">PNG, JPG, WEBP up to 5MB</p>
                                    </div>
                                </button>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
                            />
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
                                    className={cn("bg-black/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-yellow-500 focus-visible:border-yellow-500 transition-all shadow-inner rounded-xl", errors.locality && "border-red-500/50")}
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
                                        className={cn("bg-black/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-yellow-500 focus-visible:border-yellow-500 transition-all shadow-inner rounded-xl", errors.city && "border-red-500/50")}
                                        {...register("city")}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">State</Label>
                                    <Input
                                        id="state"
                                        placeholder="State"
                                        className={cn("bg-black/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-yellow-500 focus-visible:border-yellow-500 transition-all shadow-inner rounded-xl", errors.state && "border-red-500/50")}
                                        {...register("state")}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pincode" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Pincode</Label>
                                    <Input
                                        id="pincode"
                                        placeholder="6 Digits"
                                        maxLength={6}
                                        className={cn("bg-black/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-yellow-500 focus-visible:border-yellow-500 transition-all shadow-inner rounded-xl", errors.pincode && "border-red-500/50")}
                                        {...register("pincode")}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end pt-6 border-t border-zinc-800/50 mt-6">
                            <Button type="button" variant="ghost" onClick={handleClose} className="text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="bg-gradient-to-r from-yellow-500 to-orange-400 hover:from-yellow-400 hover:to-orange-300 text-black font-black px-8 rounded-xl shadow-[0_0_30px_rgba(234,179,8,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {isPending ? (
                                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...</>
                                ) : (
                                    <><Pencil className="mr-2 h-5 w-5" /> Save Changes</>
                                )}
                            </Button>
                        </div>
                    </form>
                )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
