import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
  className?: string
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  className = "",
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className={`flex gap-x-1 items-center group ${className}`}
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text className="text-koiYellow">{children}</Text>
      <ArrowUpRightMini
        className="group-hover:rotate-45 ease-in-out duration-150"
        color="#FDD50E"
      />
    </LocalizedClientLink>
  )
}

export default InteractiveLink
