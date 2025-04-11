import { type BaseSyntheticEvent } from "react";
import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, 'This field is required'),
  lastName: z.string().min(1, 'This field is required'),
  middleName: z.string().optional(),
  position: z.string().min(1, 'This field is required'),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phoneNumber: z.number().min(1, 'This field is required'),
  birthDate: z.string().min(1, 'This field is required'),
});

export type ProfileType = z.infer<typeof profileSchema>;

export type ProfileProps = {
  onSubmit: (value: ProfileType, e?: BaseSyntheticEvent) => void;
}

