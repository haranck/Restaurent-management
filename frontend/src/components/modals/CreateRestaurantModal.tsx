import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UtensilsCrossed, MapPin, Phone, Tag, Loader2, CheckCircle2, Info, ImagePlus, X } from "lucide-react";
import { useCreateRestaurant } from "../../hooks/Restaurant/RestaurantHooks";
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

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const restaurantSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional(),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    foodType: z.enum(["VEG", "NON_VEG", "BOTH"] as const, {
        message: "Please select a valid food type",
    }),
    nearestPlace: z.string().optional(),
    locality: z.string().min(2, "Locality is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    pincode: z.string().length(6, "Pincode must be exactly 6 digits"),
});

type RestaurantFormData = z.infer<typeof restaurantSchema>;

export const CreateRestaurantModal = ({ isOpen, onClose }: Props) => {
    const { mutate, isPending, isSuccess, reset: resetMutation } = useCreateRestaurant();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        reset: resetForm,
        setValue,
        formState: { errors },
    } = useForm<RestaurantFormData>({
        resolver: zodResolver(restaurantSchema),
        defaultValues: { foodType: "VEG" },
    });

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

    const onSubmit = (data: RestaurantFormData) => {
        const payload = {
            name: data.name,
            description: data.description,
            phone: data.phone,
            foodType: data.foodType,
            nearestPlace: data.nearestPlace,
            image: imageFile ?? undefined,
            address: {
                locality: data.locality,
                city: data.city,
                state: data.state,
                pincode: data.pincode,
            },
        };

        mutate(payload, {
            onSuccess: () => {
                toast.success("Restaurant created successfully!");
                setTimeout(() => handleClose(), 1500);
            },
            onError: (error: unknown) => {
                const err = error as { response?: { data?: { message?: string } } };
                console.error("Create Restaurant Error:", err?.response?.data || error);
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
        resetForm();
        resetMutation();
        removeImage();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="w-[95vw] sm:w-full sm:max-w-[650px]  mt-10 bg-zinc-950/80 backdrop-blur-3xl border-zinc-800/50 shadow-[0_0_100px_rgba(34,197,94,0.15)] text-zinc-100 overflow-x-hidden overflow-y-auto max-h-[90vh] p-0">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 blur-[100px] pointer-events-none rounded-full" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/10 blur-[100px] pointer-events-none rounded-full" />
                
                <div className="p-5 sm:p-8 relative z-10">
                <DialogHeader className="flex flex-row items-center gap-5 space-y-0 pb-6 border-b border-zinc-800/50">
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg ring-1 ring-white/20 relative z-10">
                            <UtensilsCrossed className="text-black" size={24} strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="flex-1 text-left">
                        <DialogTitle className="text-2xl font-black tracking-tight text-white">Add Restaurant</DialogTitle>
                        <DialogDescription className="text-zinc-400 text-sm font-medium mt-1">
                            Expand your culinary empire. Fill in the details below.
                        </DialogDescription>
                    </div>
                </DialogHeader>

                {isSuccess ? (
                    <div className="py-12 flex flex-col items-center justify-center gap-4 text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center ring-8 ring-green-500/5">
                            <CheckCircle2 className="text-green-500" size={40} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold text-white">Restaurant Added!</h3>
                            <p className="text-zinc-500">Successfully registered in your directory.</p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={(e) => handleSubmit(onSubmit)(e)} className="space-y-8 pt-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold uppercase tracking-widest pb-2 border-b border-zinc-800/50">
                                <UtensilsCrossed size={14} />
                                <span>Basic Information</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Restaurant Name *</Label>
                                    <Input
                                        id="name"
                                        placeholder="The Golden Fork"
                                        className={cn("bg-black/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-green-500 focus-visible:border-green-500 transition-all shadow-inner rounded-xl", errors.name && "border-red-500/50")}
                                        {...register("name")}
                                    />
                                    {errors.name && <p className="text-[10px] text-red-500 flex items-center gap-1"><Info size={10} /> {errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="foodType" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Food Type *</Label>
                                    <Select onValueChange={(value) => setValue("foodType", value as "VEG" | "NON_VEG" | "BOTH")} defaultValue="VEG">
                                        <SelectTrigger className="bg-black/40 border-zinc-800 text-zinc-100 focus:ring-green-500 focus:border-green-500 transition-all shadow-inner rounded-xl">
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
                                    placeholder="Brief description of your restaurant..."
                                    className="bg-black/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-green-500 focus-visible:border-green-500 transition-all shadow-inner rounded-xl min-h-[70px]"
                                    {...register("description")}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5"><Phone size={12} /> Phone Number *</Label>
                                    <Input
                                        id="phone"
                                        placeholder="+91 99999 00000"
                                        className={cn("bg-black/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-green-500 focus-visible:border-green-500 transition-all shadow-inner rounded-xl", errors.phone && "border-red-500/50")}
                                        {...register("phone")}
                                    />
                                    {errors.phone && <p className="text-[10px] text-red-500 flex items-center gap-1"><Info size={10} /> {errors.phone.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nearestPlace" className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5"><Tag size={12} /> Nearest Landmark</Label>
                                    <Input
                                        id="nearestPlace"
                                        placeholder="Near City Mall"
                                        className="bg-black/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-green-500 focus-visible:border-green-500 transition-all shadow-inner rounded-xl"
                                        {...register("nearestPlace")}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest pb-2 border-b border-zinc-800/50">
                                <ImagePlus size={14} />
                                <span>Restaurant Image <span className="text-zinc-600 normal-case font-normal">(optional, max 5MB)</span></span>
                            </div>

                            {imagePreview ? (
                                <div className="relative rounded-xl overflow-hidden border border-zinc-700 group">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-44 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="gap-1.5 font-bold"
                                            onClick={removeImage}
                                        >
                                            <X size={14} /> Remove Image
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full h-36 rounded-2xl border-2 border-dashed border-zinc-700 bg-black/20 hover:border-green-500 hover:bg-green-500/10 transition-all flex flex-col items-center justify-center gap-3 group cursor-pointer"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-zinc-800 group-hover:bg-green-500/10 flex items-center justify-center transition-colors">
                                        <ImagePlus size={22} className="text-zinc-500 group-hover:text-green-500 transition-colors" />
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
                            <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-widest pb-2 border-b border-zinc-800/50">
                                <MapPin size={14} />
                                <span>Location Details</span>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="locality" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Locality / Area *</Label>
                                <Input
                                    id="locality"
                                    placeholder="Sector 18"
                                    className={cn("bg-black/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-green-500 focus-visible:border-green-500 transition-all shadow-inner rounded-xl", errors.locality && "border-red-500/50")}
                                    {...register("locality")}
                                />
                                {errors.locality && <p className="text-[10px] text-red-500 flex items-center gap-1"><Info size={10} /> {errors.locality.message}</p>}
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">City *</Label>
                                    <Input
                                        id="city"
                                        placeholder="Mumbai"
                                        className={cn("bg-black/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-green-500 focus-visible:border-green-500 transition-all shadow-inner rounded-xl", errors.city && "border-red-500/50")}
                                        {...register("city")}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">State *</Label>
                                    <Input
                                        id="state"
                                        placeholder="Maharashtra"
                                        className={cn("bg-black/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-green-500 focus-visible:border-green-500 transition-all shadow-inner rounded-xl", errors.state && "border-red-500/50")}
                                        {...register("state")}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pincode" className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Pincode *</Label>
                                    <Input
                                        id="pincode"
                                        placeholder="400001"
                                        maxLength={6}
                                        className={cn("bg-black/40 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-green-500 focus-visible:border-green-500 transition-all shadow-inner rounded-xl", errors.pincode && "border-red-500/50")}
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
                                className="bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-400 hover:to-emerald-300 text-black font-black px-8 rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {isPending ? (
                                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Creating...</>
                                ) : (
                                    <><UtensilsCrossed className="mr-2 h-5 w-5" /> Add Restaurant</>
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
