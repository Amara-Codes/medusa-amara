import { Metadata } from "next"
import SecretGiftTemplate from "@modules/secret-gift/templates"

export const metadata: Metadata = {
  title: "Brewery in Siem Reap - Amara Beer Lab | Secret Gift",
  description: "The QR code led you here—your secret gift has been unlocked. Well done on the hunt!",
  robots: "noindex, nofollow"
}


export default async function SecretGiftPage() {

  return (
    <div>
      <SecretGiftTemplate />
    </div>
  )
}
