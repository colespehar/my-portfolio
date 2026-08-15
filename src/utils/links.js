/**
 * A link is only real if it actually goes somewhere. Entries in projects.js
 * use "#" as a "no demo yet" placeholder, which renders as a button that
 * jumps to the top of the page and does nothing else — worse than showing
 * no button at all.
 */
export function isRealLink(href) {
  if (typeof href !== "string") return false;
  const trimmed = href.trim();
  return trimmed !== "" && trimmed !== "#";
}
