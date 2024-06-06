/**
 * Calculates the absolute difference in hours between two Date objects.
 * If the difference is zero, returns 1 instead.
 *
 * @param date1 - A Date object representing the first date.
 * @param date2 - A Date object representing the second date.
 * @returns A number representing the absolute difference in hours between the two dates, or 1 if the difference is zero.
 */
export function compareDatesInHours(date1: Date, date2: Date): number {
  const difference = (date2.getTime() - date1.getTime()) / 1000 / 3600;

  const calculation = Math.abs(Math.round(difference));

  return calculation === 0 ? 1 : calculation;
}
