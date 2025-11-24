# Fluxuri principale

## Generare Infographic (set 1…15)
- Input: `GenerationConfig` (limbă, stil, format, complexitate, textDensity, searchDepth, referință opțională).
- Cheie: rezolvată prin `getActiveApiKey` (local > AI Studio > env).
- Prompt include STYLE_RULES + reguli textDensity + opțional referință (DNA panel).
- Queue 1…15, cu slot special 1.5 (anchor). Zero Tolerance, delay 60s, auto-retry.
- Output imagine 2K, stocată în queue + set completat.

## Sheet 1.5 (anchor)
- Funcție: `generateCharacterSheet(baseImage, style, refinement?, mode='character'|'brand')`.
- Layout: 75% corp/portret + 25% panou DNA (paletă, material, lighting cube, metadata).
- Cheie: `getActiveApiKey`; dacă lipsește → eroare explicită.

## Editor universal de imagini
- Componentă: `components/ImageViewer/*`.
- Acces: click pe orice imagine (queue, completed sets, pitch, branding assets).
- Moduri: vizualizare, editare (desen/text/prompt), salvare versiune nouă (originalul se păstrează).
- Reguli: modifică doar zona indicată, nu schimbă stil/identitate, nu lasă adnotări în rezultat.

## Pitch Deck + Sketch Builder
- Wizard Pitch Deck + `components/PitchDeck/SketchBuilder.tsx`.
- Utilizatorul desenează layout (cutii simple) și notițe; acestea ghidează generarea slide-urilor finale.
- Integrare: folosește același ImageViewer pentru imagini generate.

## Children Book
- Wizard dedicat (detalii copil, ton, preferințe), generare scene consistente.
- Imaginile pot fi editate prin viewer universal, păstrând consistența personajului.

## Branding & Design Kit
- Două straturi:
  - Legacy: `components/Branding/*`.
  - Nou: `modules/brand-kit/BrandKitPage.tsx` (brief, overview draft, asset mock, editare în viewer).
- Folosește aceeași cheie și același editor universal.

## Project Hub
- `modules/project-hub/ProjectHub.tsx`: listă proiecte, creare tipizată (pitch/prezentare/poze/storybook/branding/custom), panou cheie Gemini.
- Integrare: setarea cheii în Hub → folosită de toate generările prin `geminiService`.
