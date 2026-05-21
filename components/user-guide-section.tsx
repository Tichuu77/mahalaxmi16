"use client"

import { ChevronDown, Home, Calendar, Briefcase, CheckCircle } from "lucide-react"
import { useState, useEffect, useRef, useCallback, memo } from "react"

// Static data at module level
const guides = [
  {
    number: "01",
    title: "Call or Enquire Online",
    description: "Contact Mahalaxmi Infra on +91 8999537942 or submit the enquiry form. Our team responds within 2 hours.",
    icon: Home,
    details: [
      "Share your budget and preferred location",
      "Get guidance on the right Mahalaxmi Infra project",
      "Free consultation with no obligation",
    ],
  },
  {
    number: "02",
    title: "Book Your Free Site Visit",
    description: "Visit any Mahalaxmi Infra Nagpur project with our dedicated site visit team.",
    icon: Calendar,
    details: [
      "See the actual plot, layout, and surroundings",
      "Visit confirmed within 24 hours",
      "Pick-up arranged on request",
    ],
  },
  {
    number: "03",
    title: "Choose Plot & Finalise Booking",
    description: "Select your preferred plot and review the price list, payment plans, and bank finance options.",
    icon: Briefcase,
    details: [
      "Transparent pricing — no hidden costs",
      "Up to 90% bank loan assistance",
      "Clear documentation from day one",
    ],
  },
  {
    number: "04",
    title: "Registration & Possession",
    description: "Complete documentation, register your plot, and receive possession with full legal support.",
    icon: CheckCircle,
    details: [
      "End-to-end support through every legal step",
      "RERA & NMRDA approved clear titles",
      "Possession with Mahalaxmi Developer Pvt Ltd",
    ],
  },
]

const tips = [
  { emoji: "📞", label: "Quick Response", text: "Call +91 8999537942 — our team responds within 2 hours on working days." },
  { emoji: "🏦", label: "Bank Finance",   text: "Up to 90% loan from SBI, HDFC, ICICI, and all major banks — we assist with paperwork." },
  { emoji: "✅", label: "RERA Approved",  text: "Every project is MAHA RERA registered (No. A50500044714) and NMRDA sanctioned." },
]

// Detail list — shared between accordion + right panel
const DetailList = memo(({ details, size = "sm" }: { details: string[]; size?: "sm" | "xs" }) => (
  <ul className={size === "sm" ? "space-y-3" : "space-y-2"}>
    {details.map((d, i) => (
      <li key={i} className="flex items-start gap-2.5">
        <span
          className={`${size === "sm" ? "w-5 h-5" : "w-4 h-4"} rounded-full flex items-center justify-center shrink-0 mt-0.5`}
          style={{ background: "rgba(201,134,43,0.1)", border: "1px solid rgba(201,134,43,0.25)" }}
        >
          {size === "sm"
            ? <CheckCircle size={11} style={{ color: "#C9862b" }} />
            : <span className="w-1 h-1 rounded-full" style={{ background: "#C9862b", display: "block" }} />
          }
        </span>
        <span className={`${size === "sm" ? "text-sm" : "text-xs"} leading-relaxed`} style={{ color: size === "sm" ? "#555" : "#666", fontFamily: "'Inter', sans-serif" }}>
          {d}
        </span>
      </li>
    ))}
  </ul>
))
DetailList.displayName = "DetailList"

// Right panel active step display
const ActiveStepPanel = memo(({ guide }: { guide: typeof guides[number] }) => {
  const Icon = guide.icon
  return (
    <div className="rounded-2xl p-8 mb-6" style={{ background: "rgba(48,83,74,0.04)", border: "1px solid rgba(48,83,74,0.1)" }}>
      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "#30534A" }}>
          <Icon size={24} style={{ color: "#C9862b" }} />
        </div>
        <span className="font-bold tabular-nums" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "4rem", lineHeight: 1, color: "rgba(48,83,74,0.08)" }}>
          {guide.number}
        </span>
      </div>
      <h3 className="font-bold mb-2 text-[#0d0d0d]" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.4rem" }}>
        {guide.title}
      </h3>
      <p className="text-sm leading-relaxed mb-6" style={{ color: "#777", fontFamily: "'Inter', sans-serif" }}>
        {guide.description}
      </p>
      <DetailList details={guide.details} size="sm" />
    </div>
  )
})
ActiveStepPanel.displayName = "ActiveStepPanel"

// Single accordion step
const GuideStep = memo(({ guide, index, isOpen, onToggle }: {
  guide: typeof guides[number]
  index: number
  isOpen: boolean
  onToggle: (i: number) => void
}) => {
  const Icon = guide.icon
  const handleClick = useCallback(() => onToggle(index), [onToggle, index])

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        border: isOpen ? "1px solid rgba(201,134,43,0.4)" : "1px solid rgba(48,83,74,0.1)",
        background: isOpen ? "#fff" : "rgba(48,83,74,0.02)",
        boxShadow: isOpen ? "0 6px 24px rgba(48,83,74,0.1)" : "none",
      }}
    >
      <button
        onClick={handleClick}
        className="w-full flex items-center gap-4 text-left transition-all duration-200 active:scale-[0.99]"
        style={{ padding: "1rem 1.25rem" }}
      >
        <span
          className="font-bold tabular-nums shrink-0 leading-none transition-colors duration-200"
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.4rem", color: isOpen ? "#C9862b" : "rgba(48,83,74,0.2)", minWidth: "36px" }}
        >
          {guide.number}
        </span>

        <div
          className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{ background: isOpen ? "#30534A" : "rgba(48,83,74,0.08)", border: isOpen ? "1px solid #30534A" : "1px solid rgba(48,83,74,0.14)" }}
        >
          <Icon size={16} style={{ color: isOpen ? "#C9862b" : "#30534A" }} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold leading-tight mb-0.5 transition-colors duration-200"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.95rem", color: isOpen ? "#30534A" : "#0d0d0d" }}>
            {guide.title}
          </h3>
          <p className="leading-relaxed" style={{ color: "#999", fontFamily: "'Inter', sans-serif", fontSize: "0.78rem" }}>
            {guide.description}
          </p>
        </div>

        <ChevronDown
          size={16}
          className="shrink-0 transition-transform duration-300"
          style={{ color: isOpen ? "#C9862b" : "rgba(48,83,74,0.3)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div style={{ maxHeight: isOpen ? "200px" : "0px", overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <div style={{ padding: "0.85rem 1.25rem 1.1rem 4.75rem", borderTop: "1px solid rgba(48,83,74,0.08)" }}>
          <DetailList details={guide.details} size="xs" />
        </div>
      </div>
    </div>
  )
})
GuideStep.displayName = "GuideStep"

// Tips grid
const TipsGrid = memo(() => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
    {tips.map((tip, i) => (
      <div
        key={i}
        className="rounded-2xl p-5 flex flex-col gap-3"
        style={{
          background: i === 0 ? "#30534A" : "#fff",
          border: i === 0 ? "1px solid #30534A" : "1px solid rgba(48,83,74,0.1)",
          boxShadow: "0 2px 8px rgba(48,83,74,0.06)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{tip.emoji}</span>
          <span className="font-bold text-xs uppercase tracking-wider"
            style={{ fontFamily: "'Poppins', sans-serif", color: i === 0 ? "#C9862b" : "#30534A" }}>
            {tip.label}
          </span>
        </div>
        <p className="text-sm leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif", color: i === 0 ? "rgba(255,255,255,0.7)" : "#777" }}>
          {tip.text}
        </p>
      </div>
    ))}
  </div>
))
TipsGrid.displayName = "TipsGrid"

/* ── Section ── */
export function UserGuideSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef  = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleToggle = useCallback((i: number) => {
    setExpandedIndex(prev => prev === i ? null : i)
  }, [])

  const handleStepClick = useCallback((i: number) => {
    setExpandedIndex(i)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="user-guide"
      className="user-guide-section relative overflow-hidden"
    >
      {/* Right accent stripe */}
      <div className="absolute top-0 right-0 bottom-0 w-1"
        style={{ background: "linear-gradient(to bottom, #30534A, #C9862b, #30534A)" }} />

      {/* Dot texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(48,83,74,0.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,134,43,0.06) 0%, transparent 70%)" }} />

      {/* Label strip */}
      <div className="flex items-center gap-4 pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 py-5 relative z-10"
        style={{ borderBottom: "1px solid rgba(48,83,74,0.1)" }}>
        <span className="text-[10px] tracking-[0.35em] uppercase font-bold" style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}>Easy Process</span>
        <span className="flex-1 h-px" style={{ background: "rgba(48,83,74,0.1)" }} />
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "rgba(48,83,74,0.35)", fontFamily: "'Inter', sans-serif" }}>Book in 4 Steps</span>
      </div>

      <div className="max-w-[1400px] mx-auto pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 pt-12 pb-20 relative z-10">

        {/* Header */}
        <div className={`mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ willChange: "transform, opacity" }}>
          <h2 className="font-bold leading-tight mb-3 text-[#0d0d0d]"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.75rem, 4vw, 3.2rem)" }}>
            How to Book a{" "}
            <span style={{ color: "#30534A" }}>Mahalaxmi</span>{" "}
            <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Infra Plot</span>
          </h2>
          <p className="text-sm leading-relaxed max-w-lg" style={{ color: "#777", fontFamily: "'Inter', sans-serif" }}>
            From first call to possession — Mahalaxmi Developers makes the entire journey simple and transparent.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-0 items-start">

          {/* LEFT — accordion */}
          <div className={`lg:pr-14 space-y-3 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ willChange: "transform, opacity" }}>
            {guides.map((guide, i) => (
              <GuideStep
                key={guide.number}
                guide={guide}
                index={i}
                isOpen={expandedIndex === i}
                onToggle={handleToggle}
              />
            ))}
          </div>

          {/* Vertical divider */}
          <div className="hidden lg:block self-stretch" style={{ background: "rgba(48,83,74,0.1)", width: "1px" }} />

          {/* RIGHT — active step panel */}
          <div className={`hidden lg:flex lg:pl-14 flex-col justify-start pt-1 transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ willChange: "transform, opacity" }}>
            {expandedIndex !== null && (
              <ActiveStepPanel key={expandedIndex} guide={guides[expandedIndex]} />
            )}

            {/* Progress indicators */}
            <div className="flex items-center gap-3">
              {guides.map((g, i) => (
                <button
                  key={g.number}
                  onClick={() => handleStepClick(i)}
                  className="flex-1 h-1.5 rounded-full transition-all duration-300 active:scale-95"
                  style={{ background: expandedIndex === i ? "linear-gradient(90deg, #C9862b, #30534A)" : "rgba(48,83,74,0.12)" }}
                  aria-label={`Step ${g.number}`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1.5">
              {guides.map((g, i) => (
                <span key={g.number} className="text-[10px] font-bold"
                  style={{ fontFamily: "'Poppins', sans-serif", color: expandedIndex === i ? "#C9862b" : "rgba(48,83,74,0.25)" }}>
                  {g.number}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className={`mt-10 sm:mt-14 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ willChange: "transform, opacity" }}>
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-6 h-px" style={{ background: "#C9862b" }} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}>Quick Tips</span>
          </div>
          <TipsGrid />
        </div>
      </div>
    </section>
  )
}