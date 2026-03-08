/**
 * Parse a timestamp coming from SQLite.
 *
 * SQLite's CURRENT_TIMESTAMP stores UTC in "YYYY-MM-DD HH:MM:SS" format
 * with no timezone marker. JavaScript's Date constructor interprets a
 * string without a timezone as *local* time — meaning on an ET machine the
 * timestamp would be read as 5 hours later than it actually is.
 *
 * This function normalises both formats the app produces:
 *   "2026-03-07 19:36:22"          → SQLite CURRENT_TIMESTAMP (UTC, no Z)
 *   "2026-03-07T19:36:22.000Z"     → optimistic-update toISOString() (already UTC+Z)
 *
 * In both cases the returned Date represents the correct UTC instant.
 */
export function parseDbDate(ts: string | null | undefined): Date {
  if (!ts) return new Date(0);
  // Already carries timezone info — trust it as-is.
  if (ts.includes("Z") || ts.includes("+")) return new Date(ts);
  // SQLite "YYYY-MM-DD HH:MM:SS" — replace space separator and append Z.
  return new Date(ts.replace(" ", "T") + "Z");
}
