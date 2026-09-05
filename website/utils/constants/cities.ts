export interface City {
  id: string;
  slug: string;
  name: { en: string; ru: string };
  region: { en: string; ru: string };
  description: { en: string; ru: string };
  image?: {
    src: string,
    alt?: string,
  }
  video?: string;
  propertiesCount: number;
  neighborhoods: { en: string; ru: string }[];
  stats: {
    avgPricePerSqm: { en: string; ru: string };
    newBuildings: number;
    population: number;
  };
}

export const cities: City[] = [
  {
    id: "1",
    slug: "moscow",
    name: { en: "Moscow", ru: "Москва" },
    region: { en: "Moscow Oblast", ru: "Московская область" },
    description: {
      en: "The capital of Russia with the most dynamic real estate market. From elite residential complexes to affordable family housing.",
      ru: "Столица России с самым динамичным рынком недвижимости. От элитных жилых комплексов до доступного семейного жилья."
    },
    image: {
      src: "/images/moscow-flag.svg",
      alt: "image",
    },
    video: "/videos/moscow.webm",
    propertiesCount: 250,
    neighborhoods: [
      { en: "Khamovniki", ru: "Хамовники" },
      { en: "Tverskoy", ru: "Тверской" },
      { en: "Presnensky", ru: "Пресненский" },
      { en: "Ostozhenka", ru: "Остоженка" },
      { en: "Arbat", ru: "Арбат" }
    ],
    stats: {
      avgPricePerSqm: { en: "₽350K", ru: "₽350K" },
      newBuildings: 120,
      population: 12_500_000
    }
  },
  {
    id: "2",
    slug: "sochi",
    name: { en: "Sochi", ru: "Сочи" },
    region: { en: "Krasnodar Krai", ru: "Краснодарский край" },
    description: {
      en: "The resort capital of Russia. Premium seaside properties and investment opportunities.",
      ru: "Курортная столица России. Премиальная недвижимость у моря и инвестиционные возможности."
    },
    image: {
      src: "/images/sochi-flag.svg",
      alt: "image",
    },
    video: "/videos/sochi.webm",
    propertiesCount: 60,
    neighborhoods: [
      { en: "Central", ru: "Центральный" },
      { en: "Adlersky", ru: "Адлерский" },
      { en: "Khostinsky", ru: "Хостинский" }
    ],
    stats: {
      avgPricePerSqm: { en: "₽320K", ru: "₽320K" },
      newBuildings: 35,
      population: 450_000
    }
  },
  {
    id: "3",
    slug: "st-petersburg",
    name: { en: "Saint Petersburg", ru: "Санкт-Петербург" },
    region: { en: "Leningrad Oblast", ru: "Ленинградская область" },
    description: {
      en: "The cultural capital of Russia. Unique architecture, prestigious addresses, and modern residential complexes.",
      ru: "Культурная столица России. Уникальная архитектура, престижные адреса и современные жилые комплексы."
    },
    image: {
      src: "/images/spb-flag.svg",
      alt: "image",
    },
    video: "/videos/spb.webm",
    propertiesCount: 150,
    neighborhoods: [
      { en: "Petrogradsky", ru: "Петроградский" },
      { en: "Tsentralny", ru: "Центральный" },
      { en: "Moskovsky", ru: "Московский" },
      { en: "Kirovsky", ru: "Кировский" }
    ],
    stats: {
      avgPricePerSqm: { en: "₽260K", ru: "₽260K" },
      newBuildings: 90,
      population: 5_400_000
    }
  },
  {
    id: "4",
    slug: "kazan",
    name: { en: "Kazan", ru: "Казань" },
    region: { en: "Tatarstan", ru: "Татарстан" },
    description: {
      en: "The capital of Tatarstan — a fast-growing city with excellent infrastructure and affordable housing.",
      ru: "Столица Татарстана — быстрорастущий город с отличной инфраструктурой и доступным жильём."
    },
    image: {
      src: "/images/kazan-flag.svg",
      alt: "image",
    },
    video: "/videos/kazan.webm",
    propertiesCount: 80,
    neighborhoods: [
      { en: "Vakhitovsky", ru: "Вахитовский" },
      { en: "Sovetsky", ru: "Советский" },
      { en: "Novo-Savinovsky", ru: "Ново-Савиновский" },
      { en: "Moskovsky", ru: "Московский" }
    ],
    stats: {
      avgPricePerSqm: { en: "₽180K", ru: "₽180K" },
      newBuildings: 45,
      population: 1_250_000
    }
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find(c => c.slug === slug);
}
