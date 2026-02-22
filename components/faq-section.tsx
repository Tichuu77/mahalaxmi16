"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "What types of properties do you offer?",
    answer: "We offer a wide range of residential and commercial plots in prime locations across Nagpur, including Besa, Beltarodi, Shankarpur, Wardha Road, and more. All properties are NMRDA sanctioned and RERA approved.",
    category: "Properties",
  },
  {
    id: 2,
    question: "What is the price range for your plots?",
    answer: "Our plots start from ₹22 Lakh onwards, depending on the location, size, and amenities. We offer flexible payment plans and financing options to suit various budgets.",
    category: "Pricing",
  },
  {
    id: 3,
    question: "Are all your projects RERA approved?",
    answer: "Yes, all our projects are 100% RERA approved and NMRDA sanctioned. We ensure complete legal compliance and transparency in all our dealings.",
    category: "Legal",
  },
  {
    id: 4,
    question: "What financing options are available?",
    answer: "We offer multiple financing options including bank loans, in-house payment plans, and EMI facilities. Our team will help you choose the best option based on your financial situation.",
    category: "Finance",
  },
  {
    id: 5,
    question: "How can I schedule a site visit?",
    answer: "You can schedule a site visit by contacting us through our website, calling our helpline, or using the WhatsApp button. Our team will confirm your visit within 24 hours and provide all necessary details.",
    category: "Visits",
  },
  {
    id: 6,
    question: "What amenities are included?",
    answer: "Our properties come with world-class amenities including 24/7 security, power backup, green spaces, community halls, and more. Specific amenities vary by project location.",
    category: "Amenities",
  },
]

const categories = ["all", "properties", "pricing", "legal", "finance"]

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1)
  const [filter, setFilter] = useState("all")
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

  const filtered = filter === "all"
    ? faqs
    : faqs.filter(f => f.category.toLowerCase() === filter)

  return (
    <section
      ref={sectionRef}
      id="faq"
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
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,134,43,0.07) 0%, transparent 70%)" }} />

      {/* ── Label strip ── */}
      <div
        className="flex items-center gap-4 pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 py-5 relative z-10"
        style={{ borderBottom: "1px solid rgba(48,83,74,0.1)" }}
      >
        <span className="text-[10px] tracking-[0.35em] uppercase font-bold" style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}>
          FAQ
        </span>
        <span className="flex-1 h-px" style={{ background: "rgba(48,83,74,0.1)" }} />
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "rgba(48,83,74,0.35)", fontFamily: "'Inter', sans-serif" }}>
          {faqs.length} Questions
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 pt-12 pb-20 relative z-10">

        {/* ── Header ── */}
        <div
          className={`mb-10 sm:mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <h2
                className="font-bold leading-tight mb-3 text-[#0d0d0d]"
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.75rem, 4vw, 3.2rem)" }}
              >
                Frequently{" "}
                <span style={{ color: "#30534A" }}>Asked</span>{" "}
                <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Questions</span>
              </h2>
              <p className="text-sm leading-relaxed max-w-md" style={{ color: "#888", fontFamily: "'Inter', sans-serif" }}>
                Find answers to common questions about our properties, pricing, and services.
              </p>
            </div>

            {/* Filter tabs — scrollable on mobile */}
            <div
              className="flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible pb-1 sm:pb-0"
              style={{ scrollbarWidth: "none" } as any}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all duration-250 active:scale-95"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    background: filter === cat ? "#30534A" : "rgba(48,83,74,0.07)",
                    color: filter === cat ? "#fff" : "#30534A",
                    border: filter === cat ? "1px solid #30534A" : "1px solid rgba(48,83,74,0.15)",
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Two-column layout (desktop) / single col (mobile) ── */}
        <div className="grid lg:grid-cols-[1fr_1px_360px] gap-0 items-start">

          {/* ════ LEFT — FAQ accordion ════ */}
          <div
            className={`lg:pr-14 space-y-3 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {filtered.length === 0 ? (
              <p className="text-sm py-10 text-center" style={{ color: "#aaa", fontFamily: "'Inter', sans-serif" }}>
                No questions in this category yet.
              </p>
            ) : (
              filtered.map((faq, i) => {
                const isOpen = openId === faq.id
                return (
                  <div
                    key={faq.id}
                    className="rounded-2xl overflow-hidden transition-all duration-300"
                    style={{
                      background: isOpen ? "#fff" : "rgba(48,83,74,0.02)",
                      border: isOpen ? "1px solid rgba(201,134,43,0.35)" : "1px solid rgba(48,83,74,0.1)",
                      boxShadow: isOpen ? "0 4px 20px rgba(48,83,74,0.09)" : "none",
                      transform: isOpen ? "translateX(4px)" : "translateX(0)",
                    }}
                  >
                    {/* Trigger */}
                    <button
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="w-full flex items-start gap-3 sm:gap-4 text-left transition-colors duration-200 active:scale-[0.99]"
                      style={{ padding: "1rem 1.25rem" }}
                    >
                      {/* Number */}
                      <span
                        className="font-bold tabular-nums shrink-0 leading-none mt-0.5 transition-colors duration-200"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "0.95rem",
                          color: isOpen ? "#C9862b" : "rgba(48,83,74,0.2)",
                          minWidth: "28px",
                        }}
                      >
                        {String(faq.id).padStart(2, "0")}
                      </span>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-bold leading-snug transition-colors duration-200"
                          style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "0.92rem",
                            color: isOpen ? "#30534A" : "#0d0d0d",
                          }}
                        >
                          {faq.question}
                        </p>
                        {/* Category pill */}
                        <span
                          className="inline-block mt-1.5 text-[10px] font-semibold rounded-full px-2.5 py-0.5"
                          style={{
                            background: isOpen ? "rgba(201,134,43,0.1)" : "rgba(48,83,74,0.07)",
                            color: isOpen ? "#a86a1a" : "#888",
                            fontFamily: "'Inter', sans-serif",
                            border: isOpen ? "1px solid rgba(201,134,43,0.2)" : "1px solid rgba(48,83,74,0.12)",
                          }}
                        >
                          {faq.category}
                        </span>
                      </div>

                      {/* Chevron */}
                      <ChevronDown
                        size={16}
                        className="shrink-0 mt-1 transition-transform duration-300"
                        style={{
                          color: isOpen ? "#C9862b" : "rgba(48,83,74,0.3)",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </button>

                    {/* Answer */}
                    <div
                      style={{
                        maxHeight: isOpen ? "300px" : "0px",
                        overflow: "hidden",
                        transition: "max-height 0.35s ease",
                      }}
                    >
                      <div
                        className="flex gap-3"
                        style={{
                          padding: "0 1.25rem 1.1rem 3.5rem",
                          borderTop: "1px solid rgba(48,83,74,0.08)",
                          paddingTop: "0.9rem",
                        }}
                      >
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: "rgba(201,134,43,0.1)", border: "1px solid rgba(201,134,43,0.2)" }}
                        >
                          <MessageCircle size={11} style={{ color: "#C9862b" }} />
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "#555", fontFamily: "'Inter', sans-serif" }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* ── Vertical divider ── */}
          <div className="hidden lg:block self-stretch" style={{ background: "rgba(48,83,74,0.1)", width: "1px" }} />

          {/* ════ RIGHT — sticky CTA panel (desktop) ════ */}
          <div
            className={`hidden lg:flex lg:pl-14 flex-col gap-5 transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Still have questions */}
            <div
              className="rounded-2xl p-7"
              style={{ background: "#30534A" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(201,134,43,0.2)", border: "1px solid rgba(201,134,43,0.3)" }}
              >
                <HelpCircle size={20} style={{ color: "#C9862b" }} />
              </div>
              <h3
                className="font-bold mb-2 text-white"
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.2rem" }}
              >
                Still have questions?
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif" }}>
                Our team is here to help you with personalised assistance — reach out anytime.
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    const el = document.getElementById("contact")
                    if (el) el.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-xl text-white transition-all duration-250 hover:scale-[1.02] active:scale-95"
                  style={{
                    background: "#C9862b",
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: "0.04em",
                  }}
                >
                  Contact Us
                </button>
                <a
                  href="tel:+918999537942"
                  className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-xl transition-all duration-250 hover:scale-[1.02] active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: "0.04em",
                  }}
                >
                  Call Now
                </a>
              </div>
            </div>

            {/* Quick stats */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "#fff", border: "1px solid rgba(48,83,74,0.1)", boxShadow: "0 2px 10px rgba(48,83,74,0.05)" }}
            >
              <p
                className="text-[10px] uppercase tracking-wider font-bold mb-4"
                style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}
              >
                Why trust us
              </p>
              {[
                { stat: "13+",   label: "Years of Experience" },
                { stat: "100%",  label: "RERA Approved Projects" },
                { stat: "17K+",  label: "Happy Families" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-3"
                  style={{ borderBottom: i < 2 ? "1px solid rgba(48,83,74,0.07)" : "none" }}
                >
                  <span
                    className="font-bold leading-none"
                    style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem", color: "#C9862b", minWidth: "52px" }}
                  >
                    {s.stat}
                  </span>
                  <span className="text-xs" style={{ color: "#888", fontFamily: "'Inter', sans-serif" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile CTA (below accordion) ── */}
        <div
          className={`lg:hidden mt-8 transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: "#30534A" }}
          >
            <h3
              className="font-bold mb-2 text-white"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }}
            >
              Still have questions?
            </h3>
            <p className="text-xs leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif" }}>
              Our team is here to help you with personalised assistance.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const el = document.getElementById("contact")
                  if (el) el.scrollIntoView({ behavior: "smooth" })
                }}
                className="flex-1 font-bold text-sm py-3 rounded-xl text-white transition-all active:scale-95"
                style={{ background: "#C9862b", fontFamily: "'Poppins', sans-serif" }}
              >
                Contact Us
              </button>
              <a
                href="tel:+918999537942"
                className="flex-1 font-bold text-sm py-3 rounded-xl text-center transition-all active:scale-95"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}