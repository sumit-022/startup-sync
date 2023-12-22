export default function clamp(text: string | null, maxLetters: number) {
  if (!text) return "";
  if (text.length > maxLetters) {
    return text.slice(0, maxLetters) + "...";
  }
  return text;
}
