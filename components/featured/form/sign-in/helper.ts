import { type BaseSyntheticEvent } from 'react';
import { z } from 'zod';

export const signInSchema = z.object({
  branch: z.string().min(1, 'Branch is required'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export type SignInType = z.infer<typeof signInSchema>;

export type SignInProps = {
  errorMessage?: string | null;
  isLoading?: boolean;
  onSubmit: (value: SignInType, e?: BaseSyntheticEvent) => void;
};
