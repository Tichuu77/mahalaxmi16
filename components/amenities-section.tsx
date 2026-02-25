"use client"

import { Wifi, Dumbbell, Trees, Zap, Shield, Users } from "lucide-react"
import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react"

const amenities = [
  { icon: Wifi,      title: "Smart Home",        description: "Advanced IoT integration for modern living.",     category: "facilities"    },
  { icon: Dumbbell,  title: "Fitness Center",    description: "State-of-the-art gym facilities.",                category: "wellness"      },
  { icon: Trees,     title: "Green Spaces",      description: "Lush landscaping and parks.",                    category: "wellness"      },
  { icon: Zap,       title: "Power Backup",      description: "Uninterrupted power supply 24/7.",               category: "facilities"    },
  { icon: Shield,    title: "Security",          description: "CCTV surveillance and on-site personnel.",       category: "facilities"    },
  { icon: Users,     title: "Community Hub",     description: "Spaces for social gatherings.",                  category: "entertainment" },
  { emoji: "🏊",     title: "Swimming Pool",     description: "Olympic-sized pool with children's area.",       category: "wellness"      },
  { emoji: "🎮",     title: "Gaming Zone",       description: "Indoor games and entertainment facilities.",     category: "entertainment" },
  { emoji: "🧘",     title: "Yoga & Meditation", description: "Dedicated spaces for wellness activities.",      category: "wellness"      },
  { emoji: "🚗",     title: "Covered Parking",   description: "Secure multi-level parking facilities.",         category: "facilities"    },
  { emoji: "🎪",     title: "Banquet Hall",      description: "Event spaces for celebrations.",                 category: "entertainment" },
  { emoji: "👶",     title: "Kids Play Area",    description: "Safe and fun playground for children.",          category: "entertainment" },
]

// Doubled array created once at module level — not inside component
const marqueeItems = [...amenities, ...amenities]

const tabs = [
  { key: "all",           label: "All"          },
  { key: "wellness",      label: "Wellness"     },
  { key: "entertainment", label: "Fun & Social" },
  { key: "facilities",    label: "Facilities"   },
]

// Memoized marquee — never re-renders
const MarqueeStrip = memo(() => (
  <div
    className="relative overflow-hidden py-4"
    style={{
      maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
    }}
  >
    <div className="flex gap-4 w-max" style={{ animation: "marquee 30s linear infinite" }}>
      {marqueeItems.map((a, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 shrink-0 rounded-full px-5 py-2.5"
          style={{ background: "rgba(48,83,74,0.07)", border: "1px solid rgba(48,83,74,0.13)" }}
        >
          {(a as any).emoji ? (
            <span className="text-lg leading-none">{(a as any).emoji}</span>
          ) : (
            <a.icon size={15} style={{ color: "#C9862b" }} />
          )}
          <span
            className="text-sm font-semibold whitespace-nowrap"
            style={{ color: "#30534A", fontFamily: "'Poppins', sans-serif" }}
          >
            {a.title}
          </span>
        </div>
      ))}
    </div>
  </div>
))
MarqueeStrip.displayName = "MarqueeStrip"

// Memoized card — only re-renders when its own data changes
const AmenityCard = memo(({ amenity, index }: { amenity: (typeof amenities)[number]; index: number }) => {
  const Icon = (amenity as any).icon
  const isEmoji = !!(amenity as any).emoji

  const handleEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = "rgba(201,134,43,0.4)"
    e.currentTarget.style.boxShadow = "0 8px 24px rgba(48,83,74,0.12)"
  }, [])

  const handleLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.borderColor = "rgba(48,83,74,0.1)"
    e.currentTarget.style.boxShadow = "0 2px 8px rgba(48,83,74,0.05)"
  }, [])

  return (
    <div
      className="group relative rounded-2xl p-4 sm:p-5 lg:p-6 cursor-default overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]"
      style={{
        background: "#fff",
        border: "1px solid rgba(48,83,74,0.1)",
        boxShadow: "0 2px 8px rgba(48,83,74,0.05)",
        willChange: "transform",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span
        className="absolute top-3 right-3 text-[10px] font-bold tabular-nums"
        style={{ color: "rgba(48,83,74,0.15)", fontFamily: "'Poppins', sans-serif" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
        style={{ background: "rgba(201,134,43,0.1)", border: "1px solid rgba(201,134,43,0.2)" }}
      >
        {isEmoji ? (
          <span className="text-lg sm:text-xl leading-none">{(amenity as any).emoji}</span>
        ) : (
          <Icon size={18} className="sm:w-5 sm:h-5" style={{ color: "#C9862b" }} />
        )}
      </div>

      <h3
        className="font-bold mb-1 leading-snug group-hover:text-[#30534A] transition-colors duration-200"
        style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.82rem", color: "#0d0d0d" }}
      >
        {amenity.title}
      </h3>

      <p
        className="hidden sm:block leading-relaxed"
        style={{ color: "#999", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem" }}
      >
        {amenity.description}
      </p>

      <div
        className="absolute bottom-0 left-0 h-[2.5px] w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
        style={{ background: "linear-gradient(90deg, #C9862b, #30534A)" }}
      />
    </div>
  )
})
AmenityCard.displayName = "AmenityCard"

export function AmenitiesSection() {
  const [activeTab, setActiveTab] = useState("all")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Derived filtered list — recomputed only when activeTab changes
  const filtered = useMemo(
    () => activeTab === "all" ? amenities : amenities.filter((a) => a.category === activeTab),
    [activeTab]
  )

  return (
    <section
      id="amenities"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#f7f4ef" }}
    >
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(48,83,74,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(48,83,74,0.06) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,134,43,0.06) 0%, transparent 70%)" }}
      />

      {/* Section label */}
      <div
        className="flex items-center gap-4 px-6 sm:px-16 lg:px-24 py-5 relative z-10"
        style={{ borderBottom: "1px solid rgba(48,83,74,0.1)" }}
      >
        <span
          className="text-[10px] tracking-[0.35em] uppercase font-bold"
          style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}
        >
          Life Inside
        </span>
        <span className="flex-1 h-px" style={{ background: "rgba(48,83,74,0.1)" }} />
        <span
          className="text-[10px] tracking-[0.2em] uppercase font-medium"
          style={{ color: "rgba(48,83,74,0.35)", fontFamily: "'Inter', sans-serif" }}
        >
          12 Amenities
        </span>
      </div>

      {/* Heading + Tabs */}
      <div
        className={`max-w-[1400px] mx-auto px-6 sm:px-16 lg:px-24 pt-10 pb-8 relative z-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        style={{ willChange: "transform, opacity" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <h2
              className="font-bold leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.75rem, 4.5vw, 3.4rem)", color: "#0d0d0d" }}
            >
              Everything
              <br className="hidden sm:block" />
              {" "}<span style={{ color: "#C9862b" }}>You</span>{" "}
              <span style={{ WebkitTextStroke: "1.5px #30534A", color: "transparent" }}>Need</span>
            </h2>
            <p
              className="mt-3 max-w-md leading-relaxed text-sm"
              style={{ color: "#777", fontFamily: "'Inter', sans-serif" }}
            >
              Comprehensive features designed to exceed your expectations — built for the way you actually live.
            </p>
          </div>

          <div
            className="flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible pb-1 sm:pb-0"
            style={{ scrollbarWidth: "none" } as React.CSSProperties}
          >
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className="shrink-0 px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-250 active:scale-95"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  background: activeTab === t.key ? "#30534A" : "rgba(48,83,74,0.08)",
                  color: activeTab === t.key ? "#fff" : "#30534A",
                  border: activeTab === t.key ? "1px solid #30534A" : "1px solid rgba(48,83,74,0.18)",
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 mb-8">
        <MarqueeStrip />
      </div>

      {/* Cards Grid */}
      <div
        className={`max-w-[1400px] mx-auto px-6 sm:px-16 lg:px-24 pb-16 sm:pb-20 relative z-10 transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        style={{ willChange: "transform, opacity" }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((amenity, i) => (
            <AmenityCard key={`${amenity.title}`} amenity={amenity} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}