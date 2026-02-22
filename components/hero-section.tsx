"use client"

import { useEffect, useState } from "react"
import { ArrowRight, MapPin, Award, TrendingUp } from "lucide-react"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-stretch overflow-hidden bg-[#f7f4ef]">

      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpeg"
          alt="Mahalaxmi Infra background"
          className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(1.0) saturate(1.0)" }}
        />
      </div>

      {/* ── Subtle bottom-to-top vignette for depth only ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 40%)",
        }}
      />

      {/* ── Thin gold vertical rule (desktop only) ── */}
      <div
        className="hidden lg:block absolute top-0 bottom-0 z-[3]"
        style={{
          left: "50%",
          width: "1px",
          background:
            "linear-gradient(to bottom, transparent 0%, #C9862b 30%, #C9862b 70%, transparent 100%)",
          opacity: 0.35,
        }}
      />

      {/* ── Noise / grain texture ── */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.025,
        }}
      />

      {/* ── Main layout grid ── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto grid lg:grid-cols-2 items-center px-6 sm:px-10 lg:px-16 py-28 sm:py-32 gap-10 lg:gap-0">

        {/* ════ LEFT COLUMN — Text ════ */}
        <div className="flex flex-col justify-center">

          {/* Eyebrow label */}
          <div
            className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "0ms" }}
          >
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="block w-10 h-px" style={{ background: "#C9862b" }} />
              <span
                className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold"
                style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}
              >
                NMRDA Sanctioned · RERA Approved
              </span>
            </div>
          </div>

          {/* Headline */}
          <div
            className={`transition-all duration-600 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "80ms" }}
          >
            <h1
              className="font-bold leading-[1.05] mb-5 sm:mb-6"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(2.2rem, 4.5vw, 4.2rem)",
                color: "#ffffff",
                textShadow: "0 2px 8px rgba(0,0,0,0.4)",
              }}
            >
              Build Your
              <br />
              <span
                style={{
                  WebkitTextStroke: "1.5px #C9862b",
                  color: "transparent",
                }}
              >
                Dream Home
              </span>
              <br />
              With{" "}
              <span
                className="relative inline-block"
                style={{ color: "#C9862b" }}
              >
                Mahalaxmi
                <span
                  className="absolute left-0 bottom-0 w-full"
                  style={{
                    height: "3px",
                    background: "linear-gradient(90deg, #C9862b, #30534A)",
                    borderRadius: "99px",
                  }}
                />
              </span>{" "}
              <span style={{ color: "#30534A" }}>Infra</span>
            </h1>
          </div>

          {/* Sub-heading */}
          <div
            className={`transition-all duration-600 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "160ms" }}
          >
            <p
              className="mb-6 sm:mb-8 leading-relaxed max-w-lg"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
                color: "#ffffff",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              Residential &amp; Commercial Plots in the Heart of Nagpur —
              crafted for those who invest in more than just land.
            </p>
          </div>

          {/* Location pill */}
          <div
            className={`transition-all duration-600 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "240ms" }}
          >
            <div
              className="flex items-start gap-3 mb-8 sm:mb-10 max-w-lg rounded-xl p-4"
              style={{
                background: "rgba(13,13,13,0.35)",
                border: "1px solid rgba(201,134,43,0.35)",
              }}
            >
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#C9862b" }} />
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif", color: "#f0ede8" }}
              >
                <span className="font-semibold" style={{ color: "#f5c06a" }}>Prime Locations: </span>
                Besa, Beltarodi, Shankarpur, Wardha Road, Jamtha, Katol Road,
                Umred Road, Koradi Road &amp; Samruddhi Circle Nagpur
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div
            className={`transition-all duration-600 flex flex-wrap gap-3 mb-8 sm:mb-10 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "320ms" }}
          >
            <button
              onClick={() => handleScrollToSection("contact")}
              className="group flex items-center gap-2 font-bold text-sm px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-white transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #30534A, #3d6b60)",
                boxShadow: "0 8px 30px rgba(48,83,74,0.35)",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "0.03em",
              }}
            >
              Contact Us Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => handleScrollToSection("projects")}
              className="font-bold text-sm px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.6)",
                color: "#ffffff",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "0.03em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#C9862b"
                e.currentTarget.style.color = "#C9862b"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(48,83,74,0.4)"
                e.currentTarget.style.color = "#30534A"
              }}
            >
              Explore Projects
            </button>
          </div>

          {/* Investment highlight */}
          <div
            className={`transition-all duration-600 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "400ms" }}
          >
            <div
              className="inline-flex items-center gap-2.5 rounded-full py-2.5 px-5"
              style={{
                background: "rgba(201,134,43,0.1)",
                border: "1px solid rgba(201,134,43,0.3)",
              }}
            >
              <TrendingUp className="w-4 h-4 shrink-0" style={{ color: "#C9862b" }} />
              <span
                className="text-xs font-semibold tracking-wide"
                style={{ color: "#a86a1a", fontFamily: "'Poppins', sans-serif" }}
              >
                Best Investment @ ₹22 Lakh on Samruddhi Circle
              </span>
            </div>
          </div>
        </div>

        {/* ════ RIGHT COLUMN — Floating stats card (desktop) ════ */}
        <div className="hidden lg:flex flex-col items-end justify-end pb-10 pr-4">
          <div
            className={`transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: "500ms" }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.88)",
                border: "1px solid rgba(201,134,43,0.2)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                minWidth: "280px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
              }}
            >
              {/* Header strip */}
              <div
                className="flex items-center gap-2.5 px-6 py-4"
                style={{ borderBottom: "1px solid rgba(201,134,43,0.12)" }}
              >
                <Award className="w-4 h-4" style={{ color: "#C9862b" }} />
                <span
                  className="text-[11px] tracking-[0.2em] uppercase font-semibold"
                  style={{ color: "#666", fontFamily: "'Poppins', sans-serif" }}
                >
                  Certified Excellence
                </span>
              </div>

              {/* Stat rows */}
              {[
                { value: "70+",     label: "Completed Projects", color: "#C9862b" },
                { value: "17,000+", label: "Happy Clients",      color: "#C9862b" },
                { value: "100%",    label: "RERA Approved",      color: "#C9862b" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-6 py-5"
                  style={{
                    borderBottom: i < 2 ? "1px solid rgba(201,134,43,0.08)" : "none",
                  }}
                >
                  <span
                    className="font-bold"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "1.85rem",
                      lineHeight: 1,
                      color: stat.color,
                      minWidth: "90px",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-sm leading-snug"
                    style={{ color: "#444", fontFamily: "'Inter', sans-serif" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════ Mobile stats (below text) ════ */}
        <div
          className={`lg:hidden grid grid-cols-3 gap-2 sm:gap-3 -mt-2 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "460ms" }}
        >
          {[
            { value: "70+",  label: "Projects"      },
            { value: "17K+", label: "Happy Clients" },
            { value: "100%", label: "RERA Approved" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-xl p-3 sm:p-4 text-center"
              style={{
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(201,134,43,0.15)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="font-bold text-xl sm:text-2xl mb-0.5"
                style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}
              >
                {stat.value}
              </div>
              <div
                className="text-[10px] sm:text-xs"
                style={{ color: "#555", fontFamily: "'Inter', sans-serif" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className={`absolute bottom-8 left-10 z-10 transition-all duration-700 hidden lg:flex flex-col items-center gap-2 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "700ms" }}
      >
        <span
          className="text-[10px] tracking-[0.25em] uppercase"
          style={{ writingMode: "vertical-rl", fontFamily: "'Inter', sans-serif", color: "rgba(48,83,74,0.4)" }}
        />
        <div
          className="w-px h-12"
          style={{
            background: "linear-gradient(to bottom, rgba(201,134,43,0.6), transparent)",
          }}
        />
      </div>
    </section>
  )
}