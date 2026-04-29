import { Link } from "react-router-dom";
import { UtensilsCrossed, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";

const LandingNavbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-100 h-16 flex items-center px-6 md:px-10 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 shadow-2xl shadow-black/50">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-green-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform duration-300">
                    <UtensilsCrossed className="text-white w-[18px] h-[18px]" strokeWidth={2.5} />
                </div>
                <span className="text-lg font-black tracking-tighter bg-linear-to-br from-green-500 to-yellow-500 bg-clip-text text-transparent">
                    DineManager
                </span>
            </Link>

            {/* Nav Links — centered */}
            <div className="hidden md:flex items-center gap-8 mx-auto">
                {[
                    { label: "Features", href: "#features" },
                    { label: "Pricing", href: "#pricing" },
                    { label: "About Us", href: "/about" },
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

            {/* Right — Auth buttons */}
            <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                <Link
                    to="/login"
                    className="text-sm font-bold text-zinc-500 hover:text-white transition-colors"
                >
                    Login
                </Link>
                <Button
                    className="bg-linear-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold rounded-xl px-6 shadow-lg shadow-green-600/20 group"
                >
                    <Link to="/signup">
                        Get Started <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </div>
        </nav>
    );
};

export default LandingNavbar;
