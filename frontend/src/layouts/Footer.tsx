import { Link } from "react-router-dom";
import { UtensilsCrossed, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "rgba(3,8,3,0.98)",
        borderTop: "1px solid rgba(134,187,60,0.12)",
        padding: "48px 40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "48px",
        }}
      >
        {/* Brand column */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "9px",
                background: "linear-gradient(135deg,#86bb3c,#f5c518)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UtensilsCrossed style={{ width: 16, height: 16, color: "#fff" }} strokeWidth={2.5} />
            </div>
            <span
              style={{
                fontSize: "16px",
                fontWeight: 800,
                background: "linear-gradient(90deg,#86bb3c,#f5c518)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DineManager
            </span>
          </div>
          <p style={{ fontSize: "12px", color: "#5a7048", lineHeight: "1.7", maxWidth: "280px" }}>
            The all-in-one platform to manage menus, orders, staff, and analytics for your restaurant — from a single dashboard.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "20px" }}>
            {[
              { icon: Mail, text: "support@dinemanager.com" },
              { icon: Phone, text: "+1 (800) 123-4567" },
              { icon: MapPin, text: "San Francisco, CA" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Icon style={{ width: 12, height: 12, color: "#86bb3c", flexShrink: 0 }} />
                <span style={{ fontSize: "11px", color: "#5a7048" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: "12px", fontWeight: 700, color: "#86bb3c", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            Quick Links
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Shops", href: "/shops" },
              { label: "About Us", href: "/about" },
              { label: "Sign In", href: "/login" },
              { label: "Create Account", href: "/signup" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                to={href}
                style={{ fontSize: "12px", color: "#5a7048", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#86bb3c")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#5a7048")}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{ fontSize: "12px", fontWeight: 700, color: "#86bb3c", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
            Legal
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                style={{ fontSize: "12px", color: "#5a7048", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#86bb3c")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#5a7048")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto 0",
          paddingTop: "20px",
          borderTop: "1px solid rgba(134,187,60,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "11px", color: "#3a4a30" }}>
          © {new Date().getFullYear()} DineManager. All rights reserved.
        </p>
        <p style={{ fontSize: "11px", color: "#3a4a30" }}>
          Built with ❤️ for restaurateurs
        </p>
      </div>
    </footer>
  );
};

export default Footer;
