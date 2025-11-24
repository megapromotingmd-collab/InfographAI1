
import { Language, VisualStyle, Complexity, AspectRatio, SearchDepth, TextDensity } from './types';

export const DEFAULT_CONFIG = {
  language: Language.RO,
  style: VisualStyle.REALISTIC,
  complexity: Complexity.MEDIUM,
  format: AspectRatio.PORTRAIT_TALL,
  searchDepth: SearchDepth.STANDARD,
  textDensity: TextDensity.BALANCED
};

export const TELEGRAM_CONFIG = {
  TOKEN: "8394225868:AAE2O8FHC7zhhQh-sznIsflAi9aZ4pTlqwg",
  CHAT_ID: "621545666"
};

export const LANGUAGES = Object.values(Language);
export const STYLES = Object.values(VisualStyle);
export const COMPLEXITIES = Object.values(Complexity);
export const FORMATS = Object.values(AspectRatio);
export const SEARCH_DEPTHS = Object.values(SearchDepth);
export const TEXT_DENSITIES = Object.values(TextDensity);

export const LOADING_MESSAGES = [
  "Analizăm contextul...",
  "Căutăm informații (Research)...",
  "Stabilim consistența personajului...",
  "Randăm imaginea...",
  "Trimitem către Telegram..."
];

// STRICT STYLE ENFORCEMENT RULES
export const STYLE_RULES: Record<string, string> = {
  [VisualStyle.REALISTIC]: `
    STYLE ENFORCEMENT: PHOTOREALISTIC (NATIONAL GEOGRAPHIC)
    - The image MUST look like a high-end photograph taken with a DSLR camera.
    - Realistic lighting, shadows, textures, and skin pores.
    - NO cartoon features, NO outlines, NO painting effects.
    - Depth of field, natural color grading, believable physics.
  `,
  [VisualStyle.ANIME]: `
    STYLE ENFORCEMENT: ANIME (JAPANESE ANIMATION)
    - Sharp cel-shading, distinct outlines, anime facial proportions (large eyes, small nose).
    - Flattened shading with hard edges. 
    - Vibrant colors, dramatic angles.
    - NO realistic skin texture, NO 3D rounded rendering.
    - Look like a frame from a high-budget anime movie (Studio Ghibli / Makoto Shinkai).
  `,
  [VisualStyle.RENDER_3D]: `
    STYLE ENFORCEMENT: 3D RENDER (PIXAR / DISNEY)
    - Ultra-clean 3D CGI style.
    - Smooth subsurface scattering on skin (waxy/soft look).
    - Perfect "studio" lighting, soft shadows, ambient occlusion.
    - Expressive, stylized proportions but realistic materials.
    - NO grain, NO 2D outlines, NO sketch lines.
  `,
  [VisualStyle.CLAY]: `
    STYLE ENFORCEMENT: CLAYMATION / PLASTICINE
    - This image MUST look 100% like a stop-motion set made of clay/plasticine.
    - Soft clay texture, fingerprints visible on surfaces, rounded thick edges.
    - Materials must look matte and slightly imperfect.
    - NO digital smoothness, NO sharp vector lines.
    - Look like "Wallace & Gromit" or "Chicken Run".
  `,
  [VisualStyle.PAINTING]: `
    STYLE ENFORCEMENT: DIGITAL PAINTING (ARTSTATION)
    - Rich, painterly brushstrokes visible.
    - Artistic lighting and composition.
    - Highly detailed but with a "painted" texture.
    - NOT a photo, NOT a vector.
    - Epic fantasy or sci-fi concept art style.
  `,
  [VisualStyle.FLAT]: `
    STYLE ENFORCEMENT: FLAT ILLUSTRATION
    - Zero shading, flat color blocks ONLY.
    - NO gradients, NO textures, NO 3D depth.
    - Clean, geometric shapes.
    - Corporate Memphis / Big Tech minimal style.
    - Pure vector look.
  `,
  [VisualStyle.COMIC]: `
    STYLE ENFORCEMENT: COMIC BOOK / GRAPHIC NOVEL
    - High-contrast black ink outlines.
    - Halftone dots (Ben-Day dots) for shading.
    - Bold colors, dramatic lighting contrast.
    - Dynamic action lines.
    - Look like a Marvel/DC or Dark Horse comic panel.
  `,
  [VisualStyle.SKETCH]: `
    STYLE ENFORCEMENT: PENCIL SKETCH
    - Monochrome or sepia tones.
    - Visible graphite/charcoal texture.
    - Hatching and cross-hatching for shading.
    - Rough, artistic lines.
    - Paper texture background visible.
  `,
  [VisualStyle.WATERCOLOR]: `
    STYLE ENFORCEMENT: WATERCOLOR PAINTING
    - Wet-on-wet bleeding edges.
    - Soft, translucent colors.
    - Paper grain texture visible.
    - Organic, flowing shapes.
    - NO hard outlines, NO digital sharpness.
  `,
  [VisualStyle.LOWPOLY]: `
    STYLE ENFORCEMENT: LOW POLY 3D
    - Geometric, faceted shapes.
    - Visible polygons and triangles.
    - Flat shading per face (no smoothing).
    - Minimalist, abstract, retro-game aesthetic.
  `,
  [VisualStyle.MINIMAL]: `
    STYLE ENFORCEMENT: HYPER-MINIMALISTIC
    - Extreme reduction of detail.
    - Massive negative space.
    - Limited color palette (2-3 colors max).
    - Abstract representation of the subject.
  `,
  [VisualStyle.RETRO]: `
    STYLE ENFORCEMENT: RETRO FUTURISTIC (SYNTHWAVE)
    - Neon grid landscapes, glowing purples and teals.
    - 80s chrome texturing.
    - Scanlines or VHS grain effects.
    - Cyberpunk / Outrun aesthetic.
  `,
  [VisualStyle.VECTOR]: `
    STYLE ENFORCEMENT: VECTOR CLEAN (SVG)
    - Mathematically perfect curves.
    - Solid fills, crisp edges.
    - Look like an Adobe Illustrator export.
    - No noise, no texture.
  `,
  [VisualStyle.OIL]: `
    STYLE ENFORCEMENT: OIL PAINTING
    - Thick impasto texture (3D paint bumps).
    - Mixing of colors on canvas.
    - Impressionist or classical realism style.
    - Visible canvas weave.
  `,
  [VisualStyle.LEGO]: `
    STYLE ENFORCEMENT: LEGO STYLE
    - Everything must be built from plastic bricks.
    - Studs visible on surfaces.
    - Minifigure proportions for characters.
    - Glossy plastic texture.
  `,
  [VisualStyle.PAPER]: `
    STYLE ENFORCEMENT: PAPER CUT-OUT
    - Layered paper depth (shadows between layers).
    - Craft texture, slightly rough edges.
    - Diorama look.
    - Physical paper aesthetic.
  `,
  [VisualStyle.DOLL]: `
    STYLE ENFORCEMENT: BJD DOLL STYLE
    - Characters look like Ball-Jointed Dolls.
    - Visible joints at elbows/knees.
    - Porcelain or high-quality resin texture.
    - Glassy, artificial eyes.
  `,
  [VisualStyle.VAPORWAVE]: `
    STYLE ENFORCEMENT: VAPORWAVE
    - Glitch art aesthetics.
    - Classical statues mixed with computer errors.
    - Pastel pinks and blues.
    - Nostalgic 90s web elements.
  `,
  [VisualStyle.STORYBOOK]: `
    STYLE ENFORCEMENT: STORYBOOK CHILDREN'S STYLE
    - Whimsical, soft, friendly.
    - Colored pencil or soft pastel texture.
    - Warm, inviting lighting.
    - Simplified shapes for children.
  `,
  [VisualStyle.SOUTH_PARK]: `
    STYLE ENFORCEMENT: SOUTH PARK STYLE (PAPER CUTOUT)
    - Visuals must look exactly like the 'South Park' TV show style.
    - Construction paper cutout aesthetic.
    - Simple geometric shapes.
    - Flat textures, no shading.
    - Distinctive eyes (large white ovals, small black dots).
    - Crude, imperfect cut-out look.
  `,
  [VisualStyle.WOOL]: `
    STYLE ENFORCEMENT: WOOL / KNITTED STYLE
    - Everything consists of knitted yarn, felt, and wool.
    - Visible textile fibers, fuzz, and stitch patterns.
    - Soft, tactile appearance (Amigurumi style).
    - Warm lighting to highlight the texture of the wool.
    - No hard edges or smooth surfaces; everything is soft fabric.
  `
};