# Pitch Deck - Sketch Builder

## Scop
- Permite schițarea vizuală a slide-urilor (layout de cutii + notițe) înainte de generarea conținutului final.
- Oferă un layer opțional peste fluxul existent de pitch deck, fără să modifice logica de generare.

## Funcțional
- Adăugare slide nou (buton „+”); opțional duplicare slide.
- Fiecare slide: titlu editabil, canvas simplu cu cutii desenate (zone de imagine/text) și notițe de conținut.
- Notițele și pozițiile cutiilor devin instrucțiuni pentru generarea slide-ului final (imagini + text).
- Integrează editorul universal pentru imaginile generate.

## Reguli
- Nu rupe fluxul pitch existent; este un layer suplimentar.
- Păstrează stilul deck-ului (culori, font vibe, claritate text).
- Folosește cheile și generarea standard (same pipeline Gemini).

## Locație
- Componentă: `components/PitchDeck/SketchBuilder.tsx` (apelată din wizard pitch).

## Pași recomandați
1) Creează structura slide-urilor cu Sketch Builder (cutii + notițe).  
2) Generează slide-urile cu imagini/text conform schiței.  
3) Editează imaginile în viewer universal dacă sunt necesare corecții locale.  
