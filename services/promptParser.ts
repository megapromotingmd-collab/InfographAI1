
import { QueueItem } from "../types";

/**
 * Parses raw text input into structured QueueItems.
 * Uses a robust line-by-line state machine to handle various formats.
 * 
 * Supported keywords (Case Insensitive):
 * Sets: SET, ACT, EPISOD, EPISODE, CAPITOL
 * Slides: SLIDE, SCENA, SCENE, FRAME, IMAGINE, PANEL, IMAGE
 */
export const parseRawInputToQueue = (rawText: string): Omit<QueueItem, 'projectId'>[] => {
  const queue: Omit<QueueItem, 'projectId'>[] = [];
  
  // Normalize line endings
  const lines = rawText.replace(/\r\n/g, '\n').split('\n');
  
  let currentSetName = "Default Set";
  let currentContextLines: string[] = [];
  let slideBuffer: { number: string; title: string; lines: string[] } | null = null;
  
  // Counters for auto-numbering
  let setCounter = 0;
  let slideCounter = 0;

  // Regex Pattern Explanation:
  // ^(?:[#*=\-]*\s*)?   -> Allow optional decorative start (e.g. "## ", "** ", "- ")
  // (KEYWORD)\b         -> Match Keyword with word boundary
  // (?:\s+(\d+))?       -> Optional Number (Capture Group 1)
  // (?:[:.\-\s]*)       -> Optional separator (colon, dot, dash, space)
  // (.*)$               -> Rest of line is Title (Capture Group 2)
  
  const setRegex = /^(?:[#*=\-]*\s*)?(?:SET|ACT|EPISOD|EPISODE|CAPITOL)\b(?:\s+(\d+))?(?:[:.\-\s]*)(.*)$/i;
  const slideRegex = /^(?:[#*=\-]*\s*)?(?:SLIDE|SCENA|SCENE|FRAME|IMAGINE|PANEL|IMAGE)\b(?:\s+(\d+))?(?:[:.\-\s]*)(.*)$/i;
  
  // Helper to push the completed slide to queue
  const flushSlide = () => {
    if (slideBuffer) {
      const desc = slideBuffer.lines.join('\n').trim();
      const context = currentContextLines.join('\n').trim();

      // Only push if we have some content or at least a title
      if (desc || context || slideBuffer.title) { 
         // Construct the full prompt
         const fullPrompt = `
CONTEXT (${currentSetName}):
${context}

========================================
SCENE: ${slideBuffer.number} - ${slideBuffer.title}

DESCRIPTION:
${desc}
         `.trim();

         queue.push({
            id: `job-${Date.now()}-${Math.random().toString(36).substr(2,5)}`,
            setName: currentSetName,
            slideNumber: slideBuffer.number,
            shortTopic: `${slideBuffer.number}: ${slideBuffer.title}`,
            fullPrompt: fullPrompt,
            status: 'pending'
         });
      }
      slideBuffer = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Skip empty lines ONLY if we are not inside a slide description
    // (Preserves paragraph spacing in descriptions)
    if (!trimmed && !slideBuffer) continue;
    
    // Skip purely decorative separator lines (e.g. "======", "------")
    if (/^[=\-_]{3,}$/.test(trimmed)) continue;

    // 1. CHECK FOR SET HEADER
    const setMatch = trimmed.match(setRegex);
    // Ensure it's not a false positive (like "Setting the table") by checking length or structure
    if (setMatch && trimmed.length < 80) {
        flushSlide(); // Close previous slide
        
        setCounter++;
        slideCounter = 0;
        currentContextLines = []; // Reset context for new set
        
        const num = setMatch[1] || `${setCounter}`;
        const title = setMatch[2] ? setMatch[2].trim() : `Set ${num}`;
        currentSetName = `SET ${num}: ${title}`;
        continue;
    }

    // 2. CHECK FOR SLIDE HEADER
    const slideMatch = trimmed.match(slideRegex);
    if (slideMatch && trimmed.length < 80) {
        flushSlide(); // Close previous
        
        slideCounter++;
        const num = slideMatch[1] || `${slideCounter}`;
        const title = slideMatch[2] ? slideMatch[2].trim() : `Scene ${num}`;
        
        slideBuffer = {
            number: num,
            title: title,
            lines: []
        };
        continue;
    }

    // 3. CONTENT PROCESSING
    if (slideBuffer) {
        slideBuffer.lines.push(line);
    } else {
        // Content found before any slide is treated as Global Context for the current set
        // Explicitly check if it's not a keyword masquerading as text, though the regex above catches keywords first.
        if (trimmed) {
            currentContextLines.push(line);
        }
    }
  }
  
  flushSlide(); // Flush the final slide

  return queue;
};
