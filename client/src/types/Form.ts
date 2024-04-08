import { z } from "zod";

const formSchema = z.object({
  entityType: z.enum(["CONTACT", "COMPANY", ""], {
    required_error: "You need to select a type.",
  }),
  name: z.string().min(3, "the name must have a minimum of 3 characters"),
});

export const FormSchemaContact = formSchema.extend({
  email: z.string().email(),
  phone: z.string().min(9, {
    message: "Phone must be at least 9 characters.",
  }).optional(),
});

export const FormSchemaCompany = formSchema.extend({
  industry: z.string(),
  contactEmail: z.string().email().optional(),
});