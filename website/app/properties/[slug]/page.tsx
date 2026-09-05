"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  BedIcon,
  BathtubIcon,
  RulerIcon,
  MapPinSimpleAreaIcon,
  CalendarBlankIcon,
  CarIcon,
  WifiHighIcon,
  ShieldCheckIcon,
  TreeIcon,
  StorefrontIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CaretLeftIcon,
  CaretRightIcon,
  XIcon,
  ImageIcon,
} from "@phosphor-icons/react";
import { RequestDialog } from "@/components/layout/request/request-dialog";
import { ScrollReveal } from "@/components/layout/animation/scroll-reveal";
import { PropertyCard, type PropertyListing } from "@/components/real-estate/property-card";
import { useLanguage } from "@/providers/language-provider";
import { useCity } from "@/providers/city-provider";
import { properties } from "@/utils/constants/properties";
import { getCityBySlug } from "@/utils/constants/cities";

export default function PropertyShowcasePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { lang } = useLanguage();
  const { setCityBySlug } = useCity();
  const router = useRouter();
  const [property, setProperty] = useState<PropertyListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    const found = properties.find((p) => p.slug === slug);
    if (found) {
      setProperty(found);
      setCityBySlug(found.city);
    } else {
      router.replace("/search");
    }
    setLoading(false);
  }, [slug, router, setCityBySlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--bg)">
        <p className="text-muted-foreground">{lang === "ru" ? "Загрузка..." : "Loading..."}</p>
      </div>
    );
  }

  if (!property) return null;

  const city = getCityBySlug(property.city);
  const similarProperties = properties
    .filter((p) => p.city === property.city && p.id !== property.id)
    .slice(0, 4);

  const formatPrice = (price: number) => {
    return `${(price / 1_000_000).toFixed(1)}M ₽`;
  };

  const statusLabels = {
    available: lang === "ru" ? "Доступно" : "Available",
    sold: lang === "ru" ? "Продано" : "Sold",
    reserved: lang === "ru" ? "Бронь" : "Reserved",
  } as const;

  const typeLabels = {
    apartment: lang === "ru" ? "Квартира" : "Apartment",
    house: lang === "ru" ? "Дом" : "House",
    townhouse: lang === "ru" ? "Таунхаус" : "Townhouse",
  } as const;

  const amenities = [
    { icon: CarIcon, label: lang === "ru" ? "Парковка" : "Parking" },
    { icon: WifiHighIcon, label: lang === "ru" ? "Wi-Fi" : "Wi-Fi" },
    { icon: ShieldCheckIcon, label: lang === "ru" ? "Охрана" : "Security" },
    { icon: TreeIcon, label: lang === "ru" ? "Двор" : "Courtyard" },
    { icon: StorefrontIcon, label: lang === "ru" ? "Рядом магазины" : "Near shops" },
    { icon: CalendarBlankIcon, label: lang === "ru" ? "Новостройка" : "New build" },
  ];

  const galleryImages = [
    property.image,
    "/images/sochi-apartments-2.png",
    "/images/sochi-apartments-3.jpeg",
  ];

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative h-[60svh] min-h-[450px] w-full overflow-hidden">
        <Image
          src={property.image}
          alt={property.title[lang]}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <Container className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full pb-12">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="glass-static" className="!bg-white/20 !text-white backdrop-blur-md">
                  {typeLabels[property.type]}
                </Badge>
                <Badge variant="glass-static" className="!bg-white/20 !text-white backdrop-blur-md">
                  {statusLabels[property.status]}
                </Badge>
                {city && (
                  <Link href={`/cities/${city.slug}`}>
                    <Badge variant="glass-static" className="!bg-white/20 !text-white backdrop-blur-md hover:!bg-white/30 transition-colors">
                      {city.name[lang]}
                    </Badge>
                  </Link>
                )}
              </div>
              <h1 className="text-display-1 md:text-display-2 font-bold text-white leading-tight">
                {property.title[lang]}
              </h1>
              <p className="mt-2 text-body-2 text-white/80 flex items-center gap-2">
                <MapPinSimpleAreaIcon className="size-4" weight="fill" />
                {property.address[lang]}
              </p>
            </div>
            <div className="text-right">
              <p className="text-display-2 font-bold text-white">{formatPrice(property.price)}</p>
              <p className="text-sm text-white/70">{lang === "ru" ? "Цена" : "Price"}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. QUICK INFO STRIP */}
      <section className="py-6 border-b border-(--outline) bg-(--card)">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <QuickMetric icon={RulerIcon} value={`${property.area} m²`} label={lang === "ru" ? "Площадь" : "Area"} />
            <QuickMetric icon={BedIcon} value={`${property.bedrooms}`} label={lang === "ru" ? "Спальни" : "Bedrooms"} />
            <QuickMetric icon={BathtubIcon} value={`${property.bathrooms}`} label={lang === "ru" ? "Ванные" : "Bathrooms"} />
            <QuickMetric icon={MapPinSimpleAreaIcon} value={`${property.floor}/${property.totalFloors}`} label={lang === "ru" ? "Этаж" : "Floor"} />
            <QuickMetric icon={CalendarBlankIcon} value={`${property.yearBuilt}`} label={lang === "ru" ? "Год" : "Year"} />
          </div>
        </Container>
      </section>

      {/* 3. DESCRIPTION + QUICK ACTIONS */}
      <section className="py-12 bg-(--bg)">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
            <ScrollReveal>
              <div>
                <h2 className="text-display-3 font-semibold mb-4">
                  {lang === "ru" ? "О жилье" : "About this property"}
                </h2>
                <p className="text-body-2 text-muted-foreground leading-relaxed max-w-3xl">
                  {property.description[lang]}
                </p>
                <p className="mt-4 text-body-2 text-muted-foreground leading-relaxed max-w-3xl">
                  {lang === "ru"
                    ? "Современная планировка, качественные материалы отделки и продуманная инфраструктура района. Рядом метро, парки, школы и торговые центры. Идеально для жизни и инвестиций."
                    : "Modern layout, high-quality finishing materials and thoughtful district infrastructure. Metro, parks, schools and shopping centers nearby. Perfect for living and investment."}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>{lang === "ru" ? "Хочу эту квартиру" : "I want this apartment"}</CardTitle>
                  <CardDescription>{lang === "ru" ? "Оставьте заявку — перезвоним в течение 15 минут" : "Leave a request — we'll call you back within 15 minutes"}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm py-2 border-b border-(--outline)">
                    <span className="text-muted-foreground">{lang === "ru" ? "Цена" : "Price"}</span>
                    <span className="font-semibold">{formatPrice(property.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-(--outline)">
                    <span className="text-muted-foreground">{lang === "ru" ? "Площадь" : "Area"}</span>
                    <span className="font-semibold">{property.area} m²</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-(--outline)">
                    <span className="text-muted-foreground">{lang === "ru" ? "Спальни" : "Bedrooms"}</span>
                    <span className="font-semibold">{property.bedrooms}</span>
                  </div>
                  <div className="pt-4">
                    <RequestDialog propertyId={property.id} propertyTitle={property.title[lang]}>
                      <Button size="large" shape="round" className="w-full">
                        {lang === "ru" ? "Оставить заявку" : "Leave a Request"}
                        <ArrowRightIcon className="size-4" weight="bold" />
                      </Button>
                    </RequestDialog>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* 4. AMENITIES / FEATURES */}
      <section className="py-16 bg-(--card)">
        <Container>
          <ScrollReveal>
            <h2 className="text-display-3 font-semibold mb-8">
              {lang === "ru" ? "Что внутри" : "What's inside"}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {amenities.map((amenity, index) => (
              <ScrollReveal key={amenity.label} delay={index * 60}>
                <div className="flex items-center gap-4 rounded-xl border border-(--outline) bg-(--bg) p-4 hover:border-(--primary)/50 transition-colors">
                  <div className="flex size-12 items-center justify-center rounded-lg">
                    <amenity.icon className="size-6 fill-(--on-bg-low)!" weight="duotone" />
                  </div>
                  <span className="text-body-3 font-medium">{amenity.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. GALLERY */}
      <section className="py-16 bg-(--bg)">
        <Container>
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-display-3 font-semibold">
                  {lang === "ru" ? "Фотографии" : "Photos"}
                </h2>
              </div>
              <Button variant="text" size="small" onClick={() => setShowLightbox(true)}>
                <ImageIcon className="size-4" />
                {lang === "ru" ? "Открыть галерею" : "Open gallery"}
              </Button>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryImages.map((img, index) => (
              <ScrollReveal key={index} delay={index * 80}>
                <button
                  onClick={() => { setActiveImageIndex(index); setShowLightbox(true); }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl w-full"
                >
                  <Image
                    src={img}
                    alt={`${property.title[lang]} — photo ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </button>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. LOCATION / MAP */}
      <section className="py-16 bg-(--bg)">
        <Container>
          <ScrollReveal>
            <h2 className="text-display-3 font-semibold mb-8">
              {lang === "ru" ? "Где это находится" : "Where it's located"}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 items-start">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg shrink-0">
                    <MapPinSimpleAreaIcon className="size-5" weight="duotone" />
                  </div>
                  <div>
                    <p className="font-medium">{property.address[lang]}</p>
                    {city && (
                      <p className="text-sm text-muted-foreground">{city.region[lang]}</p>
                    )}
                  </div>
                </div>
                {city?.neighborhoods && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {city.neighborhoods.slice(0, 4).map((n) => (
                      <Badge key={n.en} variant="glass-static">{n[lang]}</Badge>
                    ))}
                  </div>
                )}
                <p className="text-body-4 text-muted-foreground leading-relaxed">
                  {lang === "ru"
                    ? "Развитая инфраструктура: метро, школы, детские сады, парки, торговые центры. Транспортная доступность — 5 минут пешком."
                    : "Developed infrastructure: metro, schools, kindergartens, parks, shopping centers. Transport accessibility — 5 minutes walk."}
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden border border-(--outline) bg-(--card) min-h-[300px] relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,var(--primary)/10,transparent_50%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPinSimpleAreaIcon className="size-12 text-(--primary) mb-4 mx-auto" weight="duotone" />
                    <p className="text-sm text-muted-foreground">
                      {lang === "ru" ? "Карта района" : "District map"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 8. SIMILAR PROPERTIES */}
      <section className="py-16 bg-(--card)">
        <Container>
          <ScrollReveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-display-3 font-semibold">
                  {lang === "ru" ? "Похожие объекты" : "Similar properties"}
                </h2>
              </div>
              {city && (
                <Button variant="text" size="small" asChild>
                  <Link href={`/cities/${city.slug}`}>
                    {lang === "ru" ? "Все объекты" : "View all"}
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </Button>
              )}
            </div>
          </ScrollReveal>
          {similarProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProperties.map((p, index) => (
                <ScrollReveal key={p.id} delay={index * 80}>
                  <PropertyCard property={p} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              {lang === "ru" ? "Похожих объектов пока нет" : "No similar properties yet"}
            </div>
          )}
        </Container>
      </section>

      {/* 9. CTA SECTION */}
      <section className="py-20 bg-(--bg)">
        <Container className="max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-display-2 font-semibold mb-4">
              {lang === "ru" ? "Готовы увидеть эту квартиру?" : "Ready to see this apartment?"}
            </h2>
            <p className="text-body-3 text-muted-foreground mb-8">
              {lang === "ru"
                ? "Запишитесь на просмотр — покажем квартиру в удобное для вас время."
                : "Book a viewing — we'll show you the apartment at a convenient time."}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <RequestDialog propertyId={property.id} propertyTitle={property.title[lang]}>
                <Button size="large" shape="round">
                  {lang === "ru" ? "Записаться на просмотр" : "Book a viewing"}
                  <ArrowRightIcon className="size-4" weight="bold" />
                </Button>
              </RequestDialog>
              <Button variant="outlined" size="large" shape="round" asChild>
                <Link href="/search">
                  {lang === "ru" ? "Вернуться к поиску" : "Back to search"}
                  <ArrowLeftIcon className="size-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* LIGHTBOX MODAL */}
      {showLightbox && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4" onClick={() => setShowLightbox(false)}>
          <button
            className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={() => setShowLightbox(false)}
            aria-label={lang === "ru" ? "Закрыть" : "Close"}
          >
            <XIcon className="size-5" />
          </button>
          <button
            className="absolute left-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length); }}
            aria-label={lang === "ru" ? "Назад" : "Previous"}
          >
            <CaretLeftIcon className="size-5" />
          </button>
          <div className="relative w-full max-w-5xl aspect-[4/3] rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryImages[activeImageIndex]}
              alt={`${property.title[lang]} — photo ${activeImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            className="absolute right-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); setActiveImageIndex((prev) => (prev + 1) % galleryImages.length); }}
            aria-label={lang === "ru" ? "Вперёд" : "Next"}
          >
            <CaretRightIcon className="size-5" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, idx) => (
              <button
                key={idx}
                className={`size-2 rounded-full transition-colors ${idx === activeImageIndex ? "bg-white" : "bg-white/30"}`}
                onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                aria-label={`Photo ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function QuickMetric({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-lg">
        <Icon className="size-5" weight="duotone" />
      </div>
      <div>
        <p className="text-body-3 font-semibold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
