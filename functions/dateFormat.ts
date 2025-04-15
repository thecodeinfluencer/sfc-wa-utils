import { format } from "date-fns";

export const cleanFDate = (fDate: string): string =>
  format(new Date(fDate), "MMM dd HH:mm");

export const serverFDate = (fDate: any): string =>
  format(new Date(fDate), "yyyy-MM-dd HH:mm:ss");

export const inputFDate = (fDate: any): string =>
  format(new Date(fDate), "yyyy-MM-dd'T'hh:mm");
