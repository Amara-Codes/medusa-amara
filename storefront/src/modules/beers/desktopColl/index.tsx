import { getCollectionsList } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function DesktopCollections() {
  const { collections } = await getCollectionsList(0, 6);
  
  return (
    <div className="flex small:flex-col gap-12 pt-3.5 pb-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
      {collections && collections?.length > 0 && (
        <div>
          <span className="text-ui-fg-base uppercase font-bold font-now">
           Collections
          </span>
          <ul className="flex gap-x-3 flex-col gap-y-3 mt-4">
           
             {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
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
  )
}
