import { listRegions } from "@lib/data/regions";
import Footer from "@modules/layout/templates/footer"
import NavWrapper from "@modules/layout/templates/nav-wrapper"



export default async function PageLayout(props: { children: React.ReactNode }) {
   const regions = await listRegions();
  return (
    <div className="bg-ui-bg-base dark">
      <NavWrapper regions={regions}/>
      {props.children}
      <Footer />
    </div>
  )
}
