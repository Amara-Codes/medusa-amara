import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="h-[100dvh] w-full relative bg-ui-bg-subtle"
    style={{
      backgroundImage: "url('/images/hero.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      top: "-120px"
    }}
    >
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-6xl leading-10 text-ui-fg-base font-normal"
          >
           Amara
          </Heading>
          <Heading
            level="h2"
            className="text-4xl leading-10 text-ui-fg-subtle font-normal"
          >
            Beer Lab
          </Heading>
        </span>

      </div>
    </div>
  )
}

export default Hero
