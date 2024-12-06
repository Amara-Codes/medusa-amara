import React from "react";
import { IconProps } from "types/icon";

type Direction = "left" | "right";

const rotationMap: Record<Direction, number> = {
    right: 0,
    left: 180,
};

interface ChevronProps extends IconProps {
    direction?: Direction;
}

const ThickChevron: React.FC<ChevronProps> = ({
    size = "16",
    color = "currentColor",
    direction = "right", // Valore di default
    ...attributes
}) => {
    const rotation = rotationMap[direction]; // Ottieni il valore di rotazione dalla mappa
    return (
        <svg fill={color} width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={`rotate-${rotation}`}>
        <polygon points="7.7 23.9 4.8 21.1 13.9 12 4.8 2.9 7.7 0.1 19.6 12 7.7 23.9"/>
      </svg>
    );
};

export default ThickChevron;
