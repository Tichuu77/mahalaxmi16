"use client"

import { Turnstile } from "@marsidev/react-turnstile"

export function turnstileSiteKeyConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
}

type Props = {
  onSuccess: (token: string) => void
  onExpire?: () => void
}

export function ContactTurnstile({ onSuccess, onExpire }: Props) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  if (!siteKey) return null

  return (
    <div className="flex justify-center min-h-[65px] items-center">
      <Turnstile siteKey={siteKey} onSuccess={onSuccess} onExpire={onExpire} />
    </div>
  )
}
