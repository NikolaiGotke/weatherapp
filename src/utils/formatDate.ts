export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {}
) {
  const d = typeof date === "string" ? new Date(date + "T00:00:00") : date;
  return d.toLocaleDateString("da-DK", {
    weekday: "short",
    day: "numeric",
    month: "short",
    ...options,
  });
}
