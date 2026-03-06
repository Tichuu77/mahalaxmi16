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
      className="about-section relative overflow-hidden"
    >
      <style>{`
        .about-feature-tag:hover {
          background: rgba(48,83,74,0.13) !important;
          border-color: rgba(201,134,43,0.4) !important;
        }
      `}</style>

      {/* Decorative vertical stripe */}
      <div
        className="about-gradient-bar absolute top-0 left-0 bottom-0 w-1.5"
      />

      {/* Watermark */}
      <div
        className="about-watermark absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
      >
        INFRA
      </div>

      {/* Top strip */}
      <div
        className="about-header flex items-center gap-4 px-5 sm:px-10 lg:px-24 py-5"
      >
        <span
          className="about-header-label"
        >
          Who We Are
        </span>
        <span className="about-header-divider flex-1" />
      </div>

      {/* Main Grid */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-24 pt-10 pb-0 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-0 items-start">

          {/* LEFT */}
          <div
            className={`about-left lg:pr-16 pb-10 lg:pb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "0ms", willChange: "transform, opacity" }}
          >
            <h2
              className="about-title"
            >
              Where Luxury
              <br />
              <span className="about-title-highlight">Meets</span>{" "}
              <span className="about-title-outline">Craft</span>
            </h2>

            <div className="about-image-container group">
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
                className="about-image-overlay"
              />

              <div
                className="about-image-badge"
              >
                <Award size={13} className="text-[#C9862b]" />
                <span className="about-image-badge-text">
                  RERA Approved
                </span>
              </div>

              <div
                className="about-years-badge"
              >
                <div className="about-years-value">
                  13
                </div>
                <div className="about-years-label">
                  Years
                </div>
              </div>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="about-divider hidden lg:block self-stretch" />

          {/* Horizontal divider (mobile) */}
          <div className="about-divider-mobile lg:hidden w-full" />

          {/* RIGHT */}
          <div
            className={`about-right lg:pl-16 pb-10 lg:pb-14 lg:pt-[6.5rem] transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "150ms", willChange: "transform, opacity" }}
          >
            <p className="about-description">
              With over a decade of excellence in real estate development,{" "}
              <span className="about-description-highlight">Mahalaxmi Infra</span> is committed to creating
              architectural landmarks that blend luxury, sustainability, and innovation in the heart of Nagpur.
            </p>
            <p className="about-description">
              We build not just structures, but{" "}
              <span className="about-description-gold">thriving communities</span>{" "}
              where families create lasting memories.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-8">
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <div
                    key={i}
                    className="about-feature-tag"
                  >
                    <Icon size={12} className="about-feature-icon" />
                    <span className="about-feature-text">
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
                    className={`about-stat-card ${i % 2 === 0 ? "about-stat-card-dark" : "about-stat-card-light"}`}
                  >
                    <div
                      className="about-stat-card-icon-container"
                    >
                      <Icon size={16} style={{ color: i % 2 === 0 ? "#C9862b" : "#30534A" }} />
                    </div>
                    <div className="min-w-0">
                      <div
                        className="about-stat-value"
                      >
                        {stat.value.toLocaleString()}
                        <span style={{ fontSize: "0.85em" }}>{stat.suffix}</span>
                      </div>
                      <div
                        className="about-stat-label"
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
                className="about-cta group inline-flex items-center gap-2"
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
        className={`about-trust-strip mt-0 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          transitionDelay: "400ms",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-24 py-5 flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:justify-between">
          {trust.map((t, i) => {
            const Icon = t.icon
            return (
              <div key={i} className="about-trust-item">
                <Icon size={15} className="about-trust-icon" />
                <span className="about-trust-label">
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