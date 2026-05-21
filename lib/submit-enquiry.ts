export type EnquiryPayload = {
  name: string
  phone: string
  lookingFor: string
  interestedIn: string
  honeypot?: string
  turnstileToken?: string
}

export type SubmitEnquiryResult =
  | { ok: true }
  | { ok: false; error: string; code?: string }

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ""
const NOTIFY_EMAIL = process.env.NEXT_PUBLIC_CONTACT_NOTIFY_EMAIL ?? ""

/**
 * Submits via Web3Forms from the browser.
 * Required for static export (`output: 'export'`) — API routes are not deployed.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<SubmitEnquiryResult> {
  if (!WEB3FORMS_ACCESS_KEY || !NOTIFY_EMAIL) {
    return {
      ok: false,
      error: "Contact form is not configured. Please call +91 8999537942.",
      code: "config",
    }
  }

  if (payload.honeypot?.trim()) {
    return { ok: false, error: "Invalid submission.", code: "spam" }
  }

  const message = [
    `Name: ${payload.name}`,
    `Mobile: +91 ${payload.phone}`,
    `Looking For: ${payload.lookingFor}`,
    `Preferred Location: ${payload.interestedIn}`,
  ].join("\n")

  const body: Record<string, string | boolean> = {
    access_key: WEB3FORMS_ACCESS_KEY,
    name: payload.name,
    email: NOTIFY_EMAIL,
    phone: `+91 ${payload.phone}`,
    subject: `New Mahalaxmi Infra Enquiry – ${payload.lookingFor}`,
    message,
    from_name: "Mahalaxmi Infra Website",
    botcheck: false,
  }

  if (payload.turnstileToken) {
    body["cf-turnstile-response"] = payload.turnstileToken
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    })

    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean
      message?: string
    }

    if (data.success) {
      return { ok: true }
    }

    return {
      ok: false,
      error:
        data.message ||
        "Could not send your enquiry. Please call +91 8999537942 or WhatsApp us.",
      code: "delivery",
    }
  } catch {
    return {
      ok: false,
      error: "Network error. Please check your connection or call +91 8999537942.",
      code: "network",
    }
  }
}
