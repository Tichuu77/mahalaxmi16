"use client"

import { useState, useCallback, useMemo, useRef, useEffect } from "react"
import {
  MapPin, Play, Award, FileText, ChevronRight, ChevronLeft,
  Download, Compass, Sparkles, X, Activity, ZoomIn
} from "lucide-react"

// Cloudinary Media constants
const VIDEO_URL = "https://res.cloudinary.com/dp53bwfcq/video/upload/v1786073179/WhatsApp_Video_2026-08-05_at_21.39.03_pqraah.mp4"

const DOCS = [
  {
    title: "Tentative Certificate",
    desc: "Official sumthana 88/164 tentative layout certification document.",
    url: "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073122/SUMTHANA_88_164_TENTIVE_CERTIFICATE_d2wcwy.pdf"
  },
  {
    title: "Revised Site Plan",
    desc: "Clubhouse layout and updated blueprint of the township.",
    url: "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073125/MAHALAXMI_CLUBHOUSE-_51_REVISED_SITE_PLAN_qrlgud.pdf"
  },
  {
    title: "Tentative Sanction Plan",
    desc: "Complete layouts, streets, and plot dimension sanctions details.",
    url: "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073130/SUMTHANA_88_164_TENTIVE_SANCTION_PLAN_oucneo.pdf"
  }
]

const IMAGES = [
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073139/WhatsApp_Image_2026-08-05_at_21.42.06_jym6gk.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073138/WhatsApp_Image_2026-08-05_at_21.42.08_xvyg9s.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073138/WhatsApp_Image_2026-08-05_at_21.42.07_obxqsn.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073138/WhatsApp_Image_2026-08-05_at_21.42.08_1_hxv9dt.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073137/WhatsApp_Image_2026-08-05_at_21.42.12_1_ypu3e0.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073137/WhatsApp_Image_2026-08-05_at_21.42.09_1_j0sdsj.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073137/WhatsApp_Image_2026-08-05_at_21.42.10_1_c6bigd.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073136/WhatsApp_Image_2026-08-05_at_21.42.09_goncqw.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073135/WhatsApp_Image_2026-08-05_at_21.42.12_2_lbjyon.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073135/WhatsApp_Image_2026-08-05_at_21.42.11_r1sqzg.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073134/WhatsApp_Image_2026-08-05_at_21.42.13_ki3byb.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073133/WhatsApp_Image_2026-08-05_at_21.42.16_1_ivo4fj.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073133/WhatsApp_Image_2026-08-05_at_21.42.13_1_gme3hu.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073133/WhatsApp_Image_2026-08-05_at_21.42.14_p5cs5b.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073132/WhatsApp_Image_2026-08-05_at_21.42.15_1_ozftpu.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073132/WhatsApp_Image_2026-08-05_at_21.42.14_2_o3b2un.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073131/WhatsApp_Image_2026-08-05_at_21.42.15_ocntgj.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073130/WhatsApp_Image_2026-08-05_at_21.42.16_b5our4.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073130/WhatsApp_Image_2026-08-05_at_21.42.17_1_rc67vt.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073126/WhatsApp_Image_2026-08-05_at_21.42.19_2_xiv0tl.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073125/WhatsApp_Image_2026-08-05_at_21.42.22_2_vonxop.jpg",
  "https://res.cloudinary.com/dp53bwfcq/image/upload/v1786073124/WhatsApp_Image_2026-08-05_at_21.42.21_1_tdt3i6.jpg"
]

const getCloudinaryThumb = (url: string) =>
  url.replace("/upload/", "/upload/f_auto,q_auto,w_240,c_fill/")

const getCloudinaryShowcase = (url: string) =>
  url.replace("/upload/", "/upload/f_auto,q_auto,w_1080/")

const getCloudinaryFullscreen = (url: string) =>
  url.replace("/upload/", "/upload/f_auto,q_auto,w_1600/")

const LANDMARKS = [
  { name: "Godrej Forest Estate", desc: "Premier forest township development directly adjacent" },
  { name: "D-Mart Samruddhi Circle", desc: "Convenient shopping complex just behind the township" },
  { name: "MIHAN Patanjali", desc: "Major commerce and logistics zone situated just besides" },
  { name: "Proposed Phase 3 Metro", desc: "Upcoming metro line connecting the circle to central Nagpur" },
  { name: "NDRF Head Office", desc: "National Disaster Response Force regional headquarters nearby" },
  { name: "GAIL & Logistic Parks", desc: "State-of-the-art office spaces and distribution hubs" },
  { name: "IBFC Hub (1710 Acres)", desc: "Upcoming International Business Finance Center project" },
  { name: "AIIMS, NCI, IIM & Info-tech Hubs", desc: "Infosys, HCL, Tech Mahindra, TCS very close" }
]

const AMENITIES = [
  { name: "Equipped Gym", cat: "clubhouse" },
  { name: "Yoga & Meditation", cat: "clubhouse" },
  { name: "Banquet Hall (2k sq.ft)", cat: "clubhouse" },
  { name: "Cozy Cafeteria", cat: "clubhouse" },
  { name: "Library & Card Room", cat: "clubhouse" },
  { name: "Indoor Kids Play", cat: "clubhouse" },
  { name: "Swimming Pool", cat: "sports" },
  { name: "Kids' Pool", cat: "sports" },
  { name: "Football Turf", cat: "sports" },
  { name: "Cricket Turf", cat: "sports" },
  { name: "Basketball Court", cat: "sports" },
  { name: "Volleyball Court", cat: "sports" },
  { name: "Pickleball Court", cat: "sports" },
  { name: "Jogging & Walking Track", cat: "sports" },
  { name: "Grand Central Lawn (25k sq.ft)", cat: "nature" },
  { name: "Pergola Seating", cat: "nature" },
  { name: "Landscaped Gardens", cat: "nature" },
  { name: "Senior Citizens Garden", cat: "nature" },
  { name: "Crèche / Day Care", cat: "utilities" },
  { name: "Dedicated Parking Area", cat: "utilities" },
  { name: "Administrative Office", cat: "utilities" },
  { name: "Sports Changing Rooms", cat: "utilities" }
]

export function Project51Section() {
  const [activeImgIndex, setActiveImgIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [activeAmenityCat, setActiveAmenityCat] = useState("all")
  const [activeMobileTab, setActiveMobileTab] = useState("gallery")
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayVideo = useCallback(() => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
        setIsVideoPlaying(false)
      } else {
        videoRef.current.play()
        setIsVideoPlaying(true)
      }
    }
  }, [isVideoPlaying])

  const nextImage = useCallback(() => {
    setActiveImgIndex(prev => (prev + 1) % IMAGES.length)
  }, [])

  const prevImage = useCallback(() => {
    setActiveImgIndex(prev => (prev - 1 + IMAGES.length) % IMAGES.length)
  }, [])

  const handleOpenDoc = useCallback((docUrl: string, docTitle: string) => {
    window.dispatchEvent(
      new CustomEvent("open-contact-popup", {
        detail: {
          project: {
            title: `Mahalaxmi Nagar 51 – ${docTitle}`,
            location: "Mouza - Sumthana, Nagpur",
            image: IMAGES[0],
            description: "78 Acres Plots Township behind D-Mart, Samruddhi Circle Nagpur."
          },
          mode: "brochure",
          documentUrl: docUrl
        }
      })
    )
  }, [])

  const handleEnquire = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent("open-contact-popup", {
        detail: {
          project: {
            title: "Mahalaxmi Nagar 51",
            location: "Mouza - Sumthana, Nagpur",
            image: IMAGES[0],
            description: "78 Acres Premium Plots Township behind D-Mart, Samruddhi Circle Nagpur."
          },
          mode: "enquiry"
        }
      })
    )
  }, [])

  const filteredAmenities = useMemo(() => {
    if (activeAmenityCat === "all") return AMENITIES
    return AMENITIES.filter(a => a.cat === activeAmenityCat)
  }, [activeAmenityCat])

  return (
    <section id="project-51" className="relative py-20 overflow-hidden bg-[#faf8f5]">
      {/* Decorative Gold & Green Background Elements */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none" style={{ background: "rgba(201,134,43,0.06)" }} />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(48,83,74,0.05)" }} />

      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Banner Badge & Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{ background: "rgba(201,134,43,0.12)", border: "1px solid rgba(201,134,43,0.3)" }}>
            <Sparkles size={13} style={{ color: "#a86a1a" }} />
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold" style={{ color: "#a86a1a", fontFamily: "'Poppins', sans-serif" }}>
              PREMIER FLAGSHIP TOWNSHIP
            </span>
          </div>

          <h2 className="font-bold text-[#0d0d0d] leading-none mb-3" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2rem, 5vw, 3.6rem)" }}>
            Mahalaxmi <span style={{ color: "#30534A" }}>Nagar 51</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed" style={{ color: "#666", fontFamily: "'Inter', sans-serif" }}>
            Experience 78 Acres of masterplanned luxury plotting township just behind D-Mart, near B4 Samruddhi Circle. Sumthana is developing as the new prime core of New Nagpur.
          </p>
        </div>

        {/* Hero Section Split Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-20">
          
          {/* LEFT: Custom Video Player */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black border border-white" style={{ aspectRatio: "16/9" }}>
              <video
                ref={videoRef}
                src={VIDEO_URL}
                poster="/project_M-51.jpeg"
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                onClick={handlePlayVideo}
              />
              {!isVideoPlaying && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 cursor-pointer transition-opacity hover:bg-black/35"
                  onClick={handlePlayVideo}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-115" style={{ background: "#C9862b", boxShadow: "0 6px 24px rgba(201,134,43,0.4)" }}>
                    <Play fill="white" size={24} className="text-white translate-x-0.5" />
                  </div>
                  <span className="mt-4 text-xs font-bold tracking-[0.2em] text-white uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Watch Virtual Tour Video
                  </span>
                </div>
              )}
              {isVideoPlaying && (
                <button
                  onClick={handlePlayVideo}
                  className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/85 text-white px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Pause
                </button>
              )}
            </div>
            
            {/* Quick stats banner below video */}
            <div className="grid grid-cols-3 gap-4 mt-6 p-4 rounded-2xl bg-[#30534A] text-white" style={{ boxShadow: "0 8px 30px rgba(48,83,74,0.15)" }}>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-extrabold" style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}>78 Acres</div>
                <div className="text-[10px] uppercase font-bold tracking-wider opacity-85">Township Size</div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-xl sm:text-2xl font-extrabold" style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}>35+</div>
                <div className="text-[10px] uppercase font-bold tracking-wider opacity-85">Modern Amenities</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-extrabold" style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}>100%</div>
                <div className="text-[10px] uppercase font-bold tracking-wider opacity-85">RERA / NMRDA</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Quick Intro & PDF Documents Downloads */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl" style={{ background: "#fff", border: "1px solid rgba(48,83,74,0.1)", boxShadow: "0 8px 32px rgba(48,83,74,0.06)" }}>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Compass size={15} style={{ color: "#C9862b" }} />
                <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}>
                  MOUZA – SUMTHANA (SAMRUDDHI CIRCLE)
                </span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0d0d0d] mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Nagpur's Core Growth Hub
              </h3>
              
              <p className="text-xs sm:text-sm leading-relaxed mb-6" style={{ color: "#555", fontFamily: "'Inter', sans-serif" }}>
                Strategically nestled in sumthana, this project sits alongside major milestones. With pre-planned wide roads, integrated amenities, and close connectivity to the international cargo hub, Nagpur's future is shaped right here.
              </p>
            </div>

            {/* Document download cards */}
            <div className="space-y-3.5 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#30534A]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Required Documents &amp; Layout Plans
              </div>
              {DOCS.map((doc, idx) => (
                <div
                  key={idx}
                  onClick={() => handleOpenDoc(doc.url, doc.title)}
                  className="group flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 bg-[#fafbfb] hover:bg-[#f6f9f8]"
                  style={{ border: "1px solid rgba(48,83,74,0.12)" }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-amber-50 group-hover:bg-amber-100 transition-colors">
                      <FileText size={18} style={{ color: "#C9862b" }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0d0d0d]" style={{ fontFamily: "'Poppins', sans-serif" }}>{doc.title}</div>
                      <div className="text-[10px]" style={{ color: "#555", fontFamily: "'Inter', sans-serif" }}>{doc.desc}</div>
                    </div>
                  </div>
                  <div className="p-1.5 rounded-full bg-white border border-gray-100 shadow-sm group-hover:scale-105 transition-transform">
                    <Download size={13} style={{ color: "#30534A" }} />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleEnquire}
              className="w-full font-bold text-sm py-4 rounded-xl text-white transition-all active:scale-95 flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #30534A, #3d6b60)",
                boxShadow: "0 6px 20px rgba(48,83,74,0.25)",
                fontFamily: "'Poppins', sans-serif",
                border: "none",
                cursor: "pointer"
              }}
            >
              Enquire For Layout Plots
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="lg:hidden flex gap-2 border-b border-gray-200/60 overflow-x-auto pb-1 mb-8 scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {[
            { id: "gallery", label: "Layout Gallery" },
            { id: "amenities", label: "Amenities (35+)" },
            { id: "landmarks", label: "Surrounding Area" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveMobileTab(tab.id)}
              className="shrink-0 px-4 py-2.5 font-bold text-xs transition-all border-b-2"
              style={{
                borderColor: activeMobileTab === tab.id ? "#30534A" : "transparent",
                color: activeMobileTab === tab.id ? "#30534A" : "#555",
                fontFamily: "'Poppins', sans-serif",
                cursor: "pointer"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Showcase Images Grid & Lightbox */}
        <div className={`mb-20 ${activeMobileTab === "gallery" ? "block" : "hidden lg:block"}`}>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="font-bold text-xl sm:text-2xl text-[#0d0d0d]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Site Layout Gallery
              </h3>
              <p className="text-xs text-[#555]" style={{ fontFamily: "'Inter', sans-serif" }}>
                Interactive view of plans, clubhouse renders, and actual sites
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevImage}
                aria-label="Previous gallery image"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-gray-200 shadow-sm hover:scale-105 active:scale-95 transition-all"
                style={{ color: "#30534A" }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextImage}
                aria-label="Next gallery image"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-gray-200 shadow-sm hover:scale-105 active:scale-95 transition-all"
                style={{ color: "#30534A" }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Main Showcase Image Area */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl bg-gray-100 group border border-gray-200/50" style={{ height: "clamp(240px, 45vw, 520px)" }}>
            <img
              src={getCloudinaryShowcase(IMAGES[activeImgIndex])}
              alt={`Mahalaxmi Nagar 51 Slide ${activeImgIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
              onClick={() => setLightboxOpen(true)}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            
            {/* Hover overlay indication */}
            <div
              onClick={() => setLightboxOpen(true)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/85 text-white p-2.5 rounded-full backdrop-blur-md cursor-pointer transition-transform hover:scale-110 flex items-center justify-center"
            >
              <ZoomIn size={15} />
            </div>

            <div className="absolute bottom-6 left-6 text-white pointer-events-none">
              <span className="text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded" style={{ background: "rgba(201,134,43,0.85)" }}>
                Image {activeImgIndex + 1} of {IMAGES.length}
              </span>
              <p className="text-xs mt-1.5 drop-shadow-md font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                Click to open fullscreen slide viewer
              </p>
            </div>
          </div>

          {/* Mini Thumbnail Row */}
          <div className="flex gap-2.5 overflow-x-auto mt-4 pb-2.5 scrollbar-thin scrollbar-thumb-gray-200" style={{ scrollbarWidth: "thin" }}>
            {IMAGES.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImgIndex(idx)}
                aria-label={`View gallery image ${idx + 1}`}
                className="shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all"
                style={{
                  borderColor: idx === activeImgIndex ? "#C9862b" : "transparent",
                  opacity: idx === activeImgIndex ? 1 : 0.6,
                }}
              >
                <img
                  src={getCloudinaryThumb(img)}
                  alt={`thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={80}
                  height={56}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Surrounding Landmark Developments */}
        <div className={`mb-20 ${activeMobileTab === "landmarks" ? "block" : "hidden lg:block"}`}>
          <div className="text-center mb-10">
            <h3 className="font-bold text-xl sm:text-2xl text-[#0d0d0d] mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              High-growth Surrounding Development
            </h3>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#555]" style={{ fontFamily: "'Inter', sans-serif" }}>
              Located right in the center of Nagpur's futuristic commercial growth corridor with robust transport links
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LANDMARKS.map((land, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#30534A]/20"
                style={{
                  border: "1px solid rgba(48,83,74,0.08)",
                  boxShadow: "0 4px 16px rgba(48,83,74,0.02)"
                }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3 bg-[#30534A]/5">
                  <MapPin size={15} style={{ color: "#30534A" }} />
                </div>
                <h4 className="font-bold text-sm text-[#0d0d0d] mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {land.name}
                </h4>
                <p className="text-[11px] leading-relaxed" style={{ color: "#666", fontFamily: "'Inter', sans-serif" }}>
                  {land.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Clubhouse & Lifestyle Amenities */}
        <div className={`p-8 sm:p-10 lg:p-12 rounded-3xl ${activeMobileTab === "amenities" ? "block" : "hidden lg:block"}`} style={{ background: "#ffffff", border: "1px solid rgba(48,83,74,0.1)", boxShadow: "0 10px 40px rgba(48,83,74,0.05)" }}>
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Activity size={14} style={{ color: "#C9862b" }} />
                <span className="text-[10px] tracking-wider uppercase font-bold text-[#C9862b]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Premium Clubhouse Living
                </span>
              </div>
              <h3 className="font-bold text-xl sm:text-3xl text-[#0d0d0d]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                35+ World-Class Amenities
              </h3>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" style={{ scrollbarWidth: "none" }}>
              {[
                { label: "All Amenities", val: "all" },
                { label: "Clubhouse", val: "clubhouse" },
                { label: "Sports & Fitness", val: "sports" },
                { label: "Parks & Greenery", val: "nature" },
                { label: "Services & Utility", val: "utilities" }
              ].map(tab => (
                <button
                  key={tab.val}
                  onClick={() => setActiveAmenityCat(tab.val)}
                  className="shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all"
                  style={{
                    background: activeAmenityCat === tab.val ? "#30534A" : "rgba(48,83,74,0.06)",
                    color: activeAmenityCat === tab.val ? "#fff" : "#30534A",
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAmenities.map((amenity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3.5 rounded-xl transition-all hover:bg-[#fafbfb]"
                style={{ border: "1px solid rgba(48,83,74,0.06)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9862b]" />
                <span className="text-xs font-semibold text-[#30534A]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {amenity.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Fullscreen Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 select-none"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close fullscreen gallery"
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 transition-all border border-white/15"
          >
            <X size={20} />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage() }}
            aria-label="Previous fullscreen image"
            className="absolute left-4 sm:left-8 w-12 h-12 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 transition-all border border-white/15"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage() }}
            aria-label="Next fullscreen image"
            className="absolute right-4 sm:right-8 w-12 h-12 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 transition-all border border-white/15"
          >
            <ChevronRight size={24} />
          </button>

          {/* Big Image Content */}
          <div
            className="relative max-w-5xl max-h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getCloudinaryFullscreen(IMAGES[activeImgIndex])}
              alt={`Fullscreen ${activeImgIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10"
              decoding="async"
            />
            
            {/* Info panel in Lightbox */}
            <div className="absolute bottom-[-45px] left-0 right-0 text-center text-white/70 text-xs font-medium">
              Image {activeImgIndex + 1} of {IMAGES.length}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
