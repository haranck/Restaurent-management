import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UtensilsCrossed, User, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearAuth } from "../store/slice/authSlice";
import { clearToken } from "../store/slice/tokenSlice";
import type { RootState } from "../store/store";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearAuth());
    dispatch(clearToken());
    navigate("/login");
  };

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

      {/* Right — User info */}
      {user ? (
        <div style={{ position: "relative", flexShrink: 0 }}>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(134,187,60,0.1)",
              border: "1px solid rgba(134,187,60,0.2)",
              borderRadius: "10px",
              padding: "6px 12px",
              cursor: "pointer",
              color: "#d0e8b0",
              fontSize: "13px",
              fontWeight: 600,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(134,187,60,0.18)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(134,187,60,0.1)")
            }
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#86bb3c,#f5c518)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <User style={{ width: 13, height: 13, color: "#fff" }} strokeWidth={2.5} />
            </div>
            {user.name}
            <ChevronDown
              style={{
                width: 13,
                height: 13,
                color: "#86bb3c",
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                background: "rgba(8,18,8,0.95)",
                border: "1px solid rgba(134,187,60,0.15)",
                borderRadius: "12px",
                padding: "6px",
                minWidth: "160px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
                backdropFilter: "blur(16px)",
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "none",
                  background: "transparent",
                  color: "#f87171",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(248,113,113,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <LogOut style={{ width: 13, height: 13 }} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
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
          }}
        >
          Sign In
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
