import * as z from "zod";
import { currencyCodes } from "@/src/lib/data/currencies";

export const userSessionSchema = z.object({
  user: z.object({
    name: z.string(),
    email: z.email(),
    image: z.url(),
  }),
  expires: z.string(),
});

export const userSettingsSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be more than 2 characters")
    .max(100, "Username must be no more than 100 characters"),
  defaultCurrency: z.enum(
    currencyCodes,
    "Default currency must be a supported currency code",
  ),
});

export const userEditCategoriesSchema = z.object({
  category: z
    .string()
    .min(2, "A category name must be more than 2 characters long")
    .max(50, "A category name must be no more than 20 characters"),
});
