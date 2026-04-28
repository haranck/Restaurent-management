import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  UtensilsCrossed,
  ChartBar,
  Clock,
  ShieldCheck,
  Users,
  TrendingUp,
  ArrowRight,
  Star,
} from "lucide-react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import type { RootState } from "../store/store";

const FEATURES = [
  {
    icon: UtensilsCrossed,
    title: "Menu Management",
    desc: "Create and update menus, categories, and items in real time. Push changes instantly to all channels.",
  },
  {
    icon: Clock,
    title: "Live Order Tracking",
    desc: "Monitor every order from table to kitchen to delivery. Real-time status updates for staff and managers.",
  },
  {
    icon: ChartBar,
    title: "Advanced Analytics",
    desc: "Understand your best sellers, peak hours, and revenue trends with rich visual dashboards.",
  },
  {
    icon: Users,
    title: "Staff Scheduling",
    desc: "Assign shifts, manage rosters, and track attendance — all from a single management view.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    desc: "Enterprise-grade security with 99.9% uptime SLA. Your data is always safe and available.",
  },
  {
    icon: TrendingUp,
    title: "Revenue Growth",
    desc: "Actionable insights and smart upsell suggestions that help restaurants grow revenue by 20%+.",
  },
];

const STATS = [
  { value: "500+", label: "Restaurants" },
  { value: "2M+", label: "Orders Processed" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9★", label: "Avg Rating" },
];

const TESTIMONIALS = [
  {
    name: "Marco Rossi",
    role: "Owner, Osteria Roma",
    text: "DineManager completely transformed how we run our kitchen. Orders are faster, waste is down, and staff love the interface.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "GM, Spice Garden",
    text: "The analytics alone paid for the subscription in the first month. Knowing what sells and when is a game changer.",
    rating: 5,
  },
  {
    name: "James O'Brien",
    role: "Chef, The Copper Pot",
    text: "Setup was incredibly easy. We were up and running in under an hour. The support team is amazing too.",
    rating: 5,
  },
];

export const LandingPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060d06",
        color: "#e8f0d8",
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          paddingTop: "64px",
        }}
      >
        {/* background image */}
        <img
          src="/restaurant-bg.png"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        {/* overlays */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(5,12,5,0.75) 0%, transparent 100%)",
          }}
        />

        {/* content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: "760px", padding: "0 24px" }}>
          {/* badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(134,187,60,0.12)",
              border: "1px solid rgba(134,187,60,0.3)",
              borderRadius: "99px",
              padding: "5px 14px",
              marginBottom: "28px",
              fontSize: "11px",
              fontWeight: 700,
              color: "#a8d870",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#86bb3c",
                boxShadow: "0 0 6px #86bb3c",
                display: "inline-block",
              }}
            />
            #1 Restaurant Management Platform
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-1px",
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            Run a smarter{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#86bb3c,#f5c518)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              restaurant
            </span>
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "#a0b890",
              lineHeight: 1.7,
              maxWidth: "540px",
              margin: "0 auto 36px",
            }}
          >
            Streamline your menus, orders, staff, and analytics in one powerful dashboard. Built for restaurants that want to grow.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate(user ? "/shops" : "/signup")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 28px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(135deg,#86bb3c,#f5c518)",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 700,
                boxShadow: "0 6px 24px rgba(134,187,60,0.4)",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 32px rgba(134,187,60,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(134,187,60,0.4)";
              }}
            >
              {user ? "Go to Dashboard" : "Get Started Free"}
              <ArrowRight style={{ width: 15, height: 15 }} />
            </button>

            <button
              onClick={() => navigate("/about")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 28px",
                borderRadius: "12px",
                border: "1px solid rgba(134,187,60,0.3)",
                cursor: "pointer",
                background: "rgba(134,187,60,0.08)",
                color: "#a8d870",
                fontSize: "14px",
                fontWeight: 700,
                backdropFilter: "blur(8px)",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(134,187,60,0.15)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(134,187,60,0.08)")
              }
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section
        style={{
          background: "rgba(8,18,8,0.95)",
          borderTop: "1px solid rgba(134,187,60,0.1)",
          borderBottom: "1px solid rgba(134,187,60,0.1)",
          padding: "36px 40px",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
            textAlign: "center",
          }}
        >
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: 900,
                  background: "linear-gradient(90deg,#86bb3c,#f5c518)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                {value}
              </p>
              <p style={{ fontSize: "12px", color: "#5a7048", fontWeight: 600 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "96px 40px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#86bb3c",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Features
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-0.5px",
              marginBottom: "14px",
            }}
          >
            Everything your restaurant needs
          </h2>
          <p style={{ fontSize: "14px", color: "#5a7048", maxWidth: "480px", margin: "0 auto" }}>
            From the first order of the day to closing time — DineManager keeps everything running smoothly.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              style={{
                background: "rgba(8,18,8,0.7)",
                border: "1px solid rgba(134,187,60,0.12)",
                borderRadius: "16px",
                padding: "28px",
                transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(134,187,60,0.4)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(134,187,60,0.12)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  background: "rgba(134,187,60,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <Icon style={{ width: 20, height: 20, color: "#86bb3c" }} strokeWidth={1.8} />
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#d8eab8", marginBottom: "8px" }}>
                {title}
              </h3>
              <p style={{ fontSize: "12px", color: "#5a7048", lineHeight: "1.7" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        style={{
          background: "rgba(5,12,5,0.8)",
          borderTop: "1px solid rgba(134,187,60,0.08)",
          borderBottom: "1px solid rgba(134,187,60,0.08)",
          padding: "80px 40px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#86bb3c",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Testimonials
            </p>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 900, color: "#fff" }}>
              Loved by restaurateurs worldwide
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {TESTIMONIALS.map(({ name, role, text, rating }) => (
              <div
                key={name}
                style={{
                  background: "rgba(8,18,8,0.6)",
                  border: "1px solid rgba(134,187,60,0.12)",
                  borderRadius: "16px",
                  padding: "28px",
                }}
              >
                <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star
                      key={i}
                      style={{ width: 13, height: 13, color: "#f5c518", fill: "#f5c518" }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: "13px", color: "#90a880", lineHeight: "1.7", marginBottom: "20px" }}>
                  "{text}"
                </p>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#d8eab8" }}>{name}</p>
                  <p style={{ fontSize: "11px", color: "#4a6038", marginTop: "2px" }}>{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: "96px 40px", textAlign: "center" }}>
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            background: "rgba(8,18,8,0.8)",
            border: "1px solid rgba(134,187,60,0.2)",
            borderRadius: "24px",
            padding: "56px 48px",
            boxShadow: "0 0 80px rgba(134,187,60,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 900,
              color: "#fff",
              marginBottom: "14px",
            }}
          >
            Ready to transform your restaurant?
          </h2>
          <p style={{ fontSize: "13px", color: "#5a7048", marginBottom: "32px", lineHeight: 1.7 }}>
            Join 500+ restaurants already using DineManager to serve better and grow faster.
          </p>
          <button
            onClick={() => navigate(user ? "/shops" : "/signup")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 32px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg,#86bb3c,#f5c518)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 700,
              boxShadow: "0 6px 24px rgba(134,187,60,0.4)",
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {user ? "Go to Dashboard" : "Start for Free"}
            <ArrowRight style={{ width: 15, height: 15 }} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};