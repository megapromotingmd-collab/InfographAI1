# Cheia Gemini per utilizator

## Ordine de prioritate
1. Cheie salvată local (`services/userKeyStore.ts`, localStorage).
2. Cheie selectată în AI Studio (dacă există și dacă env are API_KEY pentru handshake).
3. `process.env.API_KEY`.
4. Dacă lipsește orice variantă → eroare: „Nu există cheie Gemini setată. Adaugă cheia ta în Project Hub > Gemini API.”

## Unde se setează
- Project Hub (`modules/project-hub/ProjectHub.tsx`) → componenta `ApiKeyPanel`.
- Brand Kit (`modules/brand-kit/BrandKitPage.tsx`) include și ea `ApiKeyPanel`.
- Stocare: localStorage prin `setUserGeminiKey`, citire cu `getUserGeminiKey`, ștergere cu `clearUserGeminiKey`.

## Cum e folosită
- `services/geminiService.ts` → `getActiveApiKey()` cheamă localStorage, AI Studio, env.
- Funcțiile `generateCharacterSheet` și `generateInfographic` aruncă eroare dacă nu există cheie.

## Test rapid
1) Deschide Project Hub → secțiunea „Gemini API” → setează cheia.  
2) Rulează o generare (storyboard/pitch/book). Dacă lipsește cheia, apare eroare explicită.  
3) Schimbă/șterge cheia din același panou; localStorage se actualizează.  
