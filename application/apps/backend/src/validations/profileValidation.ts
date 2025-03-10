import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email").optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  address: z.string().max(200, "Address must be less than 200 characters").optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const formatValidationError = (error: z.ZodError) => {
  return {
    message: "400, Bad Request",
    errors: error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    })),
  };
}; 