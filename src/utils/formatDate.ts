export function formatDate(dateString: string) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("da-DK", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
