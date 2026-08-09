// Split Arabic text into individual word tokens.
// Strips leading/trailing whitespace and collapses internal runs.
export function tokenize(arabic: string): string[] {
  return arabic.trim().split(/\s+/).filter(Boolean);
}
