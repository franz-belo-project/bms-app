import { type BaseSyntheticEvent } from 'react';
import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'This field is required'),
    newPassword: z
      .string()
      .min(14, 'The password must be at least 14 characters long')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[\w\W]{14,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      ),
    confirmPassword: z.string().min(1, 'This field is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords did not match',
    path: ['confirmPassword'],
  });

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;

export type ChangePasswordProps = {
  error?: boolean;
  open?: boolean;
  setOpen: (val: boolean) => void;
  errorMessage?: string;
  onSubmit: (value: ChangePasswordType, e?: BaseSyntheticEvent) => void;
};
