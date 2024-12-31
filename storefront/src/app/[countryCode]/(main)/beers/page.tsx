import { Metadata } from "next"
import BeersTemplate from "@modules/beers/templates"

export const metadata: Metadata = {
  title: "Brewery in Siem Reap - Amara Beer Lab | Our Beers",
  description: "Explore all of our products",
}

type Params = {
  searchParams: {
    page?: string
  }
  params: {
    countryCode: string
  }
}

export default async function StorePage({ searchParams, params }: Params) {
  const { page } = searchParams

  return (
    <BeersTemplate
      page={page}
      countryCode={params.countryCode}
    />
  )
}
