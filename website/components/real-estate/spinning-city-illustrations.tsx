"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCity } from "@/providers/city-provider";

const cityOrder = ["moscow", "kazan", "st-petersburg", "sochi"];

const cityBaseAngles: Record<string, number> = {
  "moscow": 0,
  "kazan": 90,
  "st-petersburg": 180,
  "sochi": 270,
};

interface CityItemProps {
  slug: string;
  imageSrc: string;
  altText: string;
  isActive: boolean;
  rotation: number;
  positionClasses: string;
  activePositionClasses: string;
  mobileFallbackClass: string;
}

function CityItem({
  slug,
  imageSrc,
  altText,
  isActive,
  rotation,
  positionClasses,
  activePositionClasses,
  mobileFallbackClass,
}: CityItemProps) {
  return (
    <div
      className={`hidden lg:block absolute w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-68 lg:h-68 xl:w-70 xl:h-70 2xl:w-90 2xl:h-90 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isActive ? `scale-115 ${activePositionClasses} opacity-100 z-20` : `${positionClasses} opacity-30 md:opacity-20 lg:opacity-5 z-10`}
      `}
    >
      <div
        className={`w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileFallbackClass}`}
        style={{ transform: `rotate(${-rotation}deg)` }}
      >
        <Image
          className="w-full h-full object-contain"
          width={1000}
          height={1000}
          src={imageSrc}
          alt={altText}
          priority={slug === "moscow"}
        />
      </div>
    </div>
  );
}

export function SpinningCityIllustrations() {
  const { city } = useCity();
  const [rotation, setRotation] = useState(0);
  const prevCityRef = useRef(city.slug);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const targetDockAngle = isDesktop ? 270 : 0;

    if (prevCityRef.current !== city.slug) {
      const currentBase = cityBaseAngles[prevCityRef.current] ?? 0;
      const nextBase = cityBaseAngles[city.slug] ?? 0;

      let delta = nextBase - currentBase;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      setRotation((prev) => prev - delta);
      prevCityRef.current = city.slug;
    } else {
      const initialBase = cityBaseAngles[city.slug] ?? 0;
      setRotation(targetDockAngle - initialBase);
    }
  }, [city.slug]);

  return (
    <div
      className="relative flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        transform: `rotate(${rotation}deg)`,
        width: "550px",
        height: "550px",
      }}
    >
      {/* MOSCOW */}
      <CityItem
        slug="moscow"
        imageSrc="/images/moscow-illustration.png"
        altText="Moscow"
        isActive={city.slug === "moscow"}
        rotation={rotation}
        positionClasses="-translate-y-[130px] sm:-translate-y-[190px] md:-translate-y-[220px] lg:-translate-y-[250px] xl:-translate-y-[290px] 2xl:-translate-y-[350px]"
        activePositionClasses="-translate-y-[150px] sm:-translate-y-[210px] md:-translate-y-[240px] lg:-translate-y-[270px] xl:-translate-y-[320px] 2xl:-translate-y-[390px]"
        mobileFallbackClass="max-md:!transform-none"
      />

      {/* KAZAN */}
      <CityItem
        slug="kazan"
        imageSrc="/images/kazan-illustration.png"
        altText="Kazan"
        isActive={city.slug === "kazan"}
        rotation={rotation}
        positionClasses="translate-x-[130px] sm:translate-x-[190px] md:translate-x-[220px] lg:translate-x-[250px] xl:translate-x-[290px] 2xl:translate-x-[350px]"
        activePositionClasses="translate-x-[150px] sm:translate-x-[210px] md:translate-x-[240px] lg:translate-x-[270px] xl:translate-x-[320px] 2xl:translate-x-[390px]"
        mobileFallbackClass="max-md:rotate-90"
      />

      {/* SAINT PETERSBURG */}
      <CityItem
        slug="st-petersburg"
        imageSrc="/images/spb-illustration.png"
        altText="Saint Petersburg"
        isActive={city.slug === "st-petersburg"}
        rotation={rotation}
        positionClasses="translate-y-[130px] sm:translate-y-[190px] md:translate-y-[220px] lg:translate-y-[250px] xl:translate-y-[290px] 2xl:translate-y-[350px]"
        activePositionClasses="translate-y-[150px] sm:translate-y-[210px] md:translate-y-[240px] lg:translate-y-[270px] xl:translate-y-[320px] 2xl:translate-y-[390px]"
        mobileFallbackClass="max-md:rotate-180"
      />

      {/* SOCHI */}
      <CityItem
        slug="sochi"
        imageSrc="/images/sochi-illustration.png"
        altText="Sochi"
        isActive={city.slug === "sochi"}
        rotation={rotation}
        positionClasses="-translate-x-[130px] sm:-translate-x-[190px] md:-translate-x-[220px] lg:-translate-x-[250px] xl:-translate-x-[290px] 2xl:-translate-x-[350px]"
        activePositionClasses="-translate-x-[150px] sm:-translate-x-[210px] md:-translate-x-[240px] lg:-translate-x-[270px] xl:-translate-x-[320px] 2xl:-translate-x-[390px]"
        mobileFallbackClass="max-md:-rotate-90"
      />
    </div>
  );
}
