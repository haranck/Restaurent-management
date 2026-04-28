import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UtensilsCrossed, Plus, TrendingUp, Users, ShoppingBag, Star, ArrowRight, ChefHat, BarChart3, Clock, Sparkles } from "lucide-react";
import type { RootState } from "../store/store";
import { clearAuth } from "../store/slice/authSlice";
import { clearToken } from "../store/slice/tokenSlice";
import Navbar from "../layouts/Navbar";
import { Shop } from "../components/Shop/Shop";
import { CreateRestaurantModal } from "../components/modals/CreateRestaurantModal";
import { useFetchAllRestaurant } from "../hooks/Restaurant/RestaurantHooks";

export const HomePage = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [createOpen, setCreateOpen] = useState(false);
    const { data } = useFetchAllRestaurant();
    // Backend returns { message: '...', restaurants: [...] }
    const restaurants = Array.isArray(data?.restaurants)
        ? data.restaurants
        : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data)
                ? data
                : [];
    const totalRestaurants: number = restaurants.length;

    useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);

    const handleLogout = () => { dispatch(clearAuth()); dispatch(clearToken()); navigate("/login"); };
    void handleLogout;

    const stats = [
        { icon: <ShoppingBag size={18} />, label: "Restaurants", value: String(totalRestaurants) },
        { icon: <TrendingUp size={18} />, label: "Active Orders", value: "—" },
        { icon: <Users size={18} />, label: "Staff Members", value: "—" },
        { icon: <Star size={18} />, label: "Avg. Rating", value: "—" },
    ];

    const features = [
        { icon: <ChefHat size={20} />, title: "Menu Management", desc: "Craft menus in real-time with intuitive tools.", color: "#86bb3c" },
        { icon: <BarChart3 size={20} />, title: "Analytics", desc: "Deep insights into revenue and peak hours.", color: "#f5c518" },
        { icon: <Clock size={20} />, title: "Order Tracking", desc: "Live updates for kitchen and delivery teams.", color: "#3b9eff" },
        { icon: <Users size={20} />, title: "Staff Management", desc: "Schedule shifts and manage payroll easily.", color: "#a78bfa" },
    ];

    return (
        <div style={{ minHeight: "100vh", background: "#060d06", fontFamily: "'Inter',system-ui,sans-serif", color: "#e8f0d8", overflowX: "hidden" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
                *{box-sizing:border-box}
                @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
                @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
                @keyframes orbDrift{0%,100%{transform:translate(0,0)}50%{transform:translate(18px,-14px)}}
                @keyframes pulseGlow{0%,100%{box-shadow:0 8px 32px rgba(134,187,60,0.3)}50%{box-shadow:0 8px 48px rgba(134,187,60,0.55)}}
                .hp-cta:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 16px 48px rgba(134,187,60,0.55)!important}
                .hp-outline:hover{background:rgba(134,187,60,0.12)!important;border-color:rgba(134,187,60,0.4)!important;color:#86bb3c!important}
                .hp-stat:hover{transform:translateY(-3px);border-color:rgba(134,187,60,0.28)!important}
                .hp-feat:hover{transform:translateY(-5px);border-color:rgba(134,187,60,0.22)!important;box-shadow:0 20px 60px rgba(0,0,0,0.5)!important}
                .hp-cta,.hp-outline,.hp-stat,.hp-feat{transition:all 0.22s ease}
            `}</style>

            <Navbar />

            {/* HERO */}
            <section style={{ position: "relative", paddingTop: 110, paddingBottom: 72, padding: "110px 24px 72px", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "5%", right: "6%", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle,rgba(134,187,60,0.08) 0%,transparent 65%)", animation: "orbDrift 9s ease-in-out infinite", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-8%", left: "4%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,197,24,0.05) 0%,transparent 65%)", animation: "orbDrift 13s ease-in-out infinite reverse", pointerEvents: "none" }} />
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(134,187,60,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(134,187,60,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

                <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
                    {/* Text */}
                    <div style={{ flex: "1 1 480px", animation: "fadeUp 0.6s ease both" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(134,187,60,0.1)", border: "1px solid rgba(134,187,60,0.25)", borderRadius: 99, padding: "5px 14px 5px 8px", marginBottom: 22 }}>
                            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg,#86bb3c,#f5c518)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Sparkles size={11} color="#fff" />
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "#86bb3c", letterSpacing: "0.04em" }}>Welcome back, {user?.name ?? "Chef"}!</span>
                        </div>

                        <h1 style={{ fontSize: "clamp(30px,5vw,56px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-1px", color: "#fff", margin: "0 0 18px" }}>
                            Manage Your{" "}
                            <span style={{ background: "linear-gradient(90deg,#86bb3c,#f5c518)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                Restaurants
                            </span>{" "}
                            with Ease
                        </h1>

                        <p style={{ fontSize: 15, color: "#5a7048", lineHeight: 1.75, maxWidth: 500, marginBottom: 34 }}>
                            Your all-in-one platform to add, track, and grow every restaurant. Orders, menus, staff — all from one beautiful dashboard.
                        </p>

                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <button className="hp-cta" onClick={() => setCreateOpen(true)} style={{ display: "flex", alignItems: "center", gap: 9, padding: "13px 26px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#86bb3c,#f5c518)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 32px rgba(134,187,60,0.38)", animation: "pulseGlow 3s ease-in-out infinite" }}>
                                <Plus size={16} /> Add Restaurant
                            </button>
                            <button className="hp-outline" onClick={() => document.getElementById("shop-section")?.scrollIntoView({ behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 9, padding: "13px 26px", borderRadius: 12, border: "1px solid rgba(134,187,60,0.2)", background: "rgba(134,187,60,0.06)", color: "#a0c870", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                                View All <ArrowRight size={15} />
                            </button>
                        </div>
                    </div>

                    {/* Floating card */}
                    <div style={{ animation: "float 5s ease-in-out infinite, fadeUp 0.7s ease 0.15s both", display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
                        <div style={{ background: "rgba(8,20,8,0.92)", border: "1px solid rgba(134,187,60,0.2)", borderRadius: 22, padding: "26px 30px", boxShadow: "0 24px 64px rgba(0,0,0,0.5)", backdropFilter: "blur(20px)", minWidth: 210 }}>
                            <div style={{ width: 56, height: 56, borderRadius: 15, background: "linear-gradient(135deg,#86bb3c,#f5c518)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, boxShadow: "0 8px 24px rgba(134,187,60,0.35)" }}>
                                <UtensilsCrossed size={24} color="#fff" strokeWidth={2} />
                            </div>
                            <p style={{ fontSize: 11, color: "#4a6038", margin: "0 0 3px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Your Network</p>
                            <p style={{ fontSize: 34, fontWeight: 900, color: "#fff", margin: "0 0 3px" }}>{totalRestaurants}</p>
                            <p style={{ fontSize: 12, color: "#4a6038", margin: 0 }}>Restaurant{totalRestaurants !== 1 ? "s" : ""} registered</p>
                        </div>
                        <div style={{ background: "rgba(245,197,24,0.08)", border: "1px solid rgba(245,197,24,0.18)", borderRadius: 10, padding: "7px 14px", fontSize: 11, fontWeight: 700, color: "#f5c518", display: "flex", alignItems: "center", gap: 7 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f5c518", display: "inline-block" }} />
                            Dashboard Active
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section style={{ borderTop: "1px solid rgba(134,187,60,0.1)", borderBottom: "1px solid rgba(134,187,60,0.1)", background: "rgba(8,18,8,0.6)", padding: "26px 24px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 14 }}>
                    {stats.map(({ icon, label, value }, i) => (
                        <div key={label} className="hp-stat" style={{ display: "flex", alignItems: "center", gap: 13, padding: "15px 18px", borderRadius: 13, border: "1px solid rgba(134,187,60,0.1)", background: "rgba(10,24,10,0.5)", animation: `fadeUp 0.4s ease ${i * 0.07}s both` }}>
                            <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(134,187,60,0.12)", border: "1px solid rgba(134,187,60,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#86bb3c", flexShrink: 0 }}>{icon}</div>
                            <div>
                                <p style={{ fontSize: 10, color: "#4a6038", fontWeight: 700, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</p>
                                <p style={{ fontSize: 20, fontWeight: 900, color: "#c8e0a0", margin: 0 }}>{value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURES */}
            <section style={{ padding: "68px 24px 52px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: 44 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(245,197,24,0.08)", border: "1px solid rgba(245,197,24,0.2)", borderRadius: 99, padding: "4px 14px", fontSize: 10, fontWeight: 700, color: "#f5c518", letterSpacing: "0.07em", marginBottom: 14 }}>
                            <Sparkles size={10} /> COMING SOON
                        </div>
                        <h2 style={{ fontSize: "clamp(20px,4vw,34px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", margin: "0 0 10px" }}>
                            Everything to{" "}
                            <span style={{ background: "linear-gradient(90deg,#86bb3c,#f5c518)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Run a Restaurant</span>
                        </h2>
                        <p style={{ color: "#4a6038", fontSize: 14, margin: 0 }}>Powerful tools on their way — stay tuned.</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 16 }}>
                        {features.map(({ icon, title, desc, color }, i) => (
                            <div key={title} className="hp-feat" style={{ background: "rgba(8,18,8,0.7)", border: "1px solid rgba(134,187,60,0.1)", borderRadius: 18, padding: "22px 22px 22px", position: "relative", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.3)", animation: `fadeUp 0.4s ease ${0.1 + i * 0.07}s both` }}>
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${color}55,transparent)` }} />
                                <span style={{ position: "absolute", top: 14, right: 14, fontSize: 9, fontWeight: 800, color: "#f5c518", background: "rgba(245,197,24,0.1)", border: "1px solid rgba(245,197,24,0.2)", borderRadius: 99, padding: "2px 8px", letterSpacing: "0.06em" }}>SOON</span>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", color, marginBottom: 14 }}>{icon}</div>
                                <h3 style={{ fontSize: 14, fontWeight: 800, color: "#e8f0d8", margin: "0 0 7px" }}>{title}</h3>
                                <p style={{ fontSize: 12, color: "#4a6038", lineHeight: 1.65, margin: 0 }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SHOP */}
            <div id="shop-section" style={{ borderTop: "1px solid rgba(134,187,60,0.1)" }}>
                <Shop onOpenCreate={() => setCreateOpen(true)} />
            </div>

            <CreateRestaurantModal isOpen={createOpen} onClose={() => setCreateOpen(false)} />
        </div>
    );
};