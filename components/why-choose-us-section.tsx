"use client"

import { Check, Zap, Trophy, Users, Heart, Lightbulb } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const reasons = [
  {
    icon: Trophy,
    title: "Proven Excellence",
    description: "Award-winning projects trusted by thousands of families across Nagpur.",
    stat: "70+",
    statLabel: "Projects",
  },
  {
    icon: Zap,
    title: "Innovation First",
    description: "Modern layouts, smart planning, and forward-thinking infrastructure.",
    stat: "13+",
    statLabel: "Years",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Dedicated professionals with decades of real estate experience.",
    stat: "17K+",
    statLabel: "Clients",
  },
  {
    icon: Heart,
    title: "Customer Focused",
    description: "Your satisfaction drives every decision we make, from plot to possession.",
    stat: "100%",
    statLabel: "RERA Approved",
  },
  {
    icon: Lightbulb,
    title: "Prime Locations",
    description: "Strategically chosen land near major highways, hospitals, and schools.",
    stat: "9+",
    statLabel: "Locations",
  },
  {
    icon: Check,
    title: "Quality Assured",
    description: "NMRDA sanctioned, legally clear, and bank finance eligible plots.",
    stat: "90%",
    statLabel: "Finance",
  },
]

const trackRecord = [
  "13+ years industry experience",
  "17,000+ satisfied families",
  "Industry-leading satisfaction rate",
]

const support = [
  "24/7 customer support",
  "Dedicated site visit assistance",
  "Transparent documentation process",
]

export function WhyChooseUsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
        }
      },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="relative overflow-hidden"
      style={{ background: "#f7f4ef" }}
    >
      {/* Left accent stripe */}
      <div
        className="absolute top-0 left-0 bottom-0 w-1"
        style={{ background: "linear-gradient(to bottom, #C9862b, #30534A, #C9862b)" }}
      />

      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(48,83,74,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,134,43,0.07) 0%, transparent 70%)" }} />

      {/* ── Label strip ── */}
      <div
        className="flex items-center gap-4 pl-8 pr-6 sm:pl-16 sm:pr-10 lg:px-24 py-5 relative z-10"
        style={{ borderBottom: "1px solid rgba(48,83,74,0.1)" }}
      >
        <span className="text-[10px] tracking-[0.35em] uppercase font-bold" style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}>
          Why Choose Us
        </span>
        <span className="flex-1 h-px" style={{ background: "rgba(48,83,74,0.1)" }} />
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "rgba(48,83,74,0.35)", fontFamily: "'Inter', sans-serif" }}>
          The Difference We Make
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto pl-8 pr-6 sm:pl-16 sm:pr-10 lg:px-24 pt-12 pb-20 relative z-10">

        {/* ── Header + intro row ── */}
        <div
          className={`grid lg:grid-cols-[1fr_1px_1fr] gap-8 lg:gap-0 mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Left: heading */}
          <div className="lg:pr-14">
            <h2
              className="font-bold leading-tight mb-4 text-[#0d0d0d]"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.75rem, 4vw, 3.2rem)" }}
            >
              Why Thousands
              <br />
              <span style={{ color: "#30534A" }}>Trust</span>{" "}
              <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>
                Mahalaxmi
              </span>
            </h2>
            <p className="text-sm leading-relaxed max-w-md" style={{ color: "#777", fontFamily: "'Inter', sans-serif" }}>
              For over a decade, we've been building more than plots — we build confidence, community, and lasting value for families across Nagpur.
            </p>
          </div>

          {/* Divider */}
          <div className="hidden lg:block" style={{ background: "rgba(48,83,74,0.1)", width: "1px" }} />

          {/* Right: two checklist columns */}
          <div className="lg:pl-14 grid sm:grid-cols-2 gap-6">
            {/* Track record */}
            <div>
              <h4
                className="font-bold mb-4 text-sm uppercase tracking-wider"
                style={{ color: "#30534A", fontFamily: "'Poppins', sans-serif", letterSpacing: "0.12em" }}
              >
                Track Record
              </h4>
              <ul className="space-y-3">
                {trackRecord.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(201,134,43,0.12)", border: "1px solid rgba(201,134,43,0.3)" }}
                    >
                      <Check size={9} style={{ color: "#C9862b" }} />
                    </span>
                    <span className="text-sm leading-snug" style={{ color: "#555", fontFamily: "'Inter', sans-serif" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4
                className="font-bold mb-4 text-sm uppercase tracking-wider"
                style={{ color: "#30534A", fontFamily: "'Poppins', sans-serif", letterSpacing: "0.12em" }}
              >
                Our Support
              </h4>
              <ul className="space-y-3">
                {support.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(48,83,74,0.1)", border: "1px solid rgba(48,83,74,0.25)" }}
                    >
                      <Check size={9} style={{ color: "#30534A" }} />
                    </span>
                    <span className="text-sm leading-snug" style={{ color: "#555", fontFamily: "'Inter', sans-serif" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Reasons — horizontal numbered list (desktop) / 2-col grid (mobile) ── */}
        <div
          className={`transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Desktop: stacked rows with number + divider layout */}
          <div className="hidden md:block">
            {reasons.map((r, i) => {
              const Icon = r.icon
              const isActive = activeCard === i
              return (
                <div
                  key={i}
                  className="group grid grid-cols-[48px_1fr_auto] items-center gap-6 lg:gap-10 py-5 cursor-default transition-all duration-250"
                  style={{
                    borderBottom: i < reasons.length - 1 ? "1px solid rgba(48,83,74,0.1)" : "none",
                  }}
                  onMouseEnter={() => setActiveCard(i)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Index */}
                  <span
                    className="font-bold tabular-nums leading-none transition-colors duration-200"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "1.5rem",
                      color: isActive ? "#C9862b" : "rgba(48,83,74,0.18)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Content */}
                  <div className="flex items-center gap-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-250"
                      style={{
                        background: isActive ? "#30534A" : "rgba(48,83,74,0.08)",
                        border: isActive ? "1px solid #30534A" : "1px solid rgba(48,83,74,0.15)",
                      }}
                    >
                      <Icon size={17} style={{ color: isActive ? "#C9862b" : "#30534A" }} />
                    </div>
                    <div>
                      <h3
                        className="font-bold leading-tight mb-0.5 transition-colors duration-200"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "1rem",
                          color: isActive ? "#30534A" : "#0d0d0d",
                        }}
                      >
                        {r.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#888", fontFamily: "'Inter', sans-serif" }}>
                        {r.description}
                      </p>
                    </div>
                  </div>

                  {/* Stat badge */}
                  <div
                    className="shrink-0 text-right transition-all duration-250"
                    style={{ opacity: isActive ? 1 : 0.35 }}
                  >
                    <div
                      className="font-bold leading-none"
                      style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.6rem", color: "#C9862b" }}
                    >
                      {r.stat}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold mt-0.5" style={{ color: "#aaa", fontFamily: "'Inter', sans-serif" }}>
                      {r.statLabel}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile: 2-col card grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {reasons.map((r, i) => {
              const Icon = r.icon
              return (
                <div
                  key={i}
                  className="rounded-2xl p-4 flex flex-col gap-3 active:scale-[0.98] transition-all duration-200"
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(48,83,74,0.1)",
                    boxShadow: "0 2px 8px rgba(48,83,74,0.05)",
                  }}
                >
                  {/* Icon + stat row */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(48,83,74,0.08)", border: "1px solid rgba(48,83,74,0.14)" }}
                    >
                      <Icon size={15} style={{ color: "#C9862b" }} />
                    </div>
                    <div className="text-right">
                      <div className="font-bold leading-none" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem", color: "#C9862b" }}>
                        {r.stat}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider" style={{ color: "#aaa", fontFamily: "'Inter', sans-serif" }}>
                        {r.statLabel}
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div>
                    <h3
                      className="font-bold mb-1 leading-snug"
                      style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.82rem", color: "#0d0d0d" }}
                    >
                      {r.title}
                    </h3>
                    <p className="leading-relaxed" style={{ color: "#999", fontFamily: "'Inter', sans-serif", fontSize: "0.72rem" }}>
                      {r.description}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div className="h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, #C9862b, #30534A)", width: `${30 + i * 12}%` }} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}