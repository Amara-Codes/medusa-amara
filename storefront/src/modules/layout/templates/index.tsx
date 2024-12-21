
import React from "react"

import Footer from "@modules/layout/templates/footer"
import NavWrapper from "./nav-wrapper"
import { listRegions } from "@lib/data/regions";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const regions = await listRegions();

  return (
    <div>
      <NavWrapper regions={regions}/>
      <main className="relative">{children}</main>
      <Footer />
    </div>
  )
}

