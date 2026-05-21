import { NextResponse } from "next/server"
import { Resend } from "resend"

const WEB3FORMS_ACCESS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY || "3ce8f80e-4346-40e1-9502-b1d434ec2be5"
const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || "anil.kakde2016@gmail.com"

type Body = {
  name?: string
  phone?: string
  lookingFor?: string
  interestedIn?: string
  honeypot?: string
  turnstileToken?: string
}

function normalizePhone10(input: string): string {
  const d = input.replace(/\D/g, "")
  return d.length >= 10 ? d.slice(-10) : d
}

async function sendViaWeb3Forms(body: {
  name: string
  phone: string
  lookingFor: string
  interestedIn: string
}) {
  const message = [
    `Name: ${body.name}`,
    `Mobile: +91 ${body.phone}`,
    `Looking For: ${body.lookingFor}`,
    `Preferred Location: ${body.interestedIn}`,
  ].join("\n")

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      name: body.name,
      email: NOTIFY_EMAIL,
      phone: `+91 ${body.phone}`,
      subject: `New Mahalaxmi Infra Enquiry – ${body.lookingFor}`,
      message,
      from_name: "Mahalaxmi Infra Website",
      botcheck: false,
    }),
  })

  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string }
  return { ok: Boolean(data.success), message: data.message }
}

async function sendViaResend(body: {
  name: string
  phone: string
  lookingFor: string
  interestedIn: string
}) {
  const apiKey = process.env.RESEND_API_KEY || "re_qBbqYpjv_MGVbXuumshB5BNMSxWawpkwh"
  if (!apiKey) return { ok: false, message: "Resend not configured" }

  const resend = new Resend(apiKey)
  const html = `
    <h2>New enquiry from Mahalaxmi Infra website</h2>
    <p><strong>Name:</strong> ${body.name}</p>
    <p><strong>Mobile:</strong> +91 ${body.phone}</p>
    <p><strong>Looking for:</strong> ${body.lookingFor}</p>
    <p><strong>Preferred location:</strong> ${body.interestedIn}</p>
  `

  const { error } = await resend.emails.send({
    from: "Mahalaxmi Infra <onboarding@resend.dev>",
    to: NOTIFY_EMAIL,
    subject: `New enquiry – ${body.lookingFor}`,
    html,
  })

  return { ok: !error, message: error?.message }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body

    if (body.honeypot?.trim()) {
      return NextResponse.json({ success: false, error: "Invalid submission.", code: "spam" }, { status: 400 })
    }

    const name = body.name?.trim()
    const phone = normalizePhone10(body.phone || "")
    const lookingFor = body.lookingFor?.trim()
    const interestedIn = body.interestedIn?.trim()

    if (!name || !phone || !lookingFor || !interestedIn) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields.", code: "validation" },
        { status: 400 }
      )
    }

    if (phone.length !== 10 || !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { success: false, error: "Enter a valid 10-digit Indian mobile number.", code: "phone" },
        { status: 400 }
      )
    }

    const payload = { name, phone, lookingFor, interestedIn }

    const resendResult = await sendViaResend(payload)
    if (resendResult.ok) {
      return NextResponse.json({ success: true })
    }

    const web3 = await sendViaWeb3Forms(payload)
    if (web3.ok) {
      return NextResponse.json({ success: true })
    }

    console.error("Enquiry delivery failed:", { web3: web3.message, resend: resendResult.message })

    return NextResponse.json(
      {
        success: false,
        error: "Could not send your enquiry right now. Please call +91 8999537942.",
        code: "delivery",
      },
      { status: 502 }
    )
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json(
      { success: false, error: "Server error. Please try again or call +91 8999537942.", code: "server" },
      { status: 500 }
    )
  }
}
