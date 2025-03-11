import { Text } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export default async function ProductPreview({
  product,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  const placeholderStyles: string[] = [
    "Bold and Tasty",
    "Refreshing and Citric",
    "Smooth and Balanced",
    "Hoppy and Aromatic",
    "Rich and Malty",
    "Crisp and Clean",
    "Spicy and Complex",
    "Fruity and Vibrant",
    "Dark and Roasty",
    "Light and Zesty"
  ];
  
  const extractBeerStyle = (json: string = ""): string => {
    try {
      // Verifica se la stringa JSON è vuota
      if (!json.length) {
        throw new Error("JSON string is empty");
      }
  
      // Decodifica il JSON
      const data = JSON.parse(json);
  
      // Verifica se l'oggetto decodificato è valido e contiene la chiave "Beer style"
      if (data && typeof data === "object" && "Beer style" in data) {
        const beerStyle = data["Beer style"];
  
        // Verifica se il valore di "Beer style" è una stringa non vuota
        if (typeof beerStyle === "string" && beerStyle.trim().length > 0) {
          return beerStyle.trim(); // Restituisce il valore pulito
        }
      }
  
      // Se qualcosa non va, restituisci un placeholder casuale
      throw new Error("Invalid or missing 'Beer style'");
    } catch (error) {
      // Gestione dell'errore in TypeScript (error è di tipo unknown)
      if (error instanceof Error) {
        console.error("Error extracting beer style:", error.message);
      } else {
        console.error("Unknown error occurred:", error);
      }
      return placeholderStyles[Math.floor(Math.random() * placeholderStyles.length)];
    }
  };

  if (!pricedProduct) {
    return null
  }


  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div className="bg-black/30 rounded-lg" data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="can-label"
          className="bg-trasparent shadow-none"
          objectFit="contain"
        />

        <div className="p-4">
          <Text className="text-koiOrange text-2xl sm:text-3xl font-bold text-nowrap font-fatboy" data-testid="product-title">
            {product.title}
          </Text>
          <p className="text-koiYellow text-end">{extractBeerStyle(product.subtitle ?? "")}</p>
        </div>

      </div>
    </LocalizedClientLink>
  )
}
