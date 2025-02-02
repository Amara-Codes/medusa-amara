import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Brewery in Siem Reap - Amara Beer Lab | 404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-dvh bg-koiBlack relative">
      <div className="absolute opacity-50 h-dvh">

      <Image src="/images/404.png" width={1920} height={1080} alt="File not found page image" className="h-full object-cover"/>
      </div>
      <div className="absolute w-full h-full flex flex-col items-center justify-center text-center">

      <h1 className="text-6xl text-koiOrange font-fatboy mb-16">Something went wrong</h1>
      <p className="text-xl text-koiWhite font-bold mb-8">
        The page you tried to access does not exist.
      </p>
      <Link
        className="flex gap-x-1 items-baseline group"
        href="/"
      >
        <Text className="text-koiOrange text-lg">Go to homepage</Text>
        <ArrowUpRightMini
          className="group-hover:rotate-45 ease-in-out duration-500 text-koiOrange"
          color="#FF850E"
        />
      </Link>
      </div>
    </div>
  )
}
