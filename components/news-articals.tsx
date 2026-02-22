"use client"

import { useState, useEffect, useRef } from "react"
import { Calendar, User, ChevronDown, ChevronUp } from "lucide-react"

const newsArticles = [
  {
    id: 1,
    title: "Mahalaxmi Launches New Luxury Residential Complex",
    excerpt:
      "Introducing our latest project featuring smart homes and sustainable living spaces in the heart of the city.",
    fullContent:
      "The Mahalaxmi Luxury Residential Complex marks a new milestone in sustainable architecture. Each unit is designed with eco-conscious materials, smart home integration, and green terraces for a natural lifestyle. Residents can enjoy modern amenities, lush gardens, and easy access to urban hotspots. This launch redefines urban luxury with purpose and sustainability at its core.",
    date: "March 15, 2025",
    author: "Mahalaxmi Team",
    category: "Project Launch",
    image: "/luxury-residential-complex.png",
  },
  {
    id: 2,
    title: "Sustainable Development: Our Commitment to Green Living",
    excerpt:
      "Learn how Mahalaxmi Infra is pioneering eco-friendly construction practices and green spaces.",
    fullContent:
      "At Mahalaxmi Infra, sustainability isn't just a trend — it's a commitment. From solar energy integration to rainwater harvesting, every project embraces green building standards. Our mission is to create living spaces that harmonize with nature while minimizing carbon footprint, offering a healthier and cleaner future for generations to come.",
    date: "March 10, 2025",
    author: "Sustainability Team",
    category: "Sustainability",
    image: "/green-sustainable-residential-development.jpg",
  },
  {
    id: 3,
    title: "Customer Success Story: From Dream to Reality",
    excerpt:
      "Meet the families who found their perfect home with Mahalaxmi. Read their inspiring stories.",
    fullContent:
      "For many families, Mahalaxmi projects have turned their dream homes into reality. Our customer-first approach ensures personalised experiences — from choosing the right floor plan to post-possession support. Their heartfelt testimonials remind us why we build not just homes, but lifelong happiness.",
    date: "March 5, 2025",
    author: "Marketing Team",
    category: "Success Stories",
    image: "/happy-family-new-home.jpg",
  },
]

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Project Launch":  { bg: "rgba(48,83,74,0.1)",   text: "#30534A", border: "rgba(48,83,74,0.2)"   },
  "Sustainability":  { bg: "rgba(34,197,94,0.09)",  text: "#16a34a", border: "rgba(34,197,94,0.2)"  },
  "Success Stories": { bg: "rgba(201,134,43,0.1)",  text: "#a86a1a", border: "rgba(201,134,43,0.25)" },
}

export default function NewsArticles() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [isVisible, setIsVisible]   = useState(false)
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedId(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const toggleExpand = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedId(prev => (prev === id ? null : id))
  }

  /* Featured = first article, rest = remaining two */
  const [featured, ...rest] = newsArticles

  return (
    <section
      ref={sectionRef}
      id="news"
      className="relative overflow-hidden"
      style={{ background: "#fff" }}
    >
      {/* Right accent stripe */}
      <div
        className="absolute top-0 right-0 bottom-0 w-1"
        style={{ background: "linear-gradient(to bottom, #30534A, #C9862b, #30534A)" }}
      />

      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(48,83,74,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow */}
      <div className="absolute top-0 left-1/3 w-[450px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,134,43,0.06) 0%, transparent 70%)" }} />

      {/* ── Label strip ── */}
      <div
        className="flex items-center gap-4 pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 py-5 relative z-10"
        style={{ borderBottom: "1px solid rgba(48,83,74,0.1)" }}
      >
        <span className="text-[10px] tracking-[0.35em] uppercase font-bold" style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}>
          Latest Updates
        </span>
        <span className="flex-1 h-px" style={{ background: "rgba(48,83,74,0.1)" }} />
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "rgba(48,83,74,0.35)", fontFamily: "'Inter', sans-serif" }}>
          News &amp; Articles
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
            News{" "}
            <span style={{ color: "#30534A" }}>&amp;</span>{" "}
            <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Articles</span>
          </h2>
          <p className="text-sm leading-relaxed max-w-md" style={{ color: "#888", fontFamily: "'Inter', sans-serif" }}>
            Stay updated with the latest news, project launches, and insights from Mahalaxmi Infra.
          </p>
        </div>

        {/* ════════════════════════════════
            DESKTOP — featured + side stack
        ════════════════════════════════ */}
        <div
          className={`hidden lg:grid grid-cols-[1.4fr_1fr] gap-5 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Featured card */}
          <article
            className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{
              background: "#fff",
              border: expandedId === featured.id ? "1px solid rgba(201,134,43,0.4)" : "1px solid rgba(48,83,74,0.1)",
              boxShadow: "0 2px 12px rgba(48,83,74,0.06)",
            }}
          >
            {/* Image */}
            <div className="relative overflow-hidden" style={{ height: "260px" }}>
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)" }} />

              {/* Featured label */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span
                  className="text-[10px] font-bold tracking-widest uppercase rounded-full px-3 py-1"
                  style={{ background: "rgba(255,255,255,0.92)", color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}
                >
                  ★ Featured
                </span>
              </div>

              {/* Category */}
              {(() => {
                const c = CATEGORY_COLORS[featured.category] ?? CATEGORY_COLORS["Project Launch"]
                return (
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] font-bold tracking-wider uppercase rounded-full px-3 py-1"
                      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, fontFamily: "'Inter', sans-serif", backdropFilter: "blur(6px)", background: "rgba(255,255,255,0.9)" }}>
                      {featured.category}
                    </span>
                  </div>
                )
              })()}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <h3
                className="font-bold mb-3 leading-snug text-[#0d0d0d] group-hover:text-[#30534A] transition-colors duration-200"
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.15rem" }}
              >
                {featured.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#666", fontFamily: "'Inter', sans-serif" }}>
                {featured.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 mb-4 pb-4" style={{ borderBottom: "1px solid rgba(48,83,74,0.08)" }}>
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} style={{ color: "#C9862b" }} />
                  <span className="text-xs" style={{ color: "#aaa", fontFamily: "'Inter', sans-serif" }}>{featured.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User size={12} style={{ color: "#C9862b" }} />
                  <span className="text-xs" style={{ color: "#aaa", fontFamily: "'Inter', sans-serif" }}>{featured.author}</span>
                </div>
              </div>

              {/* Read more */}
              <button
                onClick={e => toggleExpand(featured.id, e)}
                className="flex items-center gap-1.5 font-bold text-xs transition-colors duration-200 active:scale-95 self-start"
                style={{ color: expandedId === featured.id ? "#C9862b" : "#30534A", fontFamily: "'Poppins', sans-serif", letterSpacing: "0.05em" }}
              >
                {expandedId === featured.id ? <><ChevronUp size={14} /> Show Less</> : <><ChevronDown size={14} /> Read More</>}
              </button>

              {/* Expanded */}
              <div style={{ maxHeight: expandedId === featured.id ? "300px" : "0px", overflow: "hidden", transition: "max-height 0.35s ease" }}>
                <p className="text-sm leading-relaxed mt-4 pt-4" style={{ color: "#555", fontFamily: "'Inter', sans-serif", borderTop: "1px solid rgba(48,83,74,0.07)" }}>
                  {featured.fullContent}
                </p>
              </div>
            </div>

            {/* Bottom accent */}
            <div className="h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(90deg, #C9862b, #30534A)" }} />
          </article>

          {/* Side stack — two smaller cards */}
          <div className="flex flex-col gap-5">
            {rest.map((article) => {
              const isOpen = expandedId === article.id
              return (
                <article
                  key={article.id}
                  className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background: "#fff",
                    border: isOpen ? "1px solid rgba(201,134,43,0.4)" : "1px solid rgba(48,83,74,0.1)",
                    boxShadow: "0 2px 8px rgba(48,83,74,0.05)",
                    flex: 1,
                  }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: "140px" }}>
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%)" }} />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] font-bold tracking-wider uppercase rounded-full px-2.5 py-1"
                        style={{ background: "rgba(255,255,255,0.9)", color: "#30534A", fontFamily: "'Inter', sans-serif" }}>
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3
                      className="font-bold mb-2 leading-snug text-[#0d0d0d] group-hover:text-[#30534A] transition-colors duration-200"
                      style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-xs leading-relaxed mb-3 flex-1" style={{ color: "#777", fontFamily: "'Inter', sans-serif",
                      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-3 pb-3" style={{ borderBottom: "1px solid rgba(48,83,74,0.07)" }}>
                      <div className="flex items-center gap-1">
                        <Calendar size={11} style={{ color: "#C9862b" }} />
                        <span className="text-[11px]" style={{ color: "#bbb", fontFamily: "'Inter', sans-serif" }}>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={11} style={{ color: "#C9862b" }} />
                        <span className="text-[11px]" style={{ color: "#bbb", fontFamily: "'Inter', sans-serif" }}>{article.author}</span>
                      </div>
                    </div>

                    <button
                      onClick={e => toggleExpand(article.id, e)}
                      className="flex items-center gap-1 font-bold text-xs transition-colors duration-200 active:scale-95 self-start"
                      style={{ color: isOpen ? "#C9862b" : "#30534A", fontFamily: "'Poppins', sans-serif", letterSpacing: "0.05em" }}
                    >
                      {isOpen ? <><ChevronUp size={12} /> Show Less</> : <><ChevronDown size={12} /> Read More</>}
                    </button>

                    <div style={{ maxHeight: isOpen ? "300px" : "0px", overflow: "hidden", transition: "max-height 0.35s ease" }}>
                      <p className="text-xs leading-relaxed mt-3 pt-3" style={{ color: "#555", fontFamily: "'Inter', sans-serif", borderTop: "1px solid rgba(48,83,74,0.07)" }}>
                        {article.fullContent}
                      </p>
                    </div>
                  </div>

                  <div className="h-[2.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(90deg, #C9862b, #30534A)" }} />
                </article>
              )
            })}
          </div>
        </div>

        {/* ════════════════════════════════
            MOBILE — single column
        ════════════════════════════════ */}
        <div
          className={`lg:hidden space-y-4 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {newsArticles.map((article) => {
            const isOpen = expandedId === article.id
            return (
              <article
                key={article.id}
                className="group rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: "#fff",
                  border: isOpen ? "1px solid rgba(201,134,43,0.4)" : "1px solid rgba(48,83,74,0.1)",
                  boxShadow: "0 2px 8px rgba(48,83,74,0.05)",
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: "180px" }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)" }} />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-bold tracking-wider uppercase rounded-full px-2.5 py-1"
                      style={{ background: "rgba(255,255,255,0.9)", color: "#30534A", fontFamily: "'Inter', sans-serif" }}>
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3
                    className="font-bold mb-2 leading-snug text-[#0d0d0d]"
                    style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.95rem" }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "#777", fontFamily: "'Inter', sans-serif" }}>
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3 pb-3" style={{ borderBottom: "1px solid rgba(48,83,74,0.07)" }}>
                    <div className="flex items-center gap-1">
                      <Calendar size={11} style={{ color: "#C9862b" }} />
                      <span className="text-[11px]" style={{ color: "#bbb", fontFamily: "'Inter', sans-serif" }}>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={11} style={{ color: "#C9862b" }} />
                      <span className="text-[11px]" style={{ color: "#bbb", fontFamily: "'Inter', sans-serif" }}>{article.author}</span>
                    </div>
                  </div>

                  <button
                    onClick={e => toggleExpand(article.id, e)}
                    className="flex items-center gap-1 font-bold text-xs active:scale-95"
                    style={{ color: isOpen ? "#C9862b" : "#30534A", fontFamily: "'Poppins', sans-serif" }}
                  >
                    {isOpen ? <><ChevronUp size={12} /> Show Less</> : <><ChevronDown size={12} /> Read More</>}
                  </button>

                  <div style={{ maxHeight: isOpen ? "300px" : "0px", overflow: "hidden", transition: "max-height 0.35s ease" }}>
                    <p className="text-xs leading-relaxed mt-3 pt-3" style={{ color: "#555", fontFamily: "'Inter', sans-serif", borderTop: "1px solid rgba(48,83,74,0.07)" }}>
                      {article.fullContent}
                    </p>
                  </div>
                </div>

                <div className="h-[2.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, #C9862b, #30534A)" }} />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}