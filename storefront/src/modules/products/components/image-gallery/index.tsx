import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { BeerSwagger } from "../beer-swagger";

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4 w-full h-auto">
        {images.map((image, i: number) => {
          return (
            <Container
              key={image.id}
              className={`relative p-0 small:py-4 w-full overflow-hidden shadow-none small:h-dvh`}
              id={image.id}
            >

              {i === 0 && image.url ? (
           
                  <BeerSwagger urlImg={image.url} />
  
              ) : image.url ? (
                <Image
                  src={image.url}
                  priority={i <= 2 ? true : false}
                  className={`absolute inset-0 rounded-rounded ${i < 1 ? "hidden" : ""}`}
                  alt={`Product image ${i + 1}`}
                  fill
                  sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              ) : null}
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
