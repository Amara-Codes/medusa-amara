import { getCollectionsList } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Accordion from "@modules/common/components/accordion";

export default async function CollectionFilter() {
  const { collections } = await getCollectionsList(0, 6);

  return (
    <div className="w-full">

      <div className="gap-12 pt-3.5 pb-4 mb-8 small:min-w-[250px] hidden small:flex small:flex-col">
        {collections && collections?.length > 0 && (
          <div>
            <span className="text-ui-fg-base uppercase font-bold font-now">
              Collections
            </span>
            <ul className="flex gap-x-3 flex-col gap-y-3 mt-4">

              {collections?.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <LocalizedClientLink
                    className="text-ui-fg-base hover:text-koiOrange"
                    href={`/collections/${c.handle}`}
                  >
                    {c.title}
                  </LocalizedClientLink>
                </li>
              ))}

            </ul>
          </div>
        )}
      </div>
      <div className="w-full flex small:hidden">
        <Accordion type="single" className="w-full">

          <Accordion.Item
            title="Collections"
            headingSize="large"
            value="Collections"
            className="w-full"
          >
            <ul className="flex gap-x-3 flex-col gap-y-3 mt-4 w-full">

              {collections?.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <LocalizedClientLink
                    className="text-ui-fg-base hover:text-koiOrange"
                    href={`/collections/${c.handle}`}
                  >
                    {c.title}
                  </LocalizedClientLink>
                </li>
              ))}

            </ul>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  )
}
