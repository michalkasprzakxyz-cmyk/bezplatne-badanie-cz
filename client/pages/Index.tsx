import { Fragment, ReactNode, useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  FileText,
  Glasses,
  ScanEye,
  Clock,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import {
  benefits,
  brand,
  cities,
  footer,
  hero,
  links,
  map,
  meta,
  models,
  nav,
  priceBanner,
  signal,
  steps,
} from "@/content";
import { CZECH_VIEWBOX, regions } from "@/data/czechMap";

/* ---------- helpers ---------- */

/** "**bold**", "***bold italic***" and "\n" -> JSX */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {line.split(/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*)/g).map((part, i) => {
            if (part.startsWith("***"))
              return (
                <em key={i} className="font-bold">
                  {part.slice(3, -3)}
                </em>
              );
            if (part.startsWith("**"))
              return (
                <strong key={i} className="font-semibold">
                  {part.slice(2, -2)}
                </strong>
              );
            return <Fragment key={i}>{part}</Fragment>;
          })}
        </Fragment>
      ))}
    </>
  );
}

function CTA({
  href,
  children,
  variant = "white",
}: {
  href: string;
  children: ReactNode;
  variant?: "white" | "outline" | "primary";
}) {
  const v = {
    white: "bg-white text-black",
    outline: "border border-brand-primary bg-transparent text-brand-primary hover:!opacity-100 hover:bg-brand-primary hover:text-brand-on-primary",
    primary: "bg-brand-primary font-semibold text-brand-on-primary hover:!opacity-100 hover:bg-brand-primary-hover",
  }[variant];
  return (
    <a
      href={href}
      {...(href.startsWith("#") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className={`inline-flex w-full items-center justify-center whitespace-nowrap px-6 py-6 text-xs uppercase tracking-wide transition-all hover:scale-105 hover:opacity-70 sm:w-auto sm:px-14 sm:text-sm ${v}`}
    >
      {children}
    </a>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 17 16" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d="M15.47 0H3.38a1.03 1.03 0 1 0 0 2.06h9.6L.8 14.24a1.03 1.03 0 0 0 1.46 1.46L14.44 3.52v9.6a1.03 1.03 0 1 0 2.06 0V1.03C16.5.46 16.04 0 15.47 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Ikony dostępne w content.ts (benefits.items[].icon). Dodaj kolejne z lucide.dev. */
const ICONS: Record<string, LucideIcon> = { Eye, EyeOff, FileText, Glasses, ScanEye, Clock, Sparkles, ShieldCheck, HeartHandshake };

const H2 = "text-[clamp(1.9rem,4vw,3rem)] font-normal leading-[1.15] tracking-tight text-brand-text [&_em]:text-brand-primary [&_strong]:text-brand-primary";

/* ---------- mapa (B8): Czechy, showroom w Pradze ---------- */

type City = (typeof cities)[number];

function CzechMap() {
  const [hoverRegion, setHoverRegion] = useState<string | null>(null);
  const [hoverCity, setHoverCity] = useState<string | null>(null);
  const [clickedRegion, setClickedRegion] = useState<string | null>(null);

  const salonRegions = new Set(cities.map((c) => c.region));
  const activeRegion = hoverRegion ?? clickedRegion;
  const visibleCities: City[] = activeRegion
    ? cities.filter((c) => c.region === activeRegion && (!hoverCity || c.name === hoverCity))
    : cities;
  const isMouse = (e: React.PointerEvent) => e.pointerType === "mouse";

  const shopLink =
    "block whitespace-nowrap bg-white px-3 py-2 text-sm text-black transition-colors hover:bg-black hover:text-white";

  return (
    <div className="w-full max-w-[720px]">
      <div
        className="relative w-full"
        onPointerLeave={(e) => {
          if (!isMouse(e)) return;
          setHoverRegion(null);
          setHoverCity(null);
        }}
      >
        <svg viewBox={CZECH_VIEWBOX} className="poland-map h-auto w-full" role="img" aria-label="Mapa showroomů MUSCAT">
          {regions.map((r) => {
            const hasSalon = salonRegions.has(r.id);
            return (
              <polygon
                key={r.id}
                points={r.points}
                className={`${hasSalon ? "has-salon" : ""} ${r.id === activeRegion ? "is-active" : ""}`}
                onPointerEnter={(e) => {
                  if (!hasSalon || !isMouse(e)) return;
                  setHoverCity(null);
                  setHoverRegion(r.id);
                }}
                onClick={() => {
                  if (!hasSalon) return;
                  setHoverCity(null);
                  setClickedRegion((cur) => (cur === r.id ? null : r.id));
                }}
              >
                {hasSalon && <title>{cities.find((c) => c.region === r.id)?.name}</title>}
              </polygon>
            );
          })}
        </svg>

        {visibleCities.map((city) => {
          const active = city.region === activeRegion;
          return (
            <div
              key={city.name}
              className="absolute z-10 flex flex-col items-start"
              style={{ left: `${city.x}%`, top: `${city.y}%` }}
              onPointerEnter={(e) => {
                if (!isMouse(e)) return;
                setHoverRegion(city.region);
                setHoverCity(city.name);
              }}
              onPointerLeave={(e) => isMouse(e) && setHoverCity(null)}
              onClick={() => setClickedRegion(city.region)}
            >
              <span
                className={`cursor-pointer whitespace-nowrap text-xs font-medium tracking-tight transition-colors sm:text-lg ${
                  active ? "text-brand-primary" : "text-black"
                }`}
              >
                {city.name}
              </span>
              {active && (
                <div className="z-20 mt-1 hidden flex-col shadow-lg lg:flex">
                  {city.salons.map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className={shopLink}>
                      {s.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {activeRegion && (
        <div className="mt-6 flex flex-col gap-4 lg:hidden">
          {cities
            .filter((c) => c.region === activeRegion)
            .map((c) => (
              <div key={c.name} className="flex flex-col gap-1">
                <p className="text-sm font-semibold">{c.name}</p>
                {c.salons.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className={`${shopLink} border border-rust-200`}>
                    {s.name}
                  </a>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

/* ---------- strona ---------- */

export default function Index() {
  useEffect(() => {
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  }, []);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 h-16 bg-white">
        <div className="mx-auto flex h-full max-w-[1300px] items-center justify-between px-6 sm:px-16">
          <a href={links.shop} target="_blank" rel="noreferrer">
            <img src={brand.logo} alt={brand.name} className="h-auto w-32 invert" />
          </a>
          <a
            href={links.booking}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center border border-black px-6 text-[10px] font-medium uppercase tracking-wide text-black transition-opacity hover:opacity-60"
          >
            {nav.cta}
          </a>
        </div>
      </nav>

      <main className="flex flex-col bg-brand-page pt-16 font-sans text-brand-text">
        {/* A1: Hero */}
        <section id="hero" className="flex flex-col bg-hero-bg lg:min-h-[calc(100vh-4rem-5.5rem)] lg:max-h-[95vh] lg:flex-row">
          <div className="flex w-full flex-col justify-between gap-12 px-6 pb-8 pt-14 sm:px-10 lg:w-1/2 lg:pl-[6%] lg:pr-8 lg:pb-10 lg:pt-10">
            <div className="flex flex-1 flex-col justify-center gap-10 lg:gap-16">
              <div className="flex flex-col gap-3 text-hero-text sm:gap-4">
                <h1 className="break-normal text-[clamp(2.4rem,4.2vw,4.6rem)] font-semibold leading-[1.1] tracking-tight [&_em]:font-semibold lg:text-[clamp(3.75rem,7.5vw,6rem)]">
                  <Rich text={hero.title} />
                </h1>
                <p className="text-base uppercase tracking-wide opacity-90 sm:text-xl lg:text-[1.6rem] lg:leading-tight">
                  {hero.subtitle}
                </p>
              </div>
              <p className="text-base font-bold uppercase tracking-wide text-hero-text sm:text-xl lg:text-[1.6rem] lg:leading-tight">
                {hero.date}
              </p>
              <a
                href={links.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center bg-hero-text px-8 py-5 text-sm font-semibold uppercase tracking-wide text-hero-bg transition-all hover:scale-105 hover:opacity-90 sm:w-auto sm:self-start sm:text-base lg:py-6"
              >
                {hero.cta}
              </a>
            </div>
            <p className="max-w-[560px] text-xs leading-snug text-hero-text/80 sm:text-sm">
              {hero.disclaimer}{" "}
              <a href={links.terms} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-80">
                {hero.disclaimerLink}
              </a>
            </p>
          </div>
          <picture className="block w-full lg:w-1/2">
            <source srcSet={hero.image} type="image/webp" />
            <img
              src={hero.imageFallback}
              alt={hero.imageAlt}
              className="h-[100vw] max-h-[600px] w-full object-cover object-[50%_35%] lg:h-full lg:max-h-none"
              fetchPriority="high"
            />
          </picture>
        </section>
        <div className="bg-hero-legal px-6 py-6 sm:py-8">
          <p className="mx-auto max-w-[1150px] text-center text-[11px] leading-snug text-black sm:text-sm">{hero.legal}</p>
        </div>

        {/* B5: Baner cenowy */}
        <section id="cena">
          <div className="flex flex-col items-center gap-5 bg-brand-banner px-6 py-14 text-center text-black sm:py-16">
            <h2 className="text-2xl font-medium tracking-tight sm:text-3xl lg:text-[2.25rem]">{priceBanner.title}</h2>
            <p className="max-w-[900px] text-base leading-relaxed sm:text-lg">
              <Rich text={priceBanner.text} />
            </p>
            <div className="mt-4 w-full sm:w-auto">
              <CTA href={priceBanner.ctaHref} variant="primary">{priceBanner.cta}</CTA>
            </div>
          </div>
        </section>

        {/* B3: Zdjęcie w tle + tekst */}
        <section id="sygnal" className="relative overflow-hidden" style={{ backgroundColor: signal.bg }}>
          <picture>
            <source media="(min-width: 768px)" srcSet={signal.imageDesktop} type="image/webp" />
            <source media="(min-width: 768px)" srcSet={signal.imageDesktopFallback} />
            <source srcSet={signal.imageMobile} type="image/webp" />
            <img
              src={signal.imageMobileFallback}
              alt={signal.imageAlt}
              loading="lazy"
              className="block h-auto w-full md:absolute md:inset-0 md:h-full md:object-cover md:object-center"
            />
          </picture>
          <div className="relative -mt-[80vw] px-4 pb-10 sm:px-10 md:mt-0 md:flex md:items-center md:px-0 md:py-24">
            <div className="flex flex-col gap-5 border border-sand-200 bg-sand-100/95 p-8 text-black sm:p-12 md:ml-[50%] md:w-[44%] md:max-w-[680px] md:p-8 lg:gap-7 lg:p-14">
              <h2 className="text-[clamp(1.7rem,3vw,2.75rem)] font-medium leading-[1.2] tracking-tight">
                <Rich text={signal.title} />
              </h2>
              <p className="text-base leading-relaxed lg:text-lg">
                <Rich text={signal.text} />
              </p>
            </div>
          </div>
        </section>

        {/* B4: Korzyści */}
        <section id="korzysci" className="flex flex-col items-center gap-12 bg-brand-page px-4 py-16 sm:px-6 lg:py-24">
          <h2 className={`${H2} text-center`}>
            <Rich text={benefits.title} />
          </h2>
          <div className="grid w-full max-w-[1200px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.items.map((b) => {
              const Icon = ICONS[b.icon] ?? Eye;
              return (
                <div key={b.text} className="flex flex-col items-center gap-5 text-center">
                  <Icon className="h-16 w-16 text-brand-primary" strokeWidth={1} aria-hidden />
                  <p className="max-w-[260px] text-base leading-snug text-brand-text/80">{b.text}</p>
                </div>
              );
            })}
          </div>
          <CTA href={links.booking} variant="primary">
            {benefits.cta}
          </CTA>
        </section>

        {/* B6: Modele */}
        <section id="modele" className="flex flex-col items-center gap-10 bg-brand-light px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className={H2}>
              <Rich text={models.title} />
            </h2>
            <p className="max-w-[900px] text-base leading-relaxed text-brand-text/80 sm:text-lg [&_strong]:font-semibold [&_strong]:text-brand-text">
              <Rich text={models.subtitle} />
            </p>
          </div>
          <div className="-mx-4 flex w-[calc(100%+2rem)] snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:w-full sm:max-w-[1480px] sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {models.items.map((m, i) => (
              <a
                key={`${m.name}-${i}`}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-[75%] shrink-0 snap-start flex-col gap-4 sm:w-auto"
              >
                <div className="relative pb-5 pr-5">
                  <picture>
                    <source srcSet={m.image} type="image/webp" />
                    <img
                      src={m.imageFallback}
                      alt={`${models.imageAltPrefix} ${m.name} ${m.color}`}
                      loading="lazy"
                      className="aspect-[4/5] w-full border border-sand-300 bg-sand-100 object-cover transition-opacity group-hover:opacity-85"
                    />
                  </picture>
                  <span className="absolute bottom-0 right-0 flex h-16 w-16 items-center justify-center border border-sand-300 bg-sand-100 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-brand-on-primary sm:h-20 sm:w-20">
                    <ArrowIcon />
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-semibold tracking-tight">{m.name}</p>
                  <p className="mt-1 text-base">{m.color}</p>
                </div>
              </a>
            ))}
          </div>
          <CTA href={links.collection} variant="primary">
            {models.cta}
          </CTA>
        </section>

        {/* A5: Kroki */}
        <section id="kroki" className="flex flex-col bg-brand-stone lg:flex-row lg:items-stretch">
          <picture className="block w-full lg:relative lg:w-1/2 lg:shrink-0">
            <source srcSet={steps.image} type="image/webp" />
            <img
              src={steps.imageFallback}
              alt={steps.imageAlt}
              loading="lazy"
              className="h-[110vw] max-h-[640px] w-full object-cover object-[50%_20%] lg:absolute lg:inset-0 lg:h-full lg:max-h-none"
            />
          </picture>
          <div className="flex w-full flex-col items-start justify-center gap-10 px-4 py-14 sm:px-6 md:px-10 lg:w-1/2 lg:px-24 lg:py-24">
            <h2 className={`${H2} max-w-[641px]`}>
              <Rich text={steps.title} />
            </h2>
            <ol className="flex flex-col gap-8">
              {steps.items.map((s, i) => (
                <li key={i} className="flex items-center gap-8">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-primary text-lg font-semibold text-brand-on-primary">
                    {i + 1}
                  </span>
                  <p className="max-w-[513px] text-lg leading-snug tracking-tight">
                    <Rich text={s} />
                  </p>
                </li>
              ))}
            </ol>
            {steps.closing && <p className="text-lg font-semibold">{steps.closing}</p>}
            <div className="flex w-full flex-col items-start gap-4">
              <CTA href={links.booking} variant="primary">{steps.cta}</CTA>
              <p className="max-w-[513px] text-xs leading-snug text-brand-text/70 sm:text-sm">
                {steps.disclaimer}
                {steps.disclaimerLink && (
                  <>
                    {" "}
                    <a href={links.terms} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand-primary">
                      {steps.disclaimerLink}
                    </a>
                    .
                  </>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* B8: Mapa salonów */}
        <section
          id="salony"
          className="flex justify-center px-4 py-16 sm:px-10 lg:min-h-[720px] lg:px-16 lg:py-20"
          style={{ background: "linear-gradient(180deg, var(--brand-page) 24%, var(--map-bg-to) 100%)" }}
        >
          <div className="flex w-full max-w-[1300px] flex-col items-center gap-12 lg:flex-row lg:justify-between">
            <div className="flex w-full flex-col items-start gap-6 lg:max-w-[440px]">
              <h2 className="text-[clamp(2rem,3.4vw,2.9rem)] font-normal uppercase leading-[1.15] tracking-tight">
                <Rich text={map.title} />
              </h2>
              <p className="text-xl leading-snug sm:text-[22px]">
                {map.textBefore}{" "}
                <a
                  href={links.showroomMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-primary underline underline-offset-4 hover:opacity-80"
                >
                  {map.address}
                </a>{" "}
                {map.textAfter}
              </p>
              <a
                href={links.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center bg-rust-500 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-sand-100 transition-all hover:scale-105 hover:bg-rust-400 sm:w-auto"
              >
                {map.cta}
              </a>
            </div>
            <CzechMap />
          </div>
        </section>

        {/* A7: Footer */}
        <footer className="text-white">
          <div className="flex flex-col items-center justify-between gap-6 bg-[#a99b7b] px-6 py-5 sm:flex-row sm:px-16">
            <img src={brand.logo} alt={brand.name} className="h-auto w-40 sm:w-52" />
            <p className="text-center text-base">{footer.text}</p>
            <a
              href={links.booking}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center whitespace-nowrap border border-white px-10 text-sm font-medium uppercase tracking-wide transition-colors hover:bg-white/20 sm:px-14"
            >
              {footer.cta}
            </a>
          </div>
          <div className="flex flex-col items-center justify-between gap-2 bg-black px-6 py-3 text-xs sm:flex-row sm:px-16">
            <a href={links.privacy} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:opacity-70">
              {footer.privacy}
            </a>
            <span>{brand.copyright}</span>
          </div>
        </footer>
      </main>
    </>
  );
}
