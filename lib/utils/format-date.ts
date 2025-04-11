import { format } from "date-fns";

export function dateFormat(date: Date) {
  return format(date, 'PP');
}