import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, UtensilsCrossed, MapPin, Phone, Tag, Loader2, CheckCircle2, Info } from "lucide-react";
import { useCreateRestaurant } from "../../hooks/Restaurant/RestaurantHooks";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

// Zod Schema based on backend requirements and Prisma Enum
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

const iStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(134,187,60,0.18)",
    background: "rgba(255,255,255,0.04)",
    color: "#e8f0d8",
    fontSize: 13,
    outline: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
};

const lStyle: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 700,
    color: "#86bb3c",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    marginBottom: 6,
    display: "block",
};

const errorStyle: React.CSSProperties = {
    fontSize: 10,
    color: "#f87171",
    marginTop: 4,
    display: "flex",
    alignItems: "center",
    gap: 4,
};

const secTitle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    color: "#f5c518",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
    borderBottom: "1px solid rgba(245,197,24,0.1)",
    paddingBottom: 8,
};

export const CreateRestaurantModal = ({ isOpen, onClose }: Props) => {
    const { mutate, isPending, isSuccess, reset: resetMutation } = useCreateRestaurant();

    const {
        register,
        handleSubmit,
        reset: resetForm,
        formState: { errors },
    } = useForm<RestaurantFormData>({
        resolver: zodResolver(restaurantSchema),
        defaultValues: {
            foodType: "VEG",
        },
    });

    const onSubmit = (data: RestaurantFormData) => {
        const payload = {
            name: data.name,
            description: data.description || "",
            phone: data.phone,
            foodType: data.foodType,
            nearestPlace: data.nearestPlace || "",
            address: {
                locality: data.locality,
                city: data.city,
                state: data.state,
                pincode: data.pincode,
            },
        };

        mutate(payload, {
            onSuccess: () => {
                setTimeout(() => {
                    handleClose();
                }, 1500);
            },
        });
    };

    const handleClose = () => {
        resetForm();
        resetMutation();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                background: "rgba(0,0,0,0.82)",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
            }}
        >
            <style>{`
                @keyframes modalIn { from { opacity: 0; transform: translateY(30px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes spin { to { transform: rotate(360deg); } }
                .cm-input:focus { border-color: rgba(134,187,60,0.5) !important; background: rgba(134,187,60,0.06) !important; box-shadow: 0 0 0 3px rgba(134,187,60,0.1); }
                .cm-input::placeholder { color: #3a5028; }
                .cm-close:hover { background: rgba(248,113,113,0.15) !important; color: #f87171 !important; transform: rotate(90deg); }
                .cm-submit:hover:not(:disabled) { box-shadow: 0 12px 32px rgba(134,187,60,0.5) !important; transform: translateY(-2px); filter: brightness(1.1); }
                .cm-submit:disabled { opacity: 0.6; cursor: not-allowed; }
                .cm-cancel:hover { background: rgba(255,255,255,0.08) !important; color: #fff !important; }
                .cm-close, .cm-submit, .cm-cancel { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
                select.cm-input option { background: #0a140a; color: #e8f0d8; }
            `}</style>

            <div
                style={{
                    background: "linear-gradient(165deg, #0a180a 0%, #050c05 100%)",
                    border: "1px solid rgba(134,187,60,0.22)",
                    borderRadius: 24,
                    width: "100%",
                    maxWidth: 580,
                    maxHeight: "92vh",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(134,187,60,0.05)",
                    animation: "modalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        padding: "26px 30px 20px",
                        borderBottom: "1px solid rgba(134,187,60,0.12)",
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        flexShrink: 0,
                    }}
                >
                    <div
                        style={{
                            width: 44,
                            height: 44,
                            borderRadius: 14,
                            background: "linear-gradient(135deg,#86bb3c,#f5c518)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            boxShadow: "0 8px 24px rgba(134,187,60,0.4)",
                        }}
                    >
                        <UtensilsCrossed size={20} color="#fff" strokeWidth={2.5} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.4px" }}>
                            Create Restaurant
                        </h2>
                        <p style={{ margin: "3px 0 0", fontSize: 12, color: "#5a7048", fontWeight: 500 }}>
                            Add a new culinary destination to your network
                        </p>
                    </div>
                    <button
                        className="cm-close"
                        onClick={handleClose}
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "rgba(255,255,255,0.05)",
                            color: "#6a8058",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            flexShrink: 0,
                        }}
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                {isSuccess ? (
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "60px 40px",
                            gap: 18,
                        }}
                    >
                        <div
                            style={{
                                width: 72,
                                height: 72,
                                borderRadius: "50%",
                                background: "rgba(134,187,60,0.15)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 0 0 10px rgba(134,187,60,0.05)",
                            }}
                        >
                            <CheckCircle2 size={36} color="#86bb3c" />
                        </div>
                        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#fff" }}>
                            Success!
                        </h3>
                        <p style={{ margin: 0, fontSize: 14, color: "#5a7048", textAlign: "center", maxWidth: 300, lineHeight: 1.6 }}>
                            Your restaurant has been successfully created and will appear in the directory.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} style={{ overflowY: "auto", flex: 1, padding: "28px 32px" }}>
                        {/* Section 1: Basic Info */}
                        <p style={secTitle}>
                            <UtensilsCrossed size={12} /> Basic Details
                        </p>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                            <div>
                                <label style={lStyle}>Restaurant Name *</label>
                                <input
                                    className="cm-input"
                                    placeholder="e.g. The Emerald Kitchen"
                                    style={{ ...iStyle, borderColor: errors.name ? "rgba(248,113,113,0.4)" : undefined }}
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <span style={errorStyle}><Info size={10} /> {errors.name.message}</span>
                                )}
                            </div>
                            <div>
                                <label style={lStyle}>Food Type *</label>
                                <select
                                    className="cm-input"
                                    style={{ ...iStyle, borderColor: errors.foodType ? "rgba(248,113,113,0.4)" : undefined }}
                                    {...register("foodType")}
                                >
                                    <option value="VEG">Pure Veg (VEG)</option>
                                    <option value="NON_VEG">Non-Veg (NON_VEG)</option>
                                    <option value="BOTH">Both (BOTH)</option>
                                </select>
                                {errors.foodType && (
                                    <span style={errorStyle}><Info size={10} /> {errors.foodType.message}</span>
                                )}
                            </div>
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <label style={lStyle}>Description</label>
                            <textarea
                                className="cm-input"
                                placeholder="A brief story about your restaurant's cuisine and ambiance..."
                                style={{ ...iStyle, height: 80, resize: "none", fontFamily: "inherit" }}
                                {...register("description")}
                            />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
                            <div>
                                <label style={lStyle}><Phone size={10} style={{ marginRight: 4 }} /> Phone Number *</label>
                                <input
                                    className="cm-input"
                                    placeholder="+91 98765 43210"
                                    style={{ ...iStyle, borderColor: errors.phone ? "rgba(248,113,113,0.4)" : undefined }}
                                    {...register("phone")}
                                />
                                {errors.phone && (
                                    <span style={errorStyle}><Info size={10} /> {errors.phone.message}</span>
                                )}
                            </div>
                            <div>
                                <label style={lStyle}><Tag size={10} style={{ marginRight: 4 }} /> Nearest Place</label>
                                <input
                                    className="cm-input"
                                    placeholder="e.g. Near Metro Station"
                                    style={iStyle}
                                    {...register("nearestPlace")}
                                />
                            </div>
                        </div>

                        {/* Section 2: Address */}
                        <p style={secTitle}>
                            <MapPin size={12} /> Location Details
                        </p>

                        <div style={{ marginBottom: 16 }}>
                            <label style={lStyle}>Locality / Landmark *</label>
                            <input
                                className="cm-input"
                                placeholder="e.g. MG Road, Sector 42"
                                style={{ ...iStyle, borderColor: errors.locality ? "rgba(248,113,113,0.4)" : undefined }}
                                {...register("locality")}
                            />
                            {errors.locality && (
                                <span style={errorStyle}><Info size={10} /> {errors.locality.message}</span>
                            )}
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
                            <div>
                                <label style={lStyle}>City *</label>
                                <input
                                    className="cm-input"
                                    placeholder="City"
                                    style={{ ...iStyle, borderColor: errors.city ? "rgba(248,113,113,0.4)" : undefined }}
                                    {...register("city")}
                                />
                                {errors.city && (
                                    <span style={errorStyle}><Info size={10} /> {errors.city.message}</span>
                                )}
                            </div>
                            <div>
                                <label style={lStyle}>State *</label>
                                <input
                                    className="cm-input"
                                    placeholder="State"
                                    style={{ ...iStyle, borderColor: errors.state ? "rgba(248,113,113,0.4)" : undefined }}
                                    {...register("state")}
                                />
                                {errors.state && (
                                    <span style={errorStyle}><Info size={10} /> {errors.state.message}</span>
                                )}
                            </div>
                            <div>
                                <label style={lStyle}>Pincode *</label>
                                <input
                                    className="cm-input"
                                    placeholder="6 Digits"
                                    maxLength={6}
                                    style={{ ...iStyle, borderColor: errors.pincode ? "rgba(248,113,113,0.4)" : undefined }}
                                    {...register("pincode")}
                                />
                                {errors.pincode && (
                                    <span style={errorStyle}><Info size={10} /> {errors.pincode.message}</span>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div
                            style={{
                                display: "flex",
                                gap: 12,
                                justifyContent: "flex-end",
                                paddingTop: 8,
                                borderTop: "1px solid rgba(134,187,60,0.1)",
                                marginTop: 8,
                            }}
                        >
                            <button
                                type="button"
                                className="cm-cancel"
                                onClick={handleClose}
                                style={{
                                    padding: "11px 24px",
                                    borderRadius: 12,
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    background: "rgba(255,255,255,0.05)",
                                    color: "#a0b890",
                                    fontSize: 13,
                                    fontWeight: 700,
                                    cursor: "pointer",
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="cm-submit"
                                type="submit"
                                disabled={isPending}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    padding: "11px 28px",
                                    borderRadius: 12,
                                    border: "none",
                                    background: "linear-gradient(135deg,#86bb3c,#f5c518)",
                                    color: "#fff",
                                    fontSize: 14,
                                    fontWeight: 800,
                                    cursor: "pointer",
                                    boxShadow: "0 8px 24px rgba(134,187,60,0.3)",
                                }}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 size={16} style={{ animation: "spin 0.8s linear infinite" }} />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <UtensilsCrossed size={16} />
                                        Add Restaurant
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
