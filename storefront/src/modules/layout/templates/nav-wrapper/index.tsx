"use client";

import React, { useEffect, useState } from "react";
import NavClient from "@modules/layout/templates/nav-client";
import { StoreRegion } from "@medusajs/types";

const NavWrapper: React.FC<{ regions: StoreRegion[] }> = ({ regions }) => {
  const [isVisible, setIsVisible] = useState(true); // Inizia visibile
  const [lastScrollY, setLastScrollY] = useState(0);
  const threshold = 15; // Soglia minima di movimento per cambiare stato

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Evita oscillazioni: Cambia stato solo se la variazione supera la soglia
      if (Math.abs(currentScrollY - lastScrollY) < threshold) {
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`sticky top-0 inset-x-0 z-50 group transition-transform duration-700 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <NavClient regions={regions} />
    </div>
  );
};

export default NavWrapper;
