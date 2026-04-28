import { useState } from "react";
import { UtensilsCrossed, MapPin, Phone, Search, Plus, Store, Filter, ChevronRight, Loader2, AlertCircle, Pencil } from "lucide-react";
import { useFetchAllRestaurant } from "../../hooks/Restaurant/RestaurantHooks";
import { CreateRestaurantModal } from "../modals/CreateRestaurantModal";
import { UpdateRestaurantModal } from "../modals/UpdateRestaurantModal";

interface Restaurant {
    id: string;
    name: string;
    description?: string;
    phone?: string;
    foodType?: string;
    nearestPlace?: string;
    address?: { locality?: string; city?: string; state?: string; pincode?: string };
}

interface ShopProps {
    onOpenCreate?: () => void;
}

const foodTypeColors: Record<string, string> = {
    veg: "#86bb3c",
    non_veg: "#e74c3c",
    both: "#f5c518",
    italian: "#f5c518",
    indian: "#ff6b35",
    chinese: "#e74c3c",
    "fast food": "#86bb3c",
    mexican: "#9b59b6",
    japanese: "#e91e63",
    continental: "#3498db",
};

function getFoodTypeColor(type?: string): string {
    if (!type) return "#86bb3c";
    return foodTypeColors[type.toLowerCase()] ?? "#86bb3c";
}

function getInitials(name: string): string {
    return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export const Shop = ({ onOpenCreate }: ShopProps) => {
    const { data, isLoading, isError } = useFetchAllRestaurant();
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [localCreateOpen, setLocalCreateOpen] = useState(false);
    const [updateTarget, setUpdateTarget] = useState<Restaurant | null>(null);

    // Backend returns { message: '...', restaurants: [...] }
    const restaurants: Restaurant[] = Array.isArray(data?.restaurants)
        ? data.restaurants
        : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data)
                ? data
                : [];

    const foodTypes = ["All", ...Array.from(new Set(restaurants.map((r) => r.foodType).filter((t): t is string => Boolean(t))))];

    const filtered = restaurants.filter((r) => {
        const matchSearch =
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.description?.toLowerCase().includes(search.toLowerCase()) ||
            r.address?.city?.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filterType === "All" || r.foodType === filterType;
        return matchSearch && matchFilter;
    });

    const handleCreate = () => {
        if (onOpenCreate) onOpenCreate();
        else setLocalCreateOpen(true);
    };

    return (
        <div style={{ paddingTop: 0, minHeight: "60vh", background: "#060d06" }}>
            <style>{`
                @keyframes fadeSlideUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
                @keyframes spin{to{transform:rotate(360deg)}}
                .r-card{transition:all 0.22s ease;cursor:pointer}
                .r-card:hover{transform:translateY(-4px);box-shadow:0 20px 60px rgba(0,0,0,0.6),0 0 0 1px rgba(134,187,60,0.25)!important;border-color:rgba(134,187,60,0.3)!important}
                .r-card:hover .c-arrow{opacity:1!important;transform:translateX(3px)!important}
                .r-chip{transition:all 0.18s;cursor:pointer;white-space:nowrap}
                .r-chip:hover{border-color:rgba(134,187,60,0.5)!important;color:#86bb3c!important}
                .s-input:focus{border-color:rgba(134,187,60,0.5)!important;background:rgba(134,187,60,0.06)!important}
                .s-input::placeholder{color:#3a5028}
                .s-addbtn{transition:all 0.22s ease}
                .s-addbtn:hover{box-shadow:0 8px 32px rgba(134,187,60,0.5)!important;transform:translateY(-1px)}
                .edit-btn{transition:all 0.18s;opacity:0}
                .r-card:hover .edit-btn{opacity:1}
                .edit-btn:hover{background:rgba(134,187,60,0.18)!important}
            `}</style>

            {/* Section Header */}
            <div style={{ background: "linear-gradient(135deg,rgba(10,22,10,0.98),rgba(5,12,5,0.95))", borderBottom: "1px solid rgba(134,187,60,0.12)", padding: "40px 24px 32px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -50, right: 60, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle,rgba(134,187,60,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 18, marginBottom: 24 }}>
                        <div>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(134,187,60,0.1)", border: "1px solid rgba(134,187,60,0.2)", borderRadius: 99, padding: "4px 12px", fontSize: 11, fontWeight: 700, color: "#86bb3c", letterSpacing: "0.06em", marginBottom: 12 }}>
                                <Store size={11} /> RESTAURANT DIRECTORY
                            </div>
                            <h2 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", margin: "0 0 6px", lineHeight: 1.1 }}>
                                All{" "}
                                <span style={{ background: "linear-gradient(90deg,#86bb3c,#f5c518)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                    Restaurants
                                </span>
                            </h2>
                            <p style={{ color: "#5a7048", fontSize: 13, margin: 0 }}>
                                {isLoading ? "Loading…" : `${filtered.length} restaurant${filtered.length !== 1 ? "s" : ""} found`}
                            </p>
                        </div>
                        <button className="s-addbtn" onClick={handleCreate} style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 20px", borderRadius: 11, border: "none", background: "linear-gradient(135deg,#86bb3c,#f5c518)", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(134,187,60,0.35)", flexShrink: 0 }}>
                            <Plus size={15} /> Add Restaurant
                        </button>
                    </div>

                    {/* Search + filters */}
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                        <div style={{ position: "relative", flex: "1 1 260px", minWidth: 200 }}>
                            <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "#4a6038", pointerEvents: "none" }} />
                            <input className="s-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, city…" style={{ width: "100%", paddingLeft: 34, paddingRight: 12, paddingTop: 9, paddingBottom: 9, borderRadius: 10, border: "1px solid rgba(134,187,60,0.18)", background: "rgba(255,255,255,0.04)", color: "#e8f0d8", fontSize: 13, outline: "none", transition: "all 0.2s", boxSizing: "border-box" }} />
                        </div>
                        <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
                            <Filter size={12} color="#4a6038" style={{ flexShrink: 0 }} />
                            {foodTypes.map((type) => (
                                <button key={type} className="r-chip" onClick={() => setFilterType(type)} style={{ padding: "5px 13px", borderRadius: 99, border: `1px solid ${filterType === type ? "rgba(134,187,60,0.5)" : "rgba(134,187,60,0.15)"}`, background: filterType === type ? "rgba(134,187,60,0.15)" : "rgba(255,255,255,0.03)", color: filterType === type ? "#86bb3c" : "#5a7048", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }}>
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 60px" }}>
                {/* Loading */}
                {isLoading && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "72px 0", gap: 14 }}>
                        <Loader2 style={{ width: 34, height: 34, color: "#86bb3c", animation: "spin 0.9s linear infinite" }} />
                        <p style={{ color: "#4a6038", fontSize: 13, margin: 0 }}>Loading restaurants…</p>
                    </div>
                )}

                {/* Error */}
                {isError && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "72px 0", gap: 12 }}>
                        <div style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(248,113,113,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <AlertCircle size={24} color="#f87171" />
                        </div>
                        <p style={{ color: "#f87171", fontSize: 14, fontWeight: 600, margin: 0 }}>Failed to load restaurants</p>
                        <p style={{ color: "#4a3030", fontSize: 12, margin: 0 }}>Check your connection and try again.</p>
                    </div>
                )}

                {/* Empty */}
                {!isLoading && !isError && filtered.length === 0 && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "72px 0", gap: 14 }}>
                        <div style={{ width: 68, height: 68, borderRadius: 18, background: "rgba(134,187,60,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <UtensilsCrossed size={30} color="#3a5028" />
                        </div>
                        <h3 style={{ color: "#5a7048", fontSize: 17, fontWeight: 700, margin: 0 }}>{search ? "No results found" : "No restaurants yet"}</h3>
                        <p style={{ color: "#3a5028", fontSize: 13, margin: 0, textAlign: "center" }}>{search ? "Try a different search term." : "Be the first to add a restaurant!"}</p>
                        {!search && (
                            <button onClick={handleCreate} style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#86bb3c,#f5c518)", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                                <Plus size={14} /> Add Restaurant
                            </button>
                        )}
                    </div>
                )}

                {/* Grid */}
                {!isLoading && !isError && filtered.length > 0 && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: 18 }}>
                        {filtered.map((r, i) => {
                            const color = getFoodTypeColor(r.foodType);
                            return (
                                <div key={r.id} className="r-card" style={{ background: "rgba(8,18,8,0.8)", border: "1px solid rgba(134,187,60,0.1)", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.4)", animation: `fadeSlideUp 0.3s ease ${i * 0.04}s both`, position: "relative" }}>
                                    <div style={{ height: 4, background: `linear-gradient(90deg,${color},#f5c518)` }} />
                                    <div style={{ padding: "18px 20px" }}>
                                        {/* Header */}
                                        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                                            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}22`, border: `1px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14, fontWeight: 800, color, letterSpacing: "-0.5px" }}>
                                                {getInitials(r.name)}
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
                                                    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#e8f0d8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</h3>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                                                        <button
                                                            className="edit-btn"
                                                            onClick={(e) => { e.stopPropagation(); setUpdateTarget(r); }}
                                                            style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid rgba(134,187,60,0.2)", background: "rgba(134,187,60,0.08)", color: "#86bb3c", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                                                        >
                                                            <Pencil size={12} />
                                                        </button>
                                                        <ChevronRight className="c-arrow" size={14} color="#86bb3c" style={{ opacity: 0, transition: "all 0.2s" }} />
                                                    </div>
                                                </div>
                                                {r.foodType && (
                                                    <span style={{ display: "inline-block", marginTop: 4, padding: "2px 9px", borderRadius: 99, background: `${color}16`, border: `1px solid ${color}30`, fontSize: 10, fontWeight: 700, color, letterSpacing: "0.05em", textTransform: "capitalize" }}>
                                                        {r.foodType}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {r.description && (
                                            <p style={{ fontSize: 12, color: "#4a6038", lineHeight: 1.6, margin: "0 0 12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                                {r.description}
                                            </p>
                                        )}

                                        <div style={{ height: 1, background: "rgba(134,187,60,0.07)", margin: "12px 0" }} />

                                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                            {(r.address?.city || r.address?.state) && (
                                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                    <MapPin size={11} color="#4a6038" style={{ flexShrink: 0 }} />
                                                    <span style={{ fontSize: 11, color: "#5a7048" }}>{[r.address?.locality, r.address?.city, r.address?.state].filter(Boolean).join(", ")}</span>
                                                </div>
                                            )}
                                            {r.phone && (
                                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                    <Phone size={11} color="#4a6038" style={{ flexShrink: 0 }} />
                                                    <span style={{ fontSize: 11, color: "#5a7048" }}>{r.phone}</span>
                                                </div>
                                            )}
                                            {r.nearestPlace && (
                                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                    <UtensilsCrossed size={11} color="#4a6038" style={{ flexShrink: 0 }} />
                                                    <span style={{ fontSize: 11, color: "#5a7048" }}>Near {r.nearestPlace}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Local modal (when not using parent's) */}
            {!onOpenCreate && <CreateRestaurantModal isOpen={localCreateOpen} onClose={() => setLocalCreateOpen(false)} />}
            <UpdateRestaurantModal restaurant={updateTarget} onClose={() => setUpdateTarget(null)} />
        </div>
    );
};
