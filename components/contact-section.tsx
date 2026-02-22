"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    if (!formState.name || !formState.email || !formState.subject || !formState.message) {
      setSubmitStatus("error")
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 3000)
      return
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "7f9c82b1-3848-4df4-a314-4a85a3346b4a",
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitStatus("success")
        setFormState({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
        setTimeout(() => setSubmitStatus("idle"), 3000)
      }
    } catch (error) {
      console.error(error)
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  const contacts = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8999537942",
      sub: "Available Mon–Fri, 9am–6pm",
      href: "tel:+918999537942",
    },
    {
      icon: Mail,
      label: "Email",
      value: "anil.kakde2016@gmail.com",
      sub: "We'll respond within 24 hours",
      href: "mailto:anil.kakde2016@gmail.com",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "Flat No. 103, 104, Laxmivihar Apartment, Beside Hotel Airport Centre Point, Wardha Road, Somalwada, Nagpur – 440025",
      sub: null,
      href: null,
    },
  ]

  /* shared input style */
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.8rem 1rem",
    background: "rgba(48,83,74,0.04)",
    border: "1px solid rgba(48,83,74,0.18)",
    borderRadius: "0.875rem",
    color: "#0d0d0d",
    fontSize: "0.9rem",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
  }

  return (
    <section
      id="contact"
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

      {/* Glow accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,134,43,0.06) 0%, transparent 70%)" }} />

      {/* ── Label strip ── */}
      <div
        className="flex items-center gap-4 pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 py-5 relative z-10"
        style={{ borderBottom: "1px solid rgba(48,83,74,0.1)" }}
      >
        <span className="text-[10px] tracking-[0.35em] uppercase font-bold" style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}>
          Get in Touch
        </span>
        <span className="flex-1 h-px" style={{ background: "rgba(48,83,74,0.1)" }} />
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "rgba(48,83,74,0.35)", fontFamily: "'Inter', sans-serif" }}>
          Free Consultation
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 pt-12 pb-20 relative z-10">

        {/* ── Header ── */}
        <div className="mb-10 sm:mb-14">
          <h2
            className="font-bold leading-tight mb-3 text-[#0d0d0d]"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.75rem, 4vw, 3.2rem)" }}
          >
            Contact{" "}
            <span style={{ color: "#30534A" }}>Us</span>{" "}
            <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Today</span>
          </h2>
          <p className="text-sm leading-relaxed max-w-md" style={{ color: "#888", fontFamily: "'Inter', sans-serif" }}>
            Have a question or ready to invest? We'd love to hear from you — reach out and we'll get back to you fast.
          </p>
        </div>

        {/* ── Two-column grid ── */}
        <div className="grid lg:grid-cols-[1fr_1px_1.6fr] gap-0 items-start">

          {/* ════ LEFT — contact info ════ */}
          <div className="lg:pr-14 mb-10 lg:mb-0">

            {/* Contact cards */}
            <div className="space-y-3 mb-8">
              {contacts.map((c, i) => {
                const Icon = c.icon
                const inner = (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-2xl p-4 sm:p-5 group transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
                    style={{
                      background: i === 0 ? "#30534A" : "#fff",
                      border: i === 0 ? "1px solid #30534A" : "1px solid rgba(48,83,74,0.12)",
                      boxShadow: "0 2px 8px rgba(48,83,74,0.06)",
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{
                        background: i === 0 ? "rgba(201,134,43,0.2)" : "rgba(48,83,74,0.08)",
                        border: i === 0 ? "1px solid rgba(201,134,43,0.3)" : "1px solid rgba(48,83,74,0.14)",
                      }}
                    >
                      <Icon size={17} style={{ color: i === 0 ? "#C9862b" : "#30534A" }} />
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <p
                        className="font-bold text-xs uppercase tracking-wider mb-1"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          color: i === 0 ? "#C9862b" : "#30534A",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {c.label}
                      </p>
                      <p
                        className="text-sm leading-snug break-words"
                        style={{ color: i === 0 ? "rgba(255,255,255,0.85)" : "#444", fontFamily: "'Inter', sans-serif" }}
                      >
                        {c.value}
                      </p>
                      {c.sub && (
                        <p className="text-xs mt-1" style={{ color: i === 0 ? "rgba(255,255,255,0.4)" : "#bbb", fontFamily: "'Inter', sans-serif" }}>
                          {c.sub}
                        </p>
                      )}
                    </div>
                  </div>
                )

                return c.href ? (
                  <a key={i} href={c.href} className="block">{inner}</a>
                ) : (
                  <div key={i}>{inner}</div>
                )
              })}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: CheckCircle, label: "Quick Response" },
                { icon: CheckCircle, label: "Free Consultation" },
                { icon: CheckCircle, label: "RERA Approved" },
                { icon: CheckCircle, label: "Transparent Process" },
              ].map((b, i) => {
                const Icon = b.icon
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-xl p-3"
                    style={{ background: "rgba(48,83,74,0.05)", border: "1px solid rgba(48,83,74,0.1)" }}
                  >
                    <Icon size={13} style={{ color: "#C9862b", flexShrink: 0 }} />
                    <span className="text-xs font-semibold" style={{ color: "#555", fontFamily: "'Inter', sans-serif" }}>
                      {b.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Vertical divider ── */}
          <div className="hidden lg:block self-stretch" style={{ background: "rgba(48,83,74,0.1)", width: "1px" }} />

          {/* ════ RIGHT — form ════ */}
          <div className="lg:pl-14">
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background: "rgba(48,83,74,0.03)",
                border: "1px solid rgba(48,83,74,0.1)",
              }}
            >
              {submitStatus === "success" ? (
                /* ── Success state ── */
                <div className="py-14 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "#30534A" }}
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3
                    className="font-bold mb-2 text-[#0d0d0d]"
                    style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-sm" style={{ color: "#888", fontFamily: "'Inter', sans-serif" }}>
                    We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="from_name" value="Contact Form Website" />
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                  {/* Label helper */}
                  {(() => {
                    const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
                      <label
                        htmlFor={htmlFor}
                        className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                        style={{ color: "#30534A", fontFamily: "'Poppins', sans-serif", letterSpacing: "0.1em" }}
                      >
                        {children}
                      </label>
                    )

                    return (
                      <>
                        {/* Name + Email row */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Full Name <span style={{ color: "#e55" }}>*</span></Label>
                            <input
                              type="text" id="name" name="name"
                              value={formState.name} onChange={handleChange} required
                              placeholder="John Doe"
                              style={inputStyle}
                              onFocus={e => (e.currentTarget.style.borderColor = "#C9862b")}
                              onBlur={e => (e.currentTarget.style.borderColor = "rgba(48,83,74,0.18)")}
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email Address <span style={{ color: "#e55" }}>*</span></Label>
                            <input
                              type="email" id="email" name="email"
                              value={formState.email} onChange={handleChange} required
                              placeholder="john@example.com"
                              style={inputStyle}
                              onFocus={e => (e.currentTarget.style.borderColor = "#C9862b")}
                              onBlur={e => (e.currentTarget.style.borderColor = "rgba(48,83,74,0.18)")}
                            />
                          </div>
                        </div>

                        {/* Subject */}
                        <div>
                          <Label htmlFor="subject">Subject <span style={{ color: "#e55" }}>*</span></Label>
                          <input
                            type="text" id="subject" name="subject"
                            value={formState.subject} onChange={handleChange} required
                            placeholder="How can we help you?"
                            style={inputStyle}
                            onFocus={e => (e.currentTarget.style.borderColor = "#C9862b")}
                            onBlur={e => (e.currentTarget.style.borderColor = "rgba(48,83,74,0.18)")}
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <Label htmlFor="message">Message <span style={{ color: "#e55" }}>*</span></Label>
                          <textarea
                            id="message" name="message"
                            value={formState.message} onChange={handleChange} required
                            rows={5} placeholder="Tell us about your inquiry..."
                            style={{ ...inputStyle, resize: "none" }}
                            onFocus={e => (e.currentTarget.style.borderColor = "#C9862b")}
                            onBlur={e => (e.currentTarget.style.borderColor = "rgba(48,83,74,0.18)")}
                          />
                        </div>
                      </>
                    )
                  })()}

                  {/* Error */}
                  {submitStatus === "error" && (
                    <div
                      className="flex items-start gap-2 rounded-xl p-3.5 text-sm"
                      style={{ background: "rgba(229,85,85,0.07)", border: "1px solid rgba(229,85,85,0.25)", color: "#c44" }}
                    >
                      <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Please fill in all required fields and try again.
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 font-bold text-sm py-4 rounded-xl text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{
                      background: "linear-gradient(135deg, #30534A, #3d6b60)",
                      boxShadow: "0 6px 20px rgba(48,83,74,0.28)",
                      fontFamily: "'Poppins', sans-serif",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}