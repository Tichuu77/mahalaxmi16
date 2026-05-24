"use client"

import { useState, useCallback, memo, useRef } from "react"
import { useRouter } from "next/navigation"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import {
  normalizePhone10,
  isBlockedOrFakePhone10,
  hasSubmittedThisPhone,
  recordSubmittedPhone,
  validateFillDuration,
} from "@/lib/form-protection"

const contacts = [
  { icon: Phone,  label: "Phone",   value: "+91 8999537942", sub: "Available Mon–Fri, 9am–6pm", href: "tel:+918999537942" },
  { icon: Mail,   label: "Email",   value: "anil.kakde2016@gmail.com", sub: "We'll respond within 24 hours", href: "mailto:anil.kakde2016@gmail.com" },
  { icon: MapPin, label: "Address", value: "Flat No. 103, 104, Laxmivihar Apartment, Beside Hotel Airport Centre Point, Wardha Road, Somalwada, Nagpur – 440025", sub: null, href: null },
]

const badges = ["Quick Response", "Free Consultation", "RERA Approved", "Transparent Process"]

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.85rem 1rem",
  background: "#ffffff",
  border: "1.5px solid rgba(48,83,74,0.22)",
  borderRadius: "0.875rem",
  color: "#0d1f1a",
  fontSize: "0.9rem",
  fontFamily: "'Inter', sans-serif",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
}

const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "#C9862b"
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,134,43,0.12)"
}
const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "rgba(48,83,74,0.22)"
  e.currentTarget.style.boxShadow = "none"
}

const Label = memo(({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label
    htmlFor={htmlFor}
    className="block mb-2 leading-snug break-words"
    style={{
      color: "#0d1f1a",
      fontFamily: "'Poppins', sans-serif",
      fontSize: "11px",
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
    }}
  >
    {children}
  </label>
))
Label.displayName = "Label"

const ContactCard = memo(({ contact, index }: { contact: typeof contacts[number]; index: number }) => {
  const Icon = contact.icon
  const inner = (
    <div
      className="flex items-start gap-4 rounded-2xl p-4 sm:p-5 group transition-all duration-250 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.99]"
      style={{
        background: index === 0 ? "#30534A" : "#ffffff",
        border: index === 0 ? "1.5px solid #30534A" : "1.5px solid rgba(48,83,74,0.18)",
        boxShadow: index === 0
          ? "0 4px 20px rgba(48,83,74,0.28)"
          : "0 2px 10px rgba(48,83,74,0.08)",
        willChange: "transform",
      }}
    >
      {/* Icon bubble */}
      <div
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={{
          background: index === 0 ? "rgba(201,134,43,0.22)" : "rgba(48,83,74,0.10)",
          border: index === 0 ? "1px solid rgba(201,134,43,0.40)" : "1px solid rgba(48,83,74,0.18)",
        }}
      >
        <Icon size={17} style={{ color: index === 0 ? "#C9862b" : "#30534A" }} />
      </div>

      <div className="min-w-0 flex-1">
        {/* Card label */}
        <p
          className="font-bold text-xs uppercase tracking-wider mb-1"
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: index === 0 ? "#C9862b" : "#30534A",
            letterSpacing: "0.12em",
          }}
        >
          {contact.label}
        </p>
        {/* Card value — white on green, near-black on white */}
        <p
          className="text-sm leading-snug break-words font-medium"
          style={{
            color: index === 0 ? "#ffffff" : "#0d1f1a",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {contact.value}
        </p>
        {contact.sub && (
          <p
            className="text-xs mt-1"
            style={{
              color: index === 0 ? "rgba(255,255,255,0.65)" : "#888",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {contact.sub}
          </p>
        )}
      </div>
    </div>
  )
  return contact.href ? <a href={contact.href} className="block">{inner}</a> : <div>{inner}</div>
})
ContactCard.displayName = "ContactCard"

const TrustBadges = memo(() => (
  <div className="grid grid-cols-2 gap-2.5">
    {badges.map((label) => (
      <div
        key={label}
        className="flex items-center gap-2 rounded-xl p-3"
        style={{
          background: "rgba(48,83,74,0.07)",
          border: "1px solid rgba(48,83,74,0.16)",
        }}
      >
        <CheckCircle size={13} style={{ color: "#C9862b", flexShrink: 0 }} />
        {/* Badge text — dark so it's readable on the pale green tint */}
        <span
          className="text-xs font-semibold"
          style={{ color: "#1a3d34", fontFamily: "'Inter', sans-serif" }}
        >
          {label}
        </span>
      </div>
    ))}
  </div>
))
TrustBadges.displayName = "TrustBadges"

type FormState = { name: string; mobile: string; lookingFor: string; interestedIn: string }
const EMPTY_FORM: FormState = { name: "", mobile: "", lookingFor: "", interestedIn: "" }
type ContactSectionProps = { sectionId?: string }
const COOLDOWN_MS = 12 * 60 * 60 * 1000
type SubmitStatus = "idle" | "error" | "rateLimit" | "spam" | "timing" | "interaction" | "phone" | "duplicatePhone"

export default function ContactSection({ sectionId = "contact" }: ContactSectionProps) {
  const router = useRouter()
  const fieldId = (field: string) => `${sectionId}-${field}`
  const [formState, setFormState] = useState<FormState>(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle")
  const [honeypot, setHoneypot] = useState("")
  const formStartedAtRef = useRef<number | null>(null)
  const humanRef = useRef(false)

  const markFormStarted = useCallback(() => {
    if (formStartedAtRef.current === null) formStartedAtRef.current = Date.now()
  }, [])

  const markHuman = useCallback(() => { humanRef.current = true }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    markFormStarted()
    markHuman()
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }, [markFormStarted, markHuman])

  const handleMobileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    markFormStarted()
    markHuman()
    const v = e.target.value.replace(/\D/g, "").slice(0, 10)
    setFormState(prev => ({ ...prev, mobile: v }))
  }, [markFormStarted, markHuman])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const alreadySubmitted = typeof window !== "undefined" && localStorage.getItem("formSubmitted") === "true"
    const submittedAt = typeof window !== "undefined" ? parseInt(localStorage.getItem("formSubmittedAt") || "0", 10) : 0
    if (alreadySubmitted && Date.now() - submittedAt < COOLDOWN_MS) {
      setSubmitStatus("rateLimit")
      setTimeout(() => setSubmitStatus("idle"), 5000)
      return
    }

    if (honeypot.trim() !== "") { setSubmitStatus("spam"); setTimeout(() => setSubmitStatus("idle"), 4000); return }
    if (!humanRef.current) { setSubmitStatus("interaction"); setTimeout(() => setSubmitStatus("idle"), 4000); return }
    if (!validateFillDuration(formStartedAtRef.current)) { setSubmitStatus("timing"); setTimeout(() => setSubmitStatus("idle"), 4000); return }

    const name = (formState.name || "").trim()
    const mobileRaw = (formState.mobile || "").trim()
    const lookingFor = (formState.lookingFor || "").trim()
    const interestedIn = (formState.interestedIn || "").trim()
    const phone10 = normalizePhone10(mobileRaw)

    if (!name || !mobileRaw || !lookingFor || !interestedIn) { setSubmitStatus("error"); setTimeout(() => setSubmitStatus("idle"), 3000); return }
    if (isBlockedOrFakePhone10(phone10)) { setSubmitStatus("phone"); setTimeout(() => setSubmitStatus("idle"), 4000); return }
    if (hasSubmittedThisPhone(phone10)) { setSubmitStatus("duplicatePhone"); setTimeout(() => setSubmitStatus("idle"), 4000); return }

    if (typeof window !== "undefined") {
      localStorage.setItem("formSubmitted", "true")
      localStorage.setItem("formSubmittedAt", String(Date.now()))
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const formData = new FormData()
      formData.append("access_key", "3582cb02-f89e-44e7-9e8a-8e4cd2ac7619")
      formData.append("name", name)
      formData.append("subject", `New Inquiry – ${lookingFor}`)
      formData.append("message", `Name: ${name}\nMobile: ${phone10}\nLooking For: ${lookingFor}\nInterested In: ${interestedIn}`)

      const res = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()

      if (res.ok && data.success) {
        recordSubmittedPhone(phone10)
        setFormState(EMPTY_FORM)
        formStartedAtRef.current = null
        humanRef.current = false
        setHoneypot("")
        if (typeof window !== "undefined") sessionStorage.setItem("hideContactPopupOnce", "true")
        router.push("/thank-you")
      } else {
        console.error("form submit failed", data)
        if (typeof window !== "undefined") { localStorage.removeItem("formSubmitted"); localStorage.removeItem("formSubmittedAt") }
        setSubmitStatus("error")
        setTimeout(() => setSubmitStatus("idle"), 3000)
      }
    } catch (err) {
      console.error("form submit error", err)
      if (typeof window !== "undefined") { localStorage.removeItem("formSubmitted"); localStorage.removeItem("formSubmittedAt") }
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }, [formState, router, honeypot])

  return (
    <section id={sectionId} className="contact-section relative overflow-x-clip overflow-y-hidden">
      <div className="contact-accent-bar absolute top-0 right-0 bottom-0 w-1" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(48,83,74,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Warm glow */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,134,43,0.07) 0%, transparent 70%)" }}
      />

      {/* Top bar */}
      <div
        className="flex items-center gap-4 pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 py-5 relative z-10"
        style={{ borderBottom: "1px solid rgba(48,83,74,0.12)" }}
      >
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "#C9862b",
          }}
        >
          Get in Touch
        </span>
        <span className="flex-1 h-px" style={{ background: "rgba(48,83,74,0.12)" }} />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "rgba(48,83,74,0.45)",
          }}
        >
          Free Consultation
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 pt-12 pb-20 relative z-10">

        {/* Section heading */}
        <div className="mb-10 sm:mb-14">
          <h2
            className="font-bold leading-tight mb-3"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 3.2rem)",
              /* Near-black base — fully legible on any light bg */
              color: "#0d1f1a",
            }}
          >
            Contact{" "}
            <span style={{ color: "#30534A" }}>Us</span>{" "}
            {/* Outlined "Today" — orange stroke on light bg */}
            <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Today</span>
          </h2>
          <p
            className="text-sm leading-relaxed max-w-md"
            style={{
              /* Boosted from #888 to #555 for better readability */
              color: "#555",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Have a question or ready to invest? We'd love to hear from you — reach out and we'll get back to you fast.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1px_1.6fr] gap-0 items-start">

          {/* ── LEFT — contact cards + trust badges ── */}
          <div className="lg:pr-14 mb-10 lg:mb-0">
            <div className="space-y-3 mb-8">
              {contacts.map((c, i) => <ContactCard key={c.label} contact={c} index={i} />)}
            </div>
            <TrustBadges />
          </div>

          {/* Divider */}
          <div
            className="hidden lg:block self-stretch"
            style={{ background: "rgba(48,83,74,0.12)", width: "1px" }}
          />

          {/* ── RIGHT — form ── */}
          <div className="lg:pl-14">
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                /* White form card — ensures all input labels/text pop */
                background: "#ffffff",
                border: "1.5px solid rgba(48,83,74,0.14)",
                boxShadow: "0 4px 24px rgba(48,83,74,0.08)",
              }}
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-5 max-w-full overflow-x-hidden"
                onPointerDownCapture={markHuman}
                onKeyDownCapture={markHuman}
                onFocusCapture={markHuman}
              >
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} />
                <input
                  type="text"
                  name="b_phone"
                  tabIndex={-1}
                  autoComplete="new-password"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden", opacity: 0 }}
                  aria-hidden="true"
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={fieldId("name")}>Name <span style={{ color: "#d93025" }}>*</span></Label>
                    <input
                      type="text"
                      id={fieldId("name")}
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                      style={inputStyle}
                      onFocus={(e) => { markFormStarted(); markHuman(); inputFocus(e) }}
                      onBlur={inputBlur}
                    />
                  </div>
                  <div>
                    <Label htmlFor={fieldId("mobile")}>Mobile Number <span style={{ color: "#d93025" }}>*</span></Label>
                    <input
                      type="tel"
                      id={fieldId("mobile")}
                      name="mobile"
                      value={formState.mobile}
                      onChange={handleMobileChange}
                      required
                      placeholder="+91 XXXXX XXXXX"
                      maxLength={10}
                      pattern="\d{10}"
                      style={inputStyle}
                      onFocus={(e) => { markFormStarted(); markHuman(); inputFocus(e) }}
                      onBlur={inputBlur}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={fieldId("lookingFor")}>Looking For <span style={{ color: "#d93025" }}>*</span></Label>
                  <select
                    id={fieldId("lookingFor")}
                    name="lookingFor"
                    value={formState.lookingFor}
                    onChange={handleChange}
                    required
                    style={{
                      ...inputStyle,
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2330534A' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      paddingRight: "2.5rem",
                      color: formState.lookingFor ? "#0d1f1a" : "#999",
                      cursor: "pointer",
                    }}
                    onFocus={(e) => { markFormStarted(); markHuman(); inputFocus(e) }}
                    onBlur={inputBlur}
                  >
                    <option value="" disabled>Select property type</option>
                    <option value="Residential Plots">Residential Plots</option>
                    <option value="Commercial Plots">Commercial Plots</option>
                    <option value="Residential & Commercial Plots">Residential &amp; Commercial Plots</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor={fieldId("interestedIn")}>Interested In (Project with Area) <span style={{ color: "#d93025" }}>*</span></Label>
                  <input
                    type="text"
                    id={fieldId("interestedIn")}
                    name="interestedIn"
                    value={formState.interestedIn}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Green Valley – 1200 sq.ft"
                    style={inputStyle}
                    onFocus={(e) => { markFormStarted(); markHuman(); inputFocus(e) }}
                    onBlur={inputBlur}
                  />
                </div>

                {/* Status messages */}
                {submitStatus === "error" && (
                  <div className="rounded-xl p-3.5 text-sm font-medium" style={{ background: "rgba(217,48,37,0.07)", border: "1px solid rgba(217,48,37,0.25)", color: "#b3261e" }}>
                    Please fill in all required fields and try again.
                  </div>
                )}
                {submitStatus === "rateLimit" && (
                  <div className="rounded-xl p-3.5 text-sm font-medium" style={{ background: "rgba(201,134,43,0.09)", border: "1px solid rgba(201,134,43,0.32)", color: "#8a5a00" }}>
                    You recently submitted an inquiry. Please try again after 12 hours.
                  </div>
                )}
                {submitStatus === "spam" && (
                  <div className="rounded-xl p-3.5 text-sm font-medium" style={{ background: "rgba(217,48,37,0.07)", border: "1px solid rgba(217,48,37,0.25)", color: "#b3261e" }}>
                    Submission could not be processed.
                  </div>
                )}
                {submitStatus === "timing" && (
                  <div className="rounded-xl p-3.5 text-sm font-medium" style={{ background: "rgba(201,134,43,0.09)", border: "1px solid rgba(201,134,43,0.32)", color: "#8a5a00" }}>
                    Please take a few seconds to complete the form before sending.
                  </div>
                )}
                {submitStatus === "interaction" && (
                  <div className="rounded-xl p-3.5 text-sm font-medium" style={{ background: "rgba(201,134,43,0.09)", border: "1px solid rgba(201,134,43,0.32)", color: "#8a5a00" }}>
                    Use the form fields or buttons to submit.
                  </div>
                )}
                {submitStatus === "phone" && (
                  <div className="rounded-xl p-3.5 text-sm font-medium" style={{ background: "rgba(217,48,37,0.07)", border: "1px solid rgba(217,48,37,0.25)", color: "#b3261e" }}>
                    Enter a valid 10-digit Indian mobile number.
                  </div>
                )}
                {submitStatus === "duplicatePhone" && (
                  <div className="rounded-xl p-3.5 text-sm font-medium" style={{ background: "rgba(201,134,43,0.09)", border: "1px solid rgba(201,134,43,0.32)", color: "#8a5a00" }}>
                    This number already submitted from this device. Call us if you need help.
                  </div>
                )}

                {/* Submit button — solid green with white text */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === "rateLimit"}
                  className="w-full flex items-center justify-center gap-2 font-bold text-sm py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: "#30534A",
                    color: "#ffffff",
                    boxShadow: "0 6px 24px rgba(48,83,74,0.32)",
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: "0.05em",
                    border: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.background = "#3d6b60"
                      e.currentTarget.style.boxShadow = "0 8px 28px rgba(48,83,74,0.40)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#30534A"
                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(48,83,74,0.32)"
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>Send Message <Send size={15} /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}