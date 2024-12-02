import React from "react";
import { IconProps } from "types/icon";

type Direction = "down" | "left" | "up" | "right";

const rotationMap: Record<Direction, number> = {
  down: 0,
  left: 90,
  up: 180,
  right: 90,
};

interface ChevronProps extends IconProps {
  direction?: Direction;
}

const Chevron: React.FC<ChevronProps> = ({
  size = "16",
  color = "currentColor",
  direction = "down", // Valore di default
  ...attributes
}) => {
  const rotation = rotationMap[direction]; // Ottieni il valore di rotazione dalla mappa
  const sign = direction === 'right' ? '-' : '';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sign}rotate-${rotation}`} // Iniettato il valore della rotazione
      {...attributes}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Chevron;
