import { format, parseISO } from "date-fns";

export const formatDateFromIso = (iso: string, formatString = "dd/MM/yyyy") =>
  format(parseISO(iso), formatString);
