import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UtensilsCrossed, User, LogOut, ChevronDown, Bell } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearAuth } from "../store/slice/authSlice";
import { clearToken } from "../store/slice/tokenSlice";
import type { RootState } from "../store/store";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

const Navbar = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        dispatch(clearAuth());
        dispatch(clearToken());
        navigate("/");
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-100 h-16 flex items-center px-6 md:px-10 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 shadow-2xl shadow-black/50">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-green-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform duration-300">
                    <UtensilsCrossed className="text-white w-[18px] h-[18px]" strokeWidth={2.5} />
                </div>
                <span className="text-lg font-black tracking-tighter bg-linear-to-br from-green-500 to-yellow-500 bg-clip-text text-transparent">
                    DineMap
                </span>
            </Link>

            {/* Nav Links — centered */}
            <div className="hidden md:flex items-center gap-8 mx-auto">
                {[
                    { label: "Dashboard", href: "/home" },
                    { label: "Shops", href: "/shops" },
                    { label: "Analytics", href: "#" },
                ].map(({ label, href }) => (
                    <Link
                        key={label}
                        to={href}
                        className="text-sm font-bold text-zinc-500 hover:text-green-500 transition-colors tracking-tight"
                    >
                        {label}
                    </Link>
                ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4 shrink-0">
                <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white hidden sm:flex">
                    <Bell size={18} />
                </Button>

                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen((o) => !o)}
                            className={cn(
                                "flex items-center gap-2.5 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 rounded-2xl py-1.5 pl-1.5 pr-3 transition-all",
                                dropdownOpen && "border-green-500/50 bg-green-500/5"
                            )}
                        >
                            <div className="w-7 h-7 rounded-full bg-linear-to-br from-green-500 to-yellow-500 flex items-center justify-center shadow-md">
                                <User className="text-white w-3.5 h-3.5" strokeWidth={3} />
                            </div>
                            <span className="text-sm font-bold text-zinc-200 hidden sm:inline">{user.name}</span>
                            <ChevronDown
                                className={cn("w-4 h-4 text-zinc-500 transition-transform duration-300", dropdownOpen && "rotate-180 text-green-500")}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                                <div className="absolute top-full right-0 mt-3 w-56 bg-zinc-950 border border-zinc-800 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl animate-in fade-in zoom-in duration-200 z-20">
                                    <div className="px-3 py-2 mb-2 border-b border-zinc-900">
                                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Account</p>
                                        <p className="text-sm font-bold text-zinc-200 truncate">{user.email}</p>
                                    </div>
                                    <div className="h-px bg-zinc-900 my-2" />
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-bold text-red-500/70 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                    >
                                        <LogOut size={16} /> Sign Out
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <Button
                        onClick={() => navigate("/")}
                        className="bg-linear-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold rounded-xl px-6 shadow-lg shadow-green-600/20"
                    >
                        Sign In
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
