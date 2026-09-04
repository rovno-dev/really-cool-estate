import { PropertyListing } from "@/components/real-estate/property-card";

export const properties: PropertyListing[] = [
  {
    id: "p1",
    slug: "moscow-park-apartments",
    title: { en: "Park View Apartments", ru: "Апартаменты Park View" },
    address: { en: "Moscow, Presnensky district", ru: "Москва, Пресненский район" },
    description: {
      en: "Modern apartments in the heart of Moscow with panoramic views of the city.",
      ru: "Современные апартаменты в центре Москвы с панорамными видами на город."
    },
    price: 24_500_000,
    area: 78,
    bedrooms: 2,
    bathrooms: 2,
    floor: 12,
    totalFloors: 32,
    image: "/images/sochi-apartments-1.png",
    city: "moscow",
    type: "apartment",
    status: "available",
    yearBuilt: 2023
  },
  {
    id: "p2",
    slug: "moscow-garden-house",
    title: { en: "Garden House", ru: "Дом Garden House" },
    address: { en: "Moscow, Khamovniki", ru: "Москва, Хамовники" },
    description: {
      en: "A premium townhouse in a quiet neighborhood with private garden.",
      ru: "Премиальный таунхаус в тихом районе с собственным садом."
    },
    price: 68_000_000,
    area: 210,
    bedrooms: 4,
    bathrooms: 3,
    floor: 1,
    totalFloors: 3,
    image: "/images/sochi-apartments-1.png",
    city: "moscow",
    type: "townhouse",
    status: "available",
    yearBuilt: 2022
  },
  {
    id: "p3",
    slug: "moscow-sky-residence",
    title: { en: "Sky Residence", ru: "Sky Residence" },
    address: { en: "Moscow, Tverskoy", ru: "Москва, Тверской" },
    description: {
      en: "Luxury apartments on the 25th floor with city skyline views.",
      ru: "Люкс-апартаменты на 25 этаже с видами на городской горизонт."
    },
    price: 95_000_000,
    area: 145,
    bedrooms: 3,
    bathrooms: 2,
    floor: 25,
    totalFloors: 40,
    image: "/images/sochi-apartments-1.png",
    city: "moscow",
    type: "apartment",
    status: "reserved",
    yearBuilt: 2024
  },
  {
    id: "p4",
    slug: "moscow-family-flat",
    title: { en: "Family Comfort Flat", ru: "Квартира Family Comfort" },
    address: { en: "Moscow, Presnensky", ru: "Москва, Пресненский" },
    description: {
      en: "Cozy 3-bedroom apartment perfect for a growing family.",
      ru: "Уютная 3-комнатная квартира, идеальная для растущей семьи."
    },
    price: 18_200_000,
    area: 92,
    bedrooms: 3,
    bathrooms: 1,
    floor: 7,
    totalFloors: 17,
    image: "/images/sochi-apartments-1.png",
    city: "moscow",
    type: "apartment",
    status: "available",
    yearBuilt: 2020
  },
  {
    id: "p5",
    slug: "kazan-river-view",
    title: { en: "River View Apartments", ru: "Апартаменты с видом на реку" },
    address: { en: "Kazan, Vakhitovsky district", ru: "Казань, Вахитовский район" },
    description: {
      en: "Modern apartments overlooking the Kazanka river.",
      ru: "Современные апартаменты с видом на реку Казанку."
    },
    price: 12_800_000,
    area: 65,
    bedrooms: 2,
    bathrooms: 1,
    floor: 10,
    totalFloors: 22,
    image: "/images/sochi-apartments-1.png",
    city: "kazan",
    type: "apartment",
    status: "available",
    yearBuilt: 2023
  },
  {
    id: "p6",
    slug: "spb-nevsky-residence",
    title: { en: "Nevsky Residence", ru: "Резиденция Невский" },
    address: { en: "Saint Petersburg, Tsentralny", ru: "Санкт-Петербург, Центральный" },
    description: {
      en: "Historical building renovated into premium apartments near Nevsky Prospect.",
      ru: "Историческое здание, реконструированное в премиальные апартаменты у Невского проспекта."
    },
    price: 32_400_000,
    area: 110,
    bedrooms: 3,
    bathrooms: 2,
    floor: 4,
    totalFloors: 6,
    image: "/images/sochi-apartments-1.png",
    city: "st-petersburg",
    type: "apartment",
    status: "available",
    yearBuilt: 2021
  }
];

export function getPropertiesByCity(citySlug: string): PropertyListing[] {
  return properties.filter(p => p.city === citySlug);
}
