import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UtensilsCrossed, Construction, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { clearAuth } from "../store/slice/authSlice";
import { clearToken } from "../store/slice/tokenSlice";
import Navbar from "../layouts/Navbar";

export const HomePage = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearAuth());
        dispatch(clearToken());
        navigate("/login");
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#060d06",
                fontFamily: "system-ui, -apple-system, sans-serif",
                color: "#e8f0d8",
            }}
        >
            <Navbar />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    padding: "0 24px",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: "20px",
                        background: "linear-gradient(135deg,#86bb3c,#f5c518)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "28px",
                        boxShadow: "0 8px 32px rgba(134,187,60,0.35)",
                    }}
                >
                    <UtensilsCrossed style={{ width: 34, height: 34, color: "#fff" }} strokeWidth={2} />
                </div>

                <h1
                    style={{
                        fontSize: "clamp(28px, 5vw, 48px)",
                        fontWeight: 900,
                        color: "#fff",
                        letterSpacing: "-0.5px",
                        marginBottom: "10px",
                    }}
                >
                    Welcome back,{" "}
                    <span
                        style={{
                            background: "linear-gradient(90deg,#86bb3c,#f5c518)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {user?.name ?? "Chef"}!
                    </span>
                </h1>

                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "rgba(245,197,24,0.1)",
                        border: "1px solid rgba(245,197,24,0.25)",
                        borderRadius: "99px",
                        padding: "6px 16px",
                        marginBottom: "24px",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#f5c518",
                        letterSpacing: "0.05em",
                    }}
                >
                    <Construction style={{ width: 13, height: 13 }} />
                    Dashboard Coming Soon
                </div>

                <p
                    style={{
                        fontSize: "15px",
                        color: "#5a7048",
                        lineHeight: 1.7,
                        maxWidth: "460px",
                        marginBottom: "40px",
                    }}
                >
                    Your restaurant dashboard is being built. We'll have orders, menus, staff management, and analytics ready for you shortly.
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                        gap: "16px",
                        maxWidth: "680px",
                        width: "100%",
                        marginBottom: "48px",
                    }}
                >
                    {[
                        { label: "Orders", value: "—", note: "Coming soon" },
                        { label: "Menu Items", value: "—", note: "Coming soon" },
                        { label: "Staff", value: "—", note: "Coming soon" },
                        { label: "Revenue", value: "—", note: "Coming soon" },
                    ].map(({ label, value, note }) => (
                        <div
                            key={label}
                            style={{
                                background: "rgba(8,18,8,0.7)",
                                border: "1px solid rgba(134,187,60,0.12)",
                                borderRadius: "14px",
                                padding: "20px",
                                textAlign: "left",
                            }}
                        >
                            <p style={{ fontSize: "11px", color: "#4a6038", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                                {label}
                            </p>
                            <p style={{ fontSize: "26px", fontWeight: 900, color: "#3a5028", marginBottom: "4px" }}>{value}</p>
                            <p style={{ fontSize: "10px", color: "#3a5028" }}>{note}</p>
                        </div>
                    ))}
                </div>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
                    <button
                        onClick={() => navigate("/")}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "11px 24px",
                            borderRadius: "10px",
                            border: "none",
                            cursor: "pointer",
                            background: "linear-gradient(135deg,#86bb3c,#f5c518)",
                            color: "#fff",
                            fontSize: "13px",
                            fontWeight: 700,
                            boxShadow: "0 4px 16px rgba(134,187,60,0.3)",
                        }}
                    >
                        Go to Landing Page
                        <ArrowRight style={{ width: 14, height: 14 }} />
                    </button>

                    <button
                        onClick={handleLogout}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "11px 24px",
                            borderRadius: "10px",
                            border: "1px solid rgba(248,113,113,0.3)",
                            cursor: "pointer",
                            background: "rgba(248,113,113,0.08)",
                            color: "#f87171",
                            fontSize: "13px",
                            fontWeight: 700,
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};