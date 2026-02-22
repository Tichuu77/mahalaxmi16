'use client'

import { Mail, Phone, MapPin } from "lucide-react"

const navLinks = [
  { href: "#about",     label: "About"     },
  { href: "#amenities", label: "Amenities" },
  { href: "#projects",  label: "Projects"  },
  { href: "#gallery",   label: "Gallery"   },
]

const resourceLinks = [
  { href: "#user-guide",   label: "User Guide"    },
  { href: "#news",         label: "News"          },
  { href: "#testimonials", label: "Testimonials"  },
  { href: "#contact",      label: "Contact"       },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#30534A" }}
    >
      {/* ── Subtle dot texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Gold top border ── */}
      <div className="w-full h-1" style={{ background: "linear-gradient(90deg, #C9862b, #30534A 40%, #C9862b)" }} />

      {/* ── Top label strip ── */}
      <div
        className="flex items-center gap-4 pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 py-4 relative z-10"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span
          className="text-[10px] tracking-[0.35em] uppercase font-bold"
          style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}
        >
          Mahalaxmi Infra
        </span>
        <span className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
        {/* <span
          className="text-[10px] tracking-[0.2em] uppercase font-medium"
          style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Inter', sans-serif" }}
        >
          Est. 2011
        </span> */}
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-[1400px] mx-auto pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 pt-12 pb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.6fr] gap-10 lg:gap-8 mb-12">

          {/* ── Brand ── */}
          <div>
            <div className="flex items-center gap-3 mb-4 cursor-pointer">
              <img
                src="/Malaxmi-Final-Logo.-2png.png"
                alt="Mahalaxmi Infra Logo"
                className="w-16 h-16 object-contain"
              />
              <div>
                <span
                  className="font-bold text-white block leading-tight"
                  style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.05rem" }}
                >
                  Mahalaxmi Infra
                </span>
                <span
                  className="text-[10px] tracking-widest uppercase"
                  style={{ color: "#C9862b", fontFamily: "'Inter', sans-serif" }}
                >
                  Premium Real Estate
                </span>
              </div>
            </div>

            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Inter', sans-serif", maxWidth: "280px" }}
            >
              Delivering premium residential &amp; commercial plots with excellence, transparency, and innovation across Nagpur.
            </p>

            {/* RERA badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{
                background: "rgba(201,134,43,0.12)",
                border: "1px solid rgba(201,134,43,0.3)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9862b" }} />
              <span
                className="text-[11px] font-semibold"
                style={{ color: "#C9862b", fontFamily: "'Inter', sans-serif" }}
              >
                MAHA RERA NO. A50500044714
              </span>
            </div>
          </div>

          {/* ── Navigation ── */}
          <div>
            <h4
              className="font-bold text-white mb-5 text-xs uppercase tracking-[0.18em]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm flex items-center gap-2 group transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#C9862b")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    <span
                      className="block w-3 h-px transition-all duration-200 group-hover:w-5"
                      style={{ background: "#C9862b" }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Resources ── */}
          <div>
            <h4
              className="font-bold text-white mb-5 text-xs uppercase tracking-[0.18em]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm flex items-center gap-2 group transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#C9862b")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    <span
                      className="block w-3 h-px transition-all duration-200 group-hover:w-5"
                      style={{ background: "#C9862b" }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4
              className="font-bold text-white mb-5 text-xs uppercase tracking-[0.18em]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Contact
            </h4>

            {/* Name */}
            <p
              className="font-bold text-sm mb-4"
              style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Poppins', sans-serif" }}
            >
             Anil Kakde
            </p>

            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+917620760052"
                  className="flex items-center gap-3 text-sm group transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#C9862b")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(201,134,43,0.12)", border: "1px solid rgba(201,134,43,0.2)" }}
                  >
                    <Phone size={13} style={{ color: "#C9862b" }} />
                  </span>
                  +91 8999537942
                </a>
              </li>

              <li>
                <a
                  href="mailto:ketulbolane94@gmail.com"
                  className="flex items-center gap-3 text-sm group transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#C9862b")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(201,134,43,0.12)", border: "1px solid rgba(201,134,43,0.2)" }}
                  >
                    <Mail size={13} style={{ color: "#C9862b" }} />
                  </span>
                  anil.kakde2016@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}>
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(201,134,43,0.12)", border: "1px solid rgba(201,134,43,0.2)" }}
                >
                  <MapPin size={13} style={{ color: "#C9862b" }} />
                </span>
                <span className="leading-relaxed">
                  Flat No. 103, 104, Laxmivihar Apartment, Beside Hotel Airport Centre Point, Wardha Road, Somalwada, Nagpur – 440025
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif" }}
          >
            © {currentYear} Mahalaxmi Infra. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9862b" }} />
            <p
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif" }}
            >
              NMRDA Sanctioned · RERA Approved · ISO Certified
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}