import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import Umami from "./analytics/Umami"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  openGraph: {
    title: 'Brewery in Siem Reap - Amara Beer Lab | Siem Reap’s Sustainable Craft Brewery',
    description: 'Amara Beer Lab is Siem Reap’s innovative craft brewery, renowned for its sustainable practices and the production of high-quality, culturally inspired beers',
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className="bg-koiBlack">
      <head>
        <Umami />
      </head>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
