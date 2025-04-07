'use client'

import Script from 'next/script'

export default function Umami() {
  return (
    <Script
      strategy="afterInteractive"
      src="https://umami-production-0c7c.up.railway.app/script.js"
      data-website-id="022b991e-53ec-42f3-b8a3-7b4a0a94d545"
    />
  )
}