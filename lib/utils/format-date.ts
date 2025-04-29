import { format } from 'date-fns';

export function dateFormat(date: Date) {
  return format(date, 'PP');
}

export function toParamsDate(date: Date) {
  return format(date, 'yyyy-MM-dd');
}

export function toHourTime(dateString: string) {
  const parsed = new Date(dateString);
  return format(parsed, 'h:mm a');
}
