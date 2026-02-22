"use client"

import { useEffect, useState, useRef } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const galleryItems = [
  { id: 1,  src: "/gallery1.jpg",  alt: "Morning View",       category: "exterior"   },
  { id: 2,  src: "/gallery2.jpg",  alt: "Well Maintained Square", category: "amenities" },
  { id: 3,  src: "/gallery3.jpg",  alt: "Good Entrance",      category: "exterior"   },
  { id: 4,  src: "/gallery4.jpg",  alt: "Tree Covered",       category: "landscape"  },
  { id: 5,  src: "/gallery5.jpg",  alt: "Night View",         category: "exterior"   },
  { id: 6,  src: "/gallery6.jpg",  alt: "Cozy Living Space",  category: "interior"   },
  { id: 7,  src: "/gallery7.jpg",  alt: "Designer Interiors", category: "interior"   },
  { id: 8,  src: "/gallery8.jpg",  alt: "Premium Amenities",  category: "amenities"  },
  { id: 9,  src: "/gallery9.jpg",  alt: "Swimming Pool",      category: "amenities"  },
  { id: 10, src: "/gallery10.jpg", alt: "Evening View",       category: "exterior"   },
  { id: 11, src: "/gallery11.jpg", alt: "Playground",         category: "amenities"  },
  { id: 12, src: "/gallery12.jpg", alt: "Top View",           category: "exterior"   },
]

export function GallerySection() {
  const [selectedId, setSelectedId]   = useState<number | null>(null)
  const [isVisible, setIsVisible]     = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef   = useRef<HTMLDivElement>(null)
  const sectionRef  = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  /* ── Intersection observer ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
        }
      },
      { threshold: 0.08, rootMargin: "100px" }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  /* ── Keyboard nav for modal ── */
  useEffect(() => {
    if (selectedId === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      const idx = galleryItems.findIndex(i => i.id === selectedId)
      if (e.key === "ArrowRight") { e.preventDefault(); setSelectedId(galleryItems[(idx + 1) % galleryItems.length].id) }
      if (e.key === "ArrowLeft")  { e.preventDefault(); setSelectedId(galleryItems[(idx - 1 + galleryItems.length) % galleryItems.length].id) }
      if (e.key === "Escape")     { e.preventDefault(); setSelectedId(null) }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedId])

  const nextSlide = () => setCurrentSlide(p => (p + 1) % galleryItems.length)
  const prevSlide = () => setCurrentSlide(p => (p - 1 + galleryItems.length) % galleryItems.length)

  const navigateModal = (dir: "prev" | "next") => {
    if (selectedId === null) return
    const idx = galleryItems.findIndex(i => i.id === selectedId)
    setSelectedId(
      dir === "prev"
        ? galleryItems[(idx - 1 + galleryItems.length) % galleryItems.length].id
        : galleryItems[(idx + 1) % galleryItems.length].id
    )
  }

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative overflow-hidden"
      style={{ background: "#f7f4ef" }}     // ← was bg-white (still light, matches site cream)
    >
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(48,83,74,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Light glow accents */}
      <div className="absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(201,134,43,0.08)" }} />
      <div className="absolute bottom-40 left-20 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(48,83,74,0.07)" }} />

      {/* ── Label strip ── */}
      <div
        className="flex items-center gap-4 px-6 sm:px-16 lg:px-24 py-5 relative z-10"
        style={{ borderBottom: "1px solid rgba(48,83,74,0.1)" }}
      >
        <span
          className="text-[10px] tracking-[0.35em] uppercase font-bold"
          style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}
        >
          Gallery
        </span>
        <span className="flex-1 h-px" style={{ background: "rgba(48,83,74,0.1)" }} />
        <span
          className="text-[10px] tracking-[0.2em] uppercase font-medium"
          style={{ color: "rgba(48,83,74,0.35)", fontFamily: "'Inter', sans-serif" }}
        >
          {galleryItems.length} Photos
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-16 lg:px-24 pt-10 pb-20 relative z-10">

        {/* ── Section Header ── */}
        <div
          className={`mb-8 sm:mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span
            className="text-[10px] tracking-[0.35em] uppercase font-bold block mb-3"
            style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}
          >
            Visual Inspiration
          </span>
          <h2
            className="font-bold leading-tight"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 3.2rem)",
              color: "#0d0d0d",            // ← was text-[#30534A]
            }}
          >
            Inside Our{" "}
            <span style={{ color: "#30534A" }}>Projects</span>{" "}
            <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>
              &amp; Spaces
            </span>
          </h2>
        </div>

        {/* ════════════════════════════════
            MOBILE SLIDER (< md)
        ════════════════════════════════ */}
        <div
          className={`md:hidden mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-md">
              <div
                ref={sliderRef}
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {galleryItems.map((item) => (
                  <div key={item.id} className="min-w-full relative group">
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full object-cover"
                      style={{ height: "260px" }}
                      onClick={() => setSelectedId(item.id)}
                    />
                    <div
                      className="absolute inset-0 flex items-end p-4"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }}
                    >
                      <div>
                        <span className="text-white/70 text-[10px] uppercase tracking-widest block mb-0.5">{item.category}</span>
                        <p className="font-bold text-white text-base">{item.alt}</p>
                        <p className="text-white/50 text-xs mt-0.5">Tap to enlarge</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prev / Next */}
            <button
              onClick={prevSlide}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all z-10"
              style={{ background: "rgba(48,83,74,0.85)", backdropFilter: "blur(6px)" }}
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all z-10"
              style={{ background: "rgba(48,83,74,0.85)", backdropFilter: "blur(6px)" }}
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              {galleryItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: currentSlide === i ? "2rem" : "0.5rem",
                    background: currentSlide === i ? "#C9862b" : "rgba(48,83,74,0.25)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════
            DESKTOP MASONRY (≥ md)
        ════════════════════════════════ */}
        <div
          className={`hidden md:grid grid-cols-12 gap-4 lg:gap-5 auto-rows-[180px] transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          {/* Large feature — col 6, row 2 */}
          <GalleryTile item={galleryItems[0]} className="col-span-6 row-span-2" large onClick={() => setSelectedId(galleryItems[0].id)} />

          {/* Vertical — col 3, row 2 */}
          <GalleryTile item={galleryItems[1]} className="col-span-3 row-span-2" onClick={() => setSelectedId(galleryItems[1].id)} />

          {/* Two small — col 3, row 1 each */}
          <GalleryTile item={galleryItems[2]} className="col-span-3 row-span-1" onClick={() => setSelectedId(galleryItems[2].id)} />
          <GalleryTile item={galleryItems[3]} className="col-span-3 row-span-1" onClick={() => setSelectedId(galleryItems[3].id)} />

          {/* Wide — col 6, row 1 */}
          <GalleryTile item={galleryItems[4]} className="col-span-6 row-span-1" wide onClick={() => setSelectedId(galleryItems[4].id)} />

          {/* Remaining — col 3, row 1 */}
          {galleryItems.slice(5, 12).map((item) => (
            <GalleryTile key={item.id} item={item} className="col-span-3 row-span-1" onClick={() => setSelectedId(item.id)} />
          ))}
        </div>
      </div>

      {/* ════════════════════════════════
          LIGHTBOX MODAL
      ════════════════════════════════ */}
      {selectedId !== null && (() => {
        const active = galleryItems.find(i => i.id === selectedId)!
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            style={{ background: "rgba(13,13,13,0.92)", backdropFilter: "blur(10px)" }}
            onClick={() => setSelectedId(null)}
          >
            <div
              className="relative w-full max-w-5xl"
              style={{ maxHeight: "90vh" }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={active.src}
                alt={active.alt}
                className="w-full rounded-2xl object-contain"
                style={{ maxHeight: "80vh" }}
              />

              {/* Prev */}
              <button
                onClick={e => { e.stopPropagation(); navigateModal("prev") }}
                aria-label="Previous"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors active:scale-95"
                style={{ background: "rgba(48,83,74,0.85)", backdropFilter: "blur(6px)" }}
              >
                <ChevronLeft size={20} className="text-white" />
              </button>

              {/* Next */}
              <button
                onClick={e => { e.stopPropagation(); navigateModal("next") }}
                aria-label="Next"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors active:scale-95"
                style={{ background: "rgba(48,83,74,0.85)", backdropFilter: "blur(6px)" }}
              >
                <ChevronRight size={20} className="text-white" />
              </button>

              {/* Close */}
              <button
                onClick={() => setSelectedId(null)}
                aria-label="Close"
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors active:scale-95"
                style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)" }}
              >
                <X size={18} className="text-white" />
              </button>

              {/* Caption */}
              <div
                className="absolute bottom-3 left-3 right-3 rounded-xl px-4 py-3"
                style={{ background: "rgba(13,13,13,0.7)", backdropFilter: "blur(10px)" }}
              >
                <p className="text-white font-semibold text-sm">{active.alt}</p>
                <span
                  className="text-[10px] uppercase tracking-widest font-semibold"
                  style={{ color: "#C9862b" }}
                >
                  {active.category}
                </span>
              </div>
            </div>
          </div>
        )
      })()}
    </section>
  )
}

/* ── Reusable tile component ── */
function GalleryTile({
  item,
  className,
  large = false,
  wide  = false,
  onClick,
}: {
  item: { src: string; alt: string; category: string }
  className?: string
  large?: boolean
  wide?: boolean
  onClick: () => void
}) {
  return (
    <div
      className={`group cursor-pointer relative rounded-2xl overflow-hidden ${className}`}
      onClick={onClick}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: wide
            ? "linear-gradient(to right, rgba(0,0,0,0.55), transparent)"
            : "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)",
        }}
      />

      {/* Text */}
      <div className={`absolute ${large || wide ? "bottom-5 left-5" : "bottom-3 left-3"}`}>
        {(large || wide) && (
          <span
            className="block text-[10px] uppercase tracking-widest mb-1 font-semibold"
            style={{ color: "#C9862b" }}
          >
            {item.category}
          </span>
        )}
        <p
          className="text-white font-bold drop-shadow-lg leading-tight"
          style={{ fontSize: large ? "1.15rem" : "0.78rem" }}
        >
          {item.alt}
        </p>
      </div>

      {/* Hover zoom icon (large tile only) */}
      {large && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: "rgba(201,134,43,0.82)", backdropFilter: "blur(4px)" }}
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      )}

      {/* Bottom accent line on hover (non-large tiles) */}
      {!large && (
        <div
          className="absolute bottom-0 left-0 h-[2.5px] w-0 group-hover:w-full transition-all duration-500"
          style={{ background: "linear-gradient(90deg, #C9862b, #30534A)" }}
        />
      )}
    </div>
  )
}