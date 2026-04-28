import { Link } from "react-router-dom";
import { UtensilsCrossed } from "lucide-react";

const LandingNavbar = () => {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "64px",
        display: "flex",
        alignItems: "center",
        padding: "0 40px",
        background: "rgba(5, 12, 5, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(134,187,60,0.12)",
        boxShadow: "0 2px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Brand */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            background: "linear-gradient(135deg,#86bb3c,#f5c518)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UtensilsCrossed style={{ width: 17, height: 17, color: "#fff" }} strokeWidth={2.5} />
        </div>
        <span
          style={{
            fontSize: "17px",
            fontWeight: 800,
            letterSpacing: "-0.3px",
            background: "linear-gradient(90deg,#86bb3c,#f5c518)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          DineManager
        </span>
      </Link>

      {/* Nav Links — centered */}
      <div style={{ display: "flex", gap: "32px", margin: "0 auto" }}>
        {[
          { label: "Shops", href: "/shops" },
          { label: "About Us", href: "/about" },
        ].map(({ label, href }) => (
          <Link
            key={label}
            to={href}
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#a0b890",
              textDecoration: "none",
              letterSpacing: "0.2px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#86bb3c")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#a0b890")}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Right — Auth buttons */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Link
          to="/login"
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#a0b890",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#a0b890")}
        >
          Login
        </Link>
        <Link
          to="/signup"
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#fff",
            textDecoration: "none",
            background: "linear-gradient(135deg,#86bb3c,#f5c518)",
            padding: "7px 18px",
            borderRadius: "10px",
            boxShadow: "0 2px 12px rgba(134,187,60,0.3)",
            flexShrink: 0,
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
