"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    content:
      "Investing with Maha Laxmi Developers was an effortless experience. Their transparent process and clear documentation gave me full confidence. The best decision I ever made.",
    name: "Rajkumar Gharjale",
    location: "Nagpur",
    image: "/testonomials1.webp",
    rating: 5,
  },
  {
    id: 2,
    content:
      "I wanted to invest in a growing area, and plots in Nagpur Besa seemed perfect. Maha Laxmi Developers exceeded my expectations in every way. Highly recommended!",
    name: "Priya Shah",
    location: "Mumbai",
    image: "/testonomials2.jpg",
    rating: 5,
  },
  {
    id: 3,
    content:
      "Investing in residential plots with Mahalaxmi Developers was one of my best decisions. Their transparency, clear titles, and prompt assistance gave me real peace of mind.",
    name: "Karan Akojwar",
    location: "Pune",
    image: "/testonomials3.jpg",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef  = useRef<HTMLElement>(null)
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

  useEffect(() => {
    if (!autoplay) return
    const interval = setInterval(() => {
      setCurrent(p => (p + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [autoplay])

  const prev = () => { setCurrent(p => (p - 1 + testimonials.length) % testimonials.length); setAutoplay(false) }
  const next = () => { setCurrent(p => (p + 1) % testimonials.length); setAutoplay(false) }

  const active = testimonials[current]

  return (
    <section
      ref={sectionRef}
      id="testimonials"
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
      <div className="absolute top-0 right-1/3 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,134,43,0.07) 0%, transparent 70%)" }} />

      {/* ── Label strip ── */}
      <div
        className="flex items-center gap-4 pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 py-5 relative z-10"
        style={{ borderBottom: "1px solid rgba(48,83,74,0.1)" }}
      >
        <span className="text-[10px] tracking-[0.35em] uppercase font-bold" style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}>
          Testimonials
        </span>
        <span className="flex-1 h-px" style={{ background: "rgba(48,83,74,0.1)" }} />
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "rgba(48,83,74,0.35)", fontFamily: "'Inter', sans-serif" }}>
          17,000+ Happy Families
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 pt-12 pb-20 relative z-10">

        {/* ── Header ── */}
        <div
          className={`mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2
            className="font-bold leading-tight mb-3 text-[#0d0d0d]"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.75rem, 4vw, 3.2rem)" }}
          >
            Loved by{" "}
            <span style={{ color: "#30534A" }}>Our</span>{" "}
            <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Clients</span>
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "#888", fontFamily: "'Inter', sans-serif" }}>
            Real stories from families who found their dream plots with Mahalaxmi Infra.
          </p>
        </div>

        {/* ════ Desktop: split layout ════ */}
        <div
          className={`hidden lg:grid grid-cols-[1fr_1px_1fr] gap-0 items-start transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Left — active testimonial large display */}
          <div className="pr-14">
            <div
              className="rounded-2xl p-8 mb-6 relative overflow-hidden"
              style={{
                background: "#30534A",
                minHeight: "280px",
              }}
            >
              {/* Big quote watermark */}
              <Quote
                size={120}
                className="absolute -top-4 -right-4 opacity-[0.06]"
                style={{ color: "#fff" }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: active.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p
                className="leading-relaxed mb-8 italic"
                style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Inter', sans-serif", fontSize: "1.05rem" }}
              >
                "{active.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={active.image}
                  alt={active.name}
                  className="w-11 h-11 rounded-full object-cover"
                  style={{ border: "2px solid #C9862b" }}
                />
                <div>
                  <p
                    className="font-bold text-white text-sm"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {active.name}
                  </p>
                  <p className="text-xs" style={{ color: "#C9862b", fontFamily: "'Inter', sans-serif" }}>
                    {active.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                aria-label="Previous"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 hover:scale-105"
                style={{ background: "rgba(48,83,74,0.1)", border: "1px solid rgba(48,83,74,0.18)" }}
              >
                <ChevronLeft size={17} style={{ color: "#30534A" }} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrent(i); setAutoplay(false) }}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? "2rem" : "0.5rem",
                      background: i === current ? "#C9862b" : "rgba(48,83,74,0.2)",
                    }}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 hover:scale-105"
                style={{ background: "rgba(48,83,74,0.1)", border: "1px solid rgba(48,83,74,0.18)" }}
              >
                <ChevronRight size={17} style={{ color: "#30534A" }} />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="self-stretch" style={{ background: "rgba(48,83,74,0.1)", width: "1px" }} />

          {/* Right — all testimonial cards stacked */}
          <div className="pl-14 space-y-3">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => { setCurrent(i); setAutoplay(false) }}
                className="w-full text-left rounded-2xl p-5 transition-all duration-250 active:scale-[0.99]"
                style={{
                  background: i === current ? "#fff" : "rgba(48,83,74,0.03)",
                  border: i === current ? "1px solid rgba(201,134,43,0.4)" : "1px solid rgba(48,83,74,0.1)",
                  boxShadow: i === current ? "0 4px 20px rgba(48,83,74,0.1)" : "none",
                  transform: i === current ? "translateX(4px)" : "translateX(0)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                    style={{ border: i === current ? "2px solid #C9862b" : "2px solid rgba(48,83,74,0.15)" }}
                  />
                  <div>
                    <p
                      className="font-bold text-sm leading-none mb-0.5"
                      style={{ fontFamily: "'Poppins', sans-serif", color: i === current ? "#30534A" : "#555" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-[11px]" style={{ color: i === current ? "#C9862b" : "#aaa", fontFamily: "'Inter', sans-serif" }}>
                      {t.location}
                    </p>
                  </div>
                  {/* Stars */}
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} size={11} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{
                    color: i === current ? "#555" : "#aaa",
                    fontFamily: "'Inter', sans-serif",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  "{t.content}"
                </p>
              </button>
            ))}

            {/* Review summary strip */}
            <div
              className="flex items-center gap-4 rounded-2xl p-4 mt-2"
              style={{ background: "rgba(201,134,43,0.08)", border: "1px solid rgba(201,134,43,0.2)" }}
            >
              <div>
                <div
                  className="font-bold leading-none"
                  style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.8rem", color: "#C9862b" }}
                >
                  5.0
                </div>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#0d0d0d", fontFamily: "'Poppins', sans-serif" }}>
                  Average Rating
                </p>
                <p className="text-xs" style={{ color: "#888", fontFamily: "'Inter', sans-serif" }}>
                  From 17,000+ verified clients
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ════ Mobile: single card + nav ════ */}
        <div
          className={`lg:hidden transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Active card */}
          <div
            className="rounded-2xl p-6 mb-5 relative overflow-hidden"
            style={{ background: "#30534A" }}
          >
            <Quote size={80} className="absolute -top-2 -right-2 opacity-[0.07]" style={{ color: "#fff" }} />

            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: active.rating }).map((_, i) => (
                <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p
              className="leading-relaxed mb-6 italic text-sm"
              style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Inter', sans-serif" }}
            >
              "{active.content}"
            </p>

            <div className="flex items-center gap-3">
              <img
                src={active.image}
                alt={active.name}
                className="w-10 h-10 rounded-full object-cover"
                style={{ border: "2px solid #C9862b" }}
              />
              <div>
                <p className="font-bold text-white text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>{active.name}</p>
                <p className="text-xs" style={{ color: "#C9862b" }}>{active.location}</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between">
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-10 h-10 rounded-full flex items-center justify-center active:scale-95"
              style={{ background: "rgba(48,83,74,0.08)", border: "1px solid rgba(48,83,74,0.15)" }}
            >
              <ChevronLeft size={17} style={{ color: "#30534A" }} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setAutoplay(false) }}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "2rem" : "0.5rem",
                    background: i === current ? "#C9862b" : "rgba(48,83,74,0.2)",
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next"
              className="w-10 h-10 rounded-full flex items-center justify-center active:scale-95"
              style={{ background: "rgba(48,83,74,0.08)", border: "1px solid rgba(48,83,74,0.15)" }}
            >
              <ChevronRight size={17} style={{ color: "#30534A" }} />
            </button>
          </div>

          {/* Rating strip on mobile */}
          <div
            className="flex items-center gap-4 rounded-2xl p-4 mt-5"
            style={{ background: "rgba(201,134,43,0.08)", border: "1px solid rgba(201,134,43,0.2)" }}
          >
            <div>
              <div className="font-bold leading-none" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.6rem", color: "#C9862b" }}>5.0</div>
              <div className="flex gap-0.5 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: "#0d0d0d", fontFamily: "'Poppins', sans-serif" }}>Average Rating</p>
              <p className="text-xs" style={{ color: "#888", fontFamily: "'Inter', sans-serif" }}>From 17,000+ verified clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}