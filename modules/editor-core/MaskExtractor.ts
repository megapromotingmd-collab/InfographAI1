
/**
 * Converts the visual canvas (where user paints) into a strict B&W mask for the AI.
 * White = Area to Edit
 * Black = Protected Area
 */
export const extractMaskFromCanvas = (
  canvas: HTMLCanvasElement, 
  originalWidth: number, 
  originalHeight: number
): string => {
  // Create a temporary canvas to normalize resolution
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = originalWidth;
  tempCanvas.height = originalHeight;
  const ctx = tempCanvas.getContext('2d');
  
  if (!ctx) throw new Error("Could not create mask context");

  // 1. Fill Background with BLACK (Protected)
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, originalWidth, originalHeight);

  // 2. Draw the Mask from source canvas (User input)
  // We assume the source canvas has transparent background and opaque brush strokes
  ctx.drawImage(canvas, 0, 0, originalWidth, originalHeight);

  // 3. Force non-transparent pixels to WHITE (Edit Zone)
  // This ensures even semi-transparent brush edges are treated as "Edit"
  const imageData = ctx.getImageData(0, 0, originalWidth, originalHeight);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    // If pixel has alpha > 0, make it pure white
    if (data[i + 3] > 0) {
      data[i] = 255;     // R
      data[i + 1] = 255; // G
      data[i + 2] = 255; // B
      data[i + 3] = 255; // Alpha
    }
  }
  
  ctx.putImageData(imageData, 0, 0);

  return tempCanvas.toDataURL('image/png');
};
