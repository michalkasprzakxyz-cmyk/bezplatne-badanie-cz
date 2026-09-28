/**
 * CAŁA TREŚĆ LANDINGU W JEDNYM MIEJSCU (wersja czeska, muscat.cz)
 *
 * - Pogrubienie w tekście: **tak jak tutaj**
 * - Pogrubienie + kursywa: ***tak jak tutaj***
 * - Nowa linia w nagłówku: \n
 * - Zdjęcia: wrzuć plik do /public/images i wpisz ścieżkę "/images/nazwa.jpg"
 *   (albo pełny URL z CDN).
 * - Kolory: /client/global.css, sekcja ":root" (zmienne --brand-*).
 */

export const links = {
  booking: "https://muscat.cz/pages/mereni-zraku-muscat-praha",
  shop: "https://muscat.cz/",
  collection: "https://muscat.cz/collections/nova-kolekce",
  terms:
    "https://drive.google.com/file/d/164N9DXV50DuOmSVFGKDCQAxboSDWhAkS/view?usp=sharing",
  privacy:
    "https://muscat.cz/pages/zasady-ochrany-osobnich-udaju-a-souboru-cookie",
  showroomMaps: "https://www.google.com/maps/search/B%C4%9Blehradsk%C3%A9+73",
};

export const meta = {
  title: "Měření zraku zdarma | MUSCAT Praha",
  description:
    "Měření zraku zdarma v optice MUSCAT v Praze od 1. do 23. října. Všechno začíná pohledem.",
};

export const brand = {
  logo: "/images/logo-muscat-white.png", // białe logo; w nawigacji odwrócone (invert) na czarne
  name: "MUSCAT",
  copyright: "Autorská práva © 4MOSA S.A.",
};

export const nav = {
  cta: "Objednat se na měření",
};

/* A1: Hero */
export const hero = {
  title: "Měření zraku\nzdarma",
  subtitle: "VŠECHNO ZAČÍNÁ POHLEDEM.",
  date: "V TERMÍNU OD 1. DO 23. ŘÍJNA.",
  cta: "Objednejte se na měření",
  image: "/images/hero-badanie.webp",
  imageFallback: "/images/hero-badanie.jpg",
  imageAlt: "Žena v dioptrických brýlích s obroučkami typu aviator",
  disclaimer:
    "Nejnižší cena za posledních 30 dní: 499 Kč. Akce platí v kamenné prodejně.",
  disclaimerLink: "Podrobnosti naleznete v pravidlech akce.",
  legal:
    "Toto je zdravotnický prostředek. Používejte jej v souladu s návodem k použití nebo štítkem. Provozovatelem reklamy je 4MOSA S.A. Výrobcem brýlových čoček je Essilor Polonia Sp. z o.o., Visall GmbH a 4MOSA S.A. Výrobcem brýlových obrub je 4MOSA S.A.",
};

/* B5: Baner cenowy */
export const priceBanner = {
  title: "Komplexní vyšetření zraku nyní za 0 Kč!",
  text: "Pouze do 23. října můžete využít výjimečnou příležitost – rezervujte si termín v naší optice MUSCAT a objednejte se **na bezplatné měření zraku**, a to i v případě, že se hned nerozhodnete pro nákup brýlí!",
  cta: "Najděte showroom nejblíže k vám",
  ctaHref: "#salony", // przewija do mapy salonów
};

/* B3: Zdjęcie w tle + tekst */
export const signal = {
  title: "Kdy jste si naposledy udělali čas na svůj zrak?",
  text: "Obrazovka ráno, cesta do práce, drobné písmo večer – vaše oči pracují po celý den, ale zhoršení zraku přichází jen málokdy náhle. **Stačí 30 minut**, abyste to zjistili a dozvěděli se, co dnes váš zrak potřebuje k tomu, aby byl svět opět ostrý a jasný.",
  imageDesktop: "/images/wzrok-desktop.webp",
  imageDesktopFallback: "/images/wzrok-desktop.jpg",
  imageMobile: "/images/wzrok-mobile.webp",
  imageMobileFallback: "/images/wzrok-mobile.jpg",
  imageAlt: "Muž si upravuje dioptrické brýle",
  bg: "#cfc3a1", // kolor tła zdjęcia, ciągnie się pod tekstem
};

/* B4: Korzyści z ikonami (ikony: lucide.dev, wpisz nazwę komponentu) */
export const benefits = {
  title: "PAMATUJTE, ŽE PRAVIDELNÉ VYŠETŘENÍ ZRAKU ***POMÁHÁ:***",
  items: [
    { icon: "ScanEye", text: "odhalit změny dioptrií dříve, než sníží komfort vidění," },
    { icon: "EyeOff", text: "poznat způsoby, jak snížit únavu očí a její následky," },
    { icon: "FileText", text: "ujistit se, že vaše brýle stále poskytují pohodlné vidění," },
    { icon: "Glasses", text: "vybrat korekci přizpůsobenou vašim potřebám." },
  ],
  cta: "Objednat se na měření zraku",
};

/* B6: Modele (4 sztuki) */
export const models = {
  title: "Každý den je dobrý pro změnu pohledu…",
  subtitle:
    "Seznamte se s bestsellery, které si naši zákazníci zamilovali – navštivte showroom MUSCAT a prohlédněte si naši **nejnovější podzimní kolekci**.",
  imageAltPrefix: "Dioptrické brýle",
  cta: "Objevte kolekci MUSCAT",
  items: [
    {
      name: "Andy",
      color: "Satin Gold/Amber Delight",
      image: "/images/modele/andy-satin-gold-amber-delight.webp",
      imageFallback: "/images/modele/andy-satin-gold-amber-delight.jpg",
      url: "https://muscat.cz/products/dioptricke-bryle-andy-satin-gold-amber-delight",
    },
    {
      name: "Andy",
      color: "Satin Silver/Smoke",
      image: "/images/modele/andy-satin-silver-smoke.webp",
      imageFallback: "/images/modele/andy-satin-silver-smoke.jpg",
      url: "https://muscat.cz/products/cire-bryle-andy-satin-silver-smoke",
    },
    {
      name: "Jess",
      color: "Silver/Smoke",
      image: "/images/modele/jess-silver-smoke.webp",
      imageFallback: "/images/modele/jess-silver-smoke.jpg",
      url: "https://muscat.cz/products/cire-bryle-jess-silver-smoke",
    },
    {
      name: "Kinny",
      color: "Matt Black/Black Magic",
      image: "/images/modele/kinny-matt-black-black-magic.webp",
      imageFallback: "/images/modele/kinny-matt-black-black-magic.jpg",
      url: "https://muscat.cz/products/dioptricke-bryle-kinny-matt-black-black-magic",
    },
  ],
};

/* A5: Kroki */
export const steps = {
  title: "Jak se objednat **na vyšetření zraku?**",
  image: "/images/kroki-para-2.webp", // poprzednie: /images/kroki-para.webp
  imageFallback: "/images/kroki-para-2.jpg",
  imageAlt: "Žena a muž v dioptrických brýlích",
  items: [
    "Najděte showroom MUSCAT, který je k vám nejblíže.",
    "Vyberte si termín vyšetření zraku, který vám vyhovuje.",
    "Zaregistrujte se online a počkejte na potvrzení návštěvy.",
    "Přijďte do optiky a nechte si komplexně vyšetřit zrak – zdarma!",
  ],
  closing: "", // (puste = ukryte)
  cta: "Objednejte se na měření zraku",
  disclaimer: "Akce platí v optice MUSCAT od 1. do 23. října 2026.",
  disclaimerLink: "", // w wersji CZ bez linku do regulaminu (puste = ukryte)
};

/* B8: Mapa salonów */
export const map = {
  title: "NA VIDĚNOU\n***V MUSCATU!***",
  textBefore: "Optika MUSCAT se nachází na",
  address: "Bělehradské 73",
  textAfter: "v Praze.",
  cta: "Objednat se na bezplatné měření zraku",
};

/* A7: Footer */
export const footer = {
  text: "Už víte, co vaše oči potřebují?",
  cta: "Objednat se na měření",
  privacy: "Zásady ochrany osobních údajů",
};

/* Showroom na mapie
 * region: id kraju z client/data/czechMap.ts
 * x, y: pozycja etykiety miasta w % szerokości/wysokości mapy
 */
export const cities = [
  {
    name: "Praha",
    region: "praha",
    x: 37.5,
    y: 31,
    salons: [{ name: "Bělehradská 73", href: links.booking }],
  },
];
