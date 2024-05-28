import { format } from "date-fns";

export const cleanFDate = (fDate: string) =>
  format(new Date(fDate), "MMM dd HH:MM");

export const serverFDate = (fDate: any) =>
  format(new Date(fDate), "yyyy-MM-dd HH:MM:SS");

export const inputFDate = (fDate: any) =>
  format(new Date(fDate), "yyyy-MM-dd'T'hh:mm");
