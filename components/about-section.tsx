"use client"

import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { Award, Users, Building2, CheckCircle2, TrendingUp, Shield } from "lucide-react"

const TARGETS = { projects: 70, clients: 17000, years: 13, sqft: 500 } as const
const DURATION = 2000
const STEPS = 60

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ projects: 0, clients: 0, years: 0, sqft: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const animatedRef = useRef(false)

  const animateCounters = useCallback(() => {
    if (animatedRef.current) return
    animatedRef.current = true

    const interval = DURATION / STEPS
    let cur = { projects: 0, clients: 0, years: 0, sqft: 0 }

    timerRef.current = setInterval(() => {
      cur.projects = Math.min(cur.projects + TARGETS.projects / STEPS, TARGETS.projects)
      cur.clients  = Math.min(cur.clients  + TARGETS.clients  / STEPS, TARGETS.clients)
      cur.years    = Math.min(cur.years    + TARGETS.years    / STEPS, TARGETS.years)
      cur.sqft     = Math.min(cur.sqft     + TARGETS.sqft     / STEPS, TARGETS.sqft)

      setCounters({
        projects: Math.floor(cur.projects),
        clients:  Math.floor(cur.clients),
        years:    Math.floor(cur.years),
        sqft:     Math.floor(cur.sqft),
      })

      if (
        cur.projects >= TARGETS.projects &&
        cur.clients  >= TARGETS.clients  &&
        cur.years    >= TARGETS.years    &&
        cur.sqft     >= TARGETS.sqft
      ) {
        clearInterval(timerRef.current!)
        setCounters(TARGETS)
      }
    }, interval)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          animateCounters()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [animateCounters])

  const features = useMemo(() => [
    { icon: Award,        text: "Premium Materials"    },
    { icon: Users,        text: "Expert Craftsmanship" },
    { icon: Shield,       text: "Quality Assurance"    },
    { icon: CheckCircle2, text: "Timely Delivery"      },
    { icon: TrendingUp,   text: "Value Appreciation"   },
    { icon: Building2,    text: "Modern Architecture"  },
  ], [])

  const stats = useMemo(() => [
    { value: counters.projects, suffix: "+",  label: "Completed Projects", icon: Building2 },
    { value: counters.clients,  suffix: "+",  label: "Happy Families",     icon: Users     },
    { value: counters.years,    suffix: "+",  label: "Years Experience",   icon: Award     },
    { value: counters.sqft,     suffix: "K+", label: "Sq.Ft Delivered",    icon: TrendingUp},
  ], [counters])

  const trust = useMemo(() => [
    { icon: Shield,       label: "NMRDA Sanctioned" },
    { icon: CheckCircle2, label: "RERA Approved"    },
    { icon: Award,        label: "ISO Certified"    },
  ], [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#f7f4ef" }}
    >
      <style>{`
        .about-feature-tag:hover {
          background: rgba(48,83,74,0.13) !important;
          border-color: rgba(201,134,43,0.4) !important;
        }
      `}</style>

      {/* Decorative vertical stripe */}
      <div
        className="absolute top-0 left-0 bottom-0 w-1.5"
        style={{ background: "linear-gradient(to bottom, #C9862b, #30534A, #C9862b)" }}
      />

      {/* Watermark */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
        style={{
          fontSize: "clamp(7rem, 14vw, 16rem)",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 900,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(48,83,74,0.07)",
          letterSpacing: "-0.04em",
          userSelect: "none",
          whiteSpace: "nowrap",
          paddingRight: "2rem",
        }}
      >
        INFRA
      </div>

      {/* Top strip */}
      <div
        className="flex items-center gap-4 px-5 sm:px-10 lg:px-24 py-5"
        style={{ borderBottom: "1px solid rgba(48,83,74,0.1)" }}
      >
        <span
          className="text-[10px] tracking-[0.35em] uppercase font-bold whitespace-nowrap"
          style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}
        >
          Who We Are
        </span>
        <span className="flex-1 h-px" style={{ background: "rgba(48,83,74,0.12)" }} />
      </div>

      {/* Main Grid */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-24 pt-10 pb-0 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-0 items-start">

          {/* LEFT */}
          <div
            className={`lg:pr-16 pb-10 lg:pb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "0ms", willChange: "transform, opacity" }}
          >
            <h2
              className="font-bold leading-[1.05] mb-6 text-[#0d0d0d]"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)" }}
            >
              Where Luxury
              <br />
              <span style={{ color: "#30534A" }}>Meets</span>{" "}
              <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Craft</span>
            </h2>

            <div className="relative overflow-visible rounded-2xl group" style={{ aspectRatio: "4/3" }}>
              <div className="w-full h-full overflow-hidden rounded-2xl">
                <img
                  src="/aboutUs.webp"
                  alt="Mahalaxmi Infra Premium Projects"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={600}
                />
              </div>

              <div
                className="absolute inset-0 rounded-2xl"
                style={{ background: "linear-gradient(to top, rgba(13,13,13,0.6) 0%, transparent 50%)" }}
              />

              <div
                className="absolute top-3 left-3 flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{
                  background: "rgba(48,83,74,0.92)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <Award size={13} className="text-[#C9862b]" />
                <span className="text-white font-semibold text-[11px] tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  RERA Approved
                </span>
              </div>

              <div
                className="absolute bottom-3 right-3 lg:-bottom-5 lg:-right-0 rounded-2xl px-5 py-4 text-center"
                style={{ background: "#C9862b", minWidth: "90px" }}
              >
                <div className="font-bold text-white leading-none" style={{ fontSize: "2rem", fontFamily: "'Poppins', sans-serif" }}>
                  13
                </div>
                <div className="text-white/80 text-[10px] tracking-widest uppercase mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Years
                </div>
              </div>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="hidden lg:block self-stretch" style={{ background: "rgba(48,83,74,0.1)", width: "1px" }} />

          {/* Horizontal divider (mobile) */}
          <div className="lg:hidden w-full mb-8" style={{ height: "1px", background: "rgba(48,83,74,0.1)" }} />

          {/* RIGHT */}
          <div
            className={`lg:pl-16 pb-10 lg:pb-14 lg:pt-[6.5rem] transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "150ms", willChange: "transform, opacity" }}
          >
            <p className="leading-relaxed mb-4 text-[#3a3a3a]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}>
              With over a decade of excellence in real estate development,{" "}
              <span className="font-semibold text-[#30534A]">Mahalaxmi Infra</span> is committed to creating
              architectural landmarks that blend luxury, sustainability, and innovation in the heart of Nagpur.
            </p>
            <p className="leading-relaxed mb-8 text-[#3a3a3a]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}>
              We build not just structures, but{" "}
              <span className="font-semibold text-[#C9862b]">thriving communities</span>{" "}
              where families create lasting memories.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-8">
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <div
                    key={i}
                    className="about-feature-tag flex items-center gap-2 rounded-full px-3 py-2 transition-all duration-200 hover:scale-105 cursor-default"
                    style={{
                      background: "rgba(48,83,74,0.07)",
                      border: "1px solid rgba(48,83,74,0.14)",
                    }}
                  >
                    <Icon size={12} style={{ color: "#C9862b" }} />
                    <span className="text-xs font-semibold text-[#30534A]" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {f.text}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div
                    key={i}
                    className="rounded-xl p-3 sm:p-4 flex items-center gap-3 transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background: i % 2 === 0 ? "#30534A" : "#fff",
                      border: `1px solid ${i % 2 === 0 ? "transparent" : "rgba(48,83,74,0.12)"}`,
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.12)" : "rgba(48,83,74,0.08)" }}
                    >
                      <Icon size={16} style={{ color: i % 2 === 0 ? "#C9862b" : "#30534A" }} />
                    </div>
                    <div className="min-w-0">
                      <div
                        className="font-bold leading-none"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)",
                          color: i % 2 === 0 ? "#C9862b" : "#30534A",
                        }}
                      >
                        {stat.value.toLocaleString()}
                        <span style={{ fontSize: "0.85em" }}>{stat.suffix}</span>
                      </div>
                      <div
                        className="text-[11px] mt-0.5 font-medium leading-tight"
                        style={{ color: i % 2 === 0 ? "rgba(255,255,255,0.65)" : "#888", fontFamily: "'Inter', sans-serif" }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 font-bold text-sm px-6 py-3.5 rounded-xl text-white transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #30534A, #3d6b60)",
                  boxShadow: "0 8px 24px rgba(48,83,74,0.35)",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "0.03em",
                }}
              >
                Explore Our Projects
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div
        className={`mt-0 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          transitionDelay: "400ms",
          borderTop: "1px solid rgba(48,83,74,0.1)",
          background: "#30534A",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-24 py-5 flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:justify-between">
          {trust.map((t, i) => {
            const Icon = t.icon
            return (
              <div key={i} className="flex items-center gap-2">
                <Icon size={15} style={{ color: "#C9862b" }} />
                <span className="text-white/80 text-[11px] font-semibold tracking-wide uppercase" style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: "0.1em" }}>
                  {t.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}