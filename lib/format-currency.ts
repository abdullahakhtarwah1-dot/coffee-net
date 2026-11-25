/** Formats an integer PKR amount as "Rs. 1,250" (PRD §7). */
export function formatPKR(amount: number): string {
  return `Rs. ${Math.round(amount).toLocaleString("en-PK")}`;
}
