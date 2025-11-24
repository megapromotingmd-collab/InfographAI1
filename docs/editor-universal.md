# Editor universal de imagini

## Ce face
- Un singur viewer/editor reutilizabil pentru toate modulele (storyboard, pitch, books, branding).
- Moduri: vizualizare, editare prin desen + text direct pe imagine, prompt suplimentar.
- Salvează versiune nouă; originalul rămâne disponibil.

## Reguli de editare
- Modifică doar zonele indicate (cercuri/săgeți/texte pe imagine).
- Păstrează stilul, identitatea personajelor, compoziția și rezoluția.
- Nu lasă adnotările utilizatorului în rezultat.
- Pentru seturi cu consistență (Sheet 1.5), nu rupe caracterul/stilul.

## Acces
- Click pe orice imagine generată (queue, completed sets, pitch slides, branding assets).
- Se deschide fullscreen întunecat, cu controale simple (editare, închidere, opțional versiune anterioară).

## Integrare
- Componentă: `components/ImageViewer/*`.
- Folosit de: storyboard/infographic, pitch (inclusiv SketchBuilder output), children books, branding assets, Brand Kit.

## Flux
1) User desenează/scrie pe imagine + prompt scurt (opțional).  
2) Trimitem: original, adnotată, text, metadate stil/context.  
3) Gemini editează doar zonele marcate, restul rămâne identic.  
4) Rezultatul apare în viewer; user poate salva versiunea nouă.  
