# MUSCAT LP CZ: Měření zraku zdarma (Praha)

Wersja czeska LP „Bezpłatne badanie wzroku”. Bez GTM. Mapa: kraje Czech, jeden showroom (Praga)
`client/data/czechMap.ts`.

Kolejność sekcji: A1 Hero promo, B5 Baner cenowy, B3 Zmęczone oczy, B4 Korzyści,
B6 Modele (5), A5 Kroki, B8 Mapa (Czechy), A7 Footer.

## Gdzie co zmieniać
- Teksty, linki, zdjęcia, salony na mapie: `client/content.ts`
  (pogrubienie `**tekst**`, pogrubienie+kursywa `***tekst***`, nowa linia `\n`)
- Kolory: `client/global.css`, zmienne `--brand-*` na górze pliku
- Własne zdjęcia: wrzuć do `public/images/` i wpisz `/images/plik.jpg` w content.ts
- Układ sekcji: `client/pages/Index.tsx` (każda sekcja opisana komentarzem A1/B5/...)

## Uruchomienie
pnpm install
pnpm dev      # http://localhost:8080
pnpm build    # statyczne pliki w dist/spa
