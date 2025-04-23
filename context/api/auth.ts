import { z } from 'zod';
import axios from 'axios';
import { handleErrors } from '~/lib/utils/error-handlers';
import { AUTH_LOGIN } from '../endpoint';

export const authTokenSchema = z.object({
  token: z.string(),
});

export type AuthToken = z.infer<typeof authTokenSchema>;

type AuthPayload = {
  branch: string;
  username: string;
  password: string;
};

export async function signIn(payload: AuthPayload) {
  try {
    const response = await axios.post(AUTH_LOGIN, payload);

    return authTokenSchema.parse(response.data);
  } catch (err) {
    throw handleErrors(err);
  }
}

export const authSampleSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  id: z.number(),
  username: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  image: z.string(),
});

type AuthDumpPayload = {
  username: string;
  password: string;
};

export async function signInAuthDump(payload: AuthDumpPayload) {
  try {
    const response = await axios.post(
      'https://dummyjson.com/auth/login',
      payload,
    );

    return authSampleSchema.parse(response.data);
  } catch (error) {
    throw handleErrors(error);
  }
}
