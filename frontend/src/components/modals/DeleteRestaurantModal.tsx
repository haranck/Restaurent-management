import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { useDeleteRestaurant } from "../../hooks/Restaurant/RestaurantHooks";
import toast from "react-hot-toast";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    restaurantId: string | null;
    restaurantName: string | undefined;
}

export const DeleteRestaurantModal = ({ isOpen, onClose, restaurantId, restaurantName }: Props) => {
    const { mutate: deleteRest, isPending } = useDeleteRestaurant();

    const handleDelete = () => {
        if (!restaurantId) return;
        deleteRest(restaurantId, {
            onSuccess: () => {
                toast.success("Restaurant deleted successfully.");
                onClose();
            },
            onError: () => {
                toast.error("Failed to delete restaurant.");
                onClose();
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="w-[95vw] sm:w-full sm:max-w-[420px] bg-zinc-950/80 backdrop-blur-3xl border-zinc-800/50 shadow-[0_0_100px_rgba(239,68,68,0.15)] text-zinc-100 p-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 blur-[100px] pointer-events-none rounded-full" />
                
                <div className="p-6 sm:p-8 relative z-10">
                    <DialogHeader className="flex flex-col items-center text-center gap-2 pb-6">
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-2 ring-8 ring-red-500/5">
                            <AlertTriangle className="text-red-500" size={32} />
                        </div>
                        <DialogTitle className="text-2xl font-black tracking-tight text-white">Delete Restaurant</DialogTitle>
                        <DialogDescription className="text-zinc-400 text-sm font-medium mt-2">
                            Are you sure you want to delete <span className="text-red-400 font-bold">{restaurantName}</span>? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex gap-3 justify-center pt-2 w-full">
                        <Button type="button" variant="ghost" onClick={onClose} disabled={isPending} className="flex-1 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl">
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleDelete}
                            disabled={isPending}
                            className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-black rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isPending ? (
                                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Deleting...</>
                            ) : (
                                <><Trash2 className="mr-2 h-5 w-5" /> Delete</>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
