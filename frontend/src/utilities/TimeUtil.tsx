export function convertDateToString(date: Date | null): string {
  if (date == null) {
    return "";
  }
  const stringOut = date?.getTime().toString();
  return stringOut;
}
