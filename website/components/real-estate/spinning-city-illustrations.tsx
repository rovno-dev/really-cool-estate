"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCity } from "@/providers/city-provider";

const cityOrder = ["moscow", "kazan", "st-petersburg", "sochi"];

// Position offsets in degrees relative to the top (0 deg)
const cityBaseAngles: Record<string, number> = {
  "moscow": 0,
  "kazan": 90,
  "st-petersburg": 180,
  "sochi": 270,
};

export function SpinningCityIllustrations() {
  const { city } = useCity();
  const [rotation, setRotation] = useState(0);
  const prevCityRef = useRef(city.slug);

  useEffect(() => {
    // Determine the baseline destination target angle depending on screen size
    // Desktop (md+) targets the LEFT position (270 deg)
    // Mobile (<md) targets the TOP position (0 deg)
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const targetDockAngle = isDesktop ? 270 : 0;

    if (prevCityRef.current !== city.slug) {
      const currentBase = cityBaseAngles[prevCityRef.current] ?? 0;
      const nextBase = cityBaseAngles[city.slug] ?? 0;

      // Calculate how much the city itself changed position
      let delta = nextBase - currentBase;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      // Rotate the parent wheel in the opposite direction (-delta) 
      // so the next city moves into the target dock position
      setRotation(prev => prev - delta);
      prevCityRef.current = city.slug;
    } else {
      // Handle initial load dock placement alignment
      const initialBase = cityBaseAngles[city.slug] ?? 0;
      setRotation(targetDockAngle - initialBase);
    }
  }, [city.slug]);

  return (
    <div
      className="relative flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        transform: `rotate(${rotation}deg)`,
        width: '450px',
        height: '450px'
      }}
    >
      {/* MOSCOW (Top Baseline) */}
      <div className="absolute w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 flex items-center justify-center -translate-y-[140px] sm:-translate-y-[180px] lg:-translate-y-[220px]">
        <div
          className="w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] max-md:!transform-none"
          style={{ transform: `rotate(${-rotation}deg)` }}
        >
          <Image
            className="w-full h-full object-contain"
            width={600} height={600}
            src={"/images/moscow-illustration.png"}
            alt="Moscow"
          />
        </div>
      </div>

      {/* KAZAN (Right Baseline) */}
      <div className="absolute w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 flex items-center justify-center translate-x-[140px] sm:translate-x-[180px] lg:translate-x-[220px]">
        <div
          className="w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] max-md:rotate-90"
          style={{ transform: `rotate(${-rotation}deg)` }}
        >
          <Image
            className="w-full h-full object-contain"
            width={600} height={600}
            src={"/images/kazan-illustration.png"}
            alt="Kazan"
          />
        </div>
      </div>

      {/* SAINT PETERSBURG (Bottom Baseline) */}
      <div className="absolute w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 flex items-center justify-center translate-y-[140px] sm:translate-y-[180px] lg:translate-y-[220px]">
        <div
          className="w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] max-md:rotate-180"
          style={{ transform: `rotate(${-rotation}deg)` }}
        >
          <Image
            className="w-full h-full object-contain"
            width={600} height={600}
            src={"/images/spb-illustration.png"}
            alt="Saint Petersburg"
          />
        </div>
      </div>

      {/* SOCHI (Left Baseline) */}
      <div className="absolute w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 flex items-center justify-center -translate-x-[140px] sm:-translate-x-[180px] lg:-translate-x-[220px]">
        <div
          className="w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] max-md:-rotate-90"
          style={{ transform: `rotate(${-rotation}deg)` }}
        >
          <Image
            className="w-full h-full object-contain"
            width={600} height={600}
            src={"/images/sochi-illustration.png"}
            alt="Sochi"
          />
        </div>
      </div>

    </div>
  );
}
